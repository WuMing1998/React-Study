import {FC } from "react";

import { connect } from "react-redux";

import { increment } from "../redux/actions/num";

interface ChildProps{
    num:number,
    increment:Function
}

const HomeChild1: FC<ChildProps> = (props) => {
    console.log('HomeChild1',props);
    const {num,increment} = props
    return (
        <>
            <br />
            HomeChild1...

            <br />
            当前计算结果是: {num}
            <br />
            <button onClick={()=>increment(1)}>点我加1</button>
            <br />
        </>
    )
}
export default connect((state: { num: number }) => {
    return { num: state.num }
},{
    increment,
})(HomeChild1)
