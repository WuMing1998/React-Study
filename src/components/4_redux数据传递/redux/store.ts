 // createStore创建store applyMiddleware引入中间件
 import { createStore,applyMiddleware} from 'redux'
// 使用thunk处理异步action，里面可以使用异步方法（接口调用、定时器、promise等）
 import thunk from 'redux-thunk'
// reducers是reducer的集合
 import reducer from './reducers'
 // redux-devtools-extension是 redux调试工具的激活
import {composeWithDevTools} from 'redux-devtools-extension'

 export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))