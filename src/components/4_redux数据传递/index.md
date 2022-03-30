## react-redux传递数据

安  装：
```javascript
    yarn add redux react-redux redux-thunk redux-devtools-extension
```

redux-thunk: 处理异步action 
redux-devtools-extension: 浏览器redux调试插件

创建文件：
    src:
        redux
            |---redux/actions
                |---actions/state.ts
            |---redux/reducers
                |---reducers/index.ts
                |---reducers/state.ts
            |---redux/const.ts
            |---redux/store.ts
        container
            |---ComponentsBaseState.tsx


### 第一步：
    用provider组件包裹需要共享数据的组件
```tsx
        // 引入provider组件 传递给全局需要store的组件
        import { Provider } from 'react-redux'
        import store from './redux/store'

        <Provider store={store}>
            Home...
            <HomeChild1></HomeChild1>
            <HomeChild2></HomeChild2>
        </Provider>
```

### 第二步
    编写const.ts,定义action中的计算方法 和 类型

```ts
        export const INCREMENT:string = 'increment';
        export type INCREMENT_TYPE = typeof INCREMENT;

        export const DECREMENT:string = 'decrement';
        export type DECREMENT_TYPE = typeof DECREMENT;
```

### 第三步
    编写actions内的state.ts

```ts
        import { INCREMENT, DECREMENT } from '../const'

        import type { INCREMENT_TYPE, DECREMENT_TYPE } from '../const'

        interface IncrementAction {
            type: INCREMENT_TYPE,
            data:number
        }

        interface DecrementAction {
            type: DECREMENT_TYPE
            data:number
        }

        export type ModifyAction = IncrementAction | DecrementAction

        // 定义同步action返回一般对象
        export const increment = (data: number): IncrementAction => ({ type: INCREMENT,data })

        const decrement = (data: number): DecrementAction => ({ type: DECREMENT,data})

        // 定义异步action返回处理后的数据 dispatch(increment(data))
        export const decrementAsync = (data: number, time: number) => {
            return (dispatch: Function) => {
                setTimeout(() => {
                    dispatch(decrement(data))
                }, time)
            }
        }
```

### 第四步
    编写reducers内的state.ts和index.ts

state.ts
```ts
        import { INCREMENT, DECREMENT } from '../const'
        import type { ModifyAction } from '../actions/num'

        const num = (preState: number = 0, action: ModifyAction) => {
            const { type, data } = action
            switch (type) {
                case INCREMENT:
                    return preState + data
                case DECREMENT:
                    return preState - data
                default:
                    return preState
            }
        }

        export default num

```

index.ts导出reducers
```ts
        // combineReducers用于整合Reducer 在容器组件中通过state.count或者state.person来获取store中的数据
        import {combineReducers } from "redux"
        import num from "./num"

        export default combineReducers({num})
```

### 第五步
    编写store.ts

```ts
        // createStore创建store applyMiddleware引入中间件
        import { createStore,applyMiddleware} from 'redux'
        // 使用thunk处理异步action，里面可以使用异步方法（接口调用、定时器、promise等）
        import thunk from 'redux-thunk'
        // reducers是reducer的集合
        import reducer from './reducers'
        // redux-devtools-extension是 redux调试工具的激活
        import {composeWithDevTools} from 'redux-devtools-extension'

        export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
```

### 第六步
    使用redux

container/xxx.tsx中

```tsx
        import { FC } from "react";
        // 使用react-redux中的connect方法连接容器组件和ui组件
        import { connect } from "react-redux";
        import { decrementAsync } from "../redux/actions/num"

        interface Child2Props {
            num: number,
            decrementAsync: Function
        }
        // 此处的HomeChild2是ui组件，默认不暴露，HomeChild2的props中包含着react-redux传递的数据
        const HomeChild2: FC<Child2Props> = (props) => {
            console.log(props);
            const {num,decrementAsync} = props
            return (
                <>
                    <br />
                    HomeChild2...

                    <br />
                    当前计算结果是: {num}
                    <br />
                    <button onClick={()=>decrementAsync(1,1000)}>点我延迟减去1</button>
                    <br />
                </>
            )
        }
        // 通过connect方法定义 HomeChild2 组件的容器组件，connect(stateFunction,actionObject)(component)
        export default connect((state: { num: number }) => {
            return { num: state.num }
        }, {
            decrementAsync
        })(HomeChild2)
```