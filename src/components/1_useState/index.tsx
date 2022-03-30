import { useState } from "react";

const Demo= ()=>{
    const [num,setNum] = useState<number>(0)
    return (
        <>
            {num}
        </>
    )
}

export default Demo