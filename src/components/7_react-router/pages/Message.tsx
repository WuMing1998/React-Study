import {FC} from 'react'
// import {useParams} from 'react-router-dom'
// import {useSearchParams} from 'react-router-dom'
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
    // const [params,paramsSet] = useSearchParams();
    // const id = params.get('id');
    // const title = params.get('title')
    // const content = params.get('content')
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