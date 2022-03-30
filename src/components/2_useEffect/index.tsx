import { useEffect, useState } from "react";

const Demo= ()=>{
    const [num,setNum] = useState<number>(0)

    useEffect(()=>{
        console.log(num,'render更新了,[]')
    },[])

    useEffect(()=>{
        console.log(num,'render更新了,[num]')
    },[num])

    useEffect(()=>{
        console.log(num,'render更新了,空')

        return ()=>{
            console.log('组件卸载时调用')
        }
    })

    return (
        <>
            {num}
            <br />
            <button onClick={()=>setNum(1)}>点我设置数值</button>
        </>
    )
}

export default Demo