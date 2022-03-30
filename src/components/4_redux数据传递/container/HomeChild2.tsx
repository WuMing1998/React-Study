import { FC } from "react";
import { connect } from "react-redux";

import { decrementAsync } from "../redux/actions/num"

interface Child2Props {
    num: number,
    decrementAsync: Function
}

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

export default connect((state: { num: number }) => {
    return { num: state.num }
}, {
    decrementAsync
})(HomeChild2)