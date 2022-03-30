### 安装
yarn add react-router-dom

### 第一步
使用BrowserRouter组件或HashRouter包裹根节点

```tsx
    import {BrowserRouter} from 'react-router-dom'

    <BrowserRouter>
        <App>

        </App>
    </BrowserRouter>
```

### 第二步
创建routes路由表
<!-- src -->
routes/index.tsx

导入RouteObject接口和重定向组件 
Navigate：当所有的路由均匹配不上时 会跳转到navigate组件指向的路径

children：属于多级路由
```tsx
import type {RouteObject} from 'react-router-dom'
import {Navigate} from 'react-router-dom'

import Home from '../pages/Home'
import About from '../pages/About'
import Message from '../pages/Message'

const routes:RouteObject[] = [
    {
        path:'/home',
        element:<Home></Home>,
    },
    {
        path:'/about',
        element:<About></About>,
        children:[
            {
                path:'message',
                element:<Message></Message>
            }
        ],
    },
    {
        path:'/',
        element:<Navigate to={'/home'}/>,
    }
]

export default routes
```

### 第三步
    通过NavLink或Link创建路由链接
    通过useRoutes使用路由表

    pages/index.tsx
```tsx
    import {FC} from 'react'
    import {NavLink,useRoutes} from 'react-router-dom'
    import routes from '../routes'

    const Page:FC = ()=>{
        //通过useRoutes使用路由表
        const router = useRoutes(routes);
        // 通过classNameChange函数改变NavLink的选中样式名  active->activeChange
        const classNameChange = (isActive:boolean):string=>{
            return isActive?'activeChange':''
        }
        return (
            <>
                <ul>
                    <li>
                        <NavLink className={({isActive})=>classNameChange(isActive)} to={'/home'}>主页</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=>classNameChange(isActive)} to={'/about'}>关于</NavLink>
                    </li>
                </ul>
                {router}
            </>
        )
    }
    export default Page
```

### 第四步
    多级路由的使用
    Outlet渲染匹配的路由页面
    
About组件
```tsx
    import {FC} from 'react'
    import {Link,Outlet} from 'react-router-dom'

    const About:FC = ()=>{
        return (
            <>
                About...
                <Link to={'message'}>去详情界面</Link>
                <br />
                <Outlet></Outlet>
            </>
        )
    }
    export default About
```







### 第五步
    路由传参的三种方式：

#### 1、query传参

修改路由表
```tsx
        {
            path:'/about',
            element:<About></About>,
            children:[
                {
                    path:'message/:id/:title/:content',
                    element:<Message></Message>
                }
            ],
        },
```
About.tsx中传递参数
```tsx
        import {FC} from 'react'
        import {Link,Outlet} from 'react-router-dom'

        const About:FC = ()=>{
            const obj = {
                id:'001',
                title:'标题',
                content:'内容',
            }
            return (
                <>
                    About...
                    <Link to={`message/${obj.id}/${obj.title}/${obj.content}`}>去详情界面</Link>
                    <br />
                    <Outlet></Outlet>
                </>
            )
        }

        export default About
```
Message.tsx中获取参数
```tsx
        import {FC} from 'react'
        import {useParams} from 'react-router-dom'

        const Message:FC = ()=>{
            const {id,title,content} = useParams();
            return (
                <>
                    Message...<br />
                    {id}<br />
                    {title}<br />
                    {content}<br />
                </>
            )
        }

        export default Message
```
#### 2、search传参

还原路由表
```tsx
    {
        path:'/about',
        element:<About></About>,
        children:[
            {
                // path:'message/:id/:title/:content',
                path:'message',
                element:<Message></Message>
            }
        ],
    },
```
About组件传递参数
```tsx
        import {FC} from 'react'
        import {Link,Outlet} from 'react-router-dom'

        const About:FC = ()=>{
            const obj = {
                id:'001',
                title:'标题',
                content:'内容',
            }
            return (
                <>
                    About...
                    <Link to={`message?id=${obj.id}&title=${obj.title}&content=${obj.content}`}>去详情界面</Link>
                    <br />
                    <Outlet></Outlet>
                </>
            )
        }
        export default About
```
Message组件获取参数
```tsx
    import {FC} from 'react'
    import {useSearchParams} from 'react-router-dom'

    const Message:FC = ()=>{
        const [params,paramsSet] = useSearchParams();
        const id = params.get('id');
        const title = params.get('title')
        const content = params.get('content')
        return (
            <>
                Message...<br />
                {id}<br />
                {title}<br />
                {content}<br />
            </>
        )
    }

    export default Message
```



#### 3、state传参
About组件传递参数
```tsx
        import {FC} from 'react'
        import {Link,Outlet} from 'react-router-dom'
        const About:FC = ()=>{
            const obj = {
                id:'001',
                title:'标题',
                content:'内容',
            }
            return (
                <>
                    About...
                    <Link to='message' state={obj}>去详情界面</Link>
                    <br />
                    <Outlet></Outlet>
                </>
            )
        }
        export default About
```

Message组件获取参数
```tsx
        import {FC} from 'react'
        import {useLocation} from 'react-router-dom'

        interface locationState{
            state:{
                id:string
                title:string
                content:string
            }
        }

        const Message:FC = ()=>{
            const {state:{id,title,content}} = useLocation() as locationState;
            return (
                <>
                    Message...<br />
                    {id}<br />
                    {title}<br />
                    {content}<br />
                </>
            )
        }

        export default Message
```
