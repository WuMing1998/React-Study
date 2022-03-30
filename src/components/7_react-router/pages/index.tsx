import {FC} from 'react'
import {NavLink,useRoutes} from 'react-router-dom'
import routes from '../routes'

const Page:FC = ()=>{

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