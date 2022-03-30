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
                // path:'message/:id/:title/:content',
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