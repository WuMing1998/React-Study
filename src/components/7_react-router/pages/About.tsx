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
            {/* <Link to={`message/${obj.id}/${obj.title}/${obj.content}`}>去详情界面</Link> */}
            {/* <Link to={`message?id=${obj.id}&title=${obj.title}&content=${obj.content}`}>去详情界面</Link> */}
            <Link to='message' state={obj}>去详情界面</Link>
            <br />
            <Outlet></Outlet>
        </>
    )
}

export default About