import { INCREMENT, DECREMENT } from '../const'

import type { INCREMENT_TYPE, DECREMENT_TYPE } from '../const'

interface IncrementAction {
    type: INCREMENT_TYPE,
    data:number
}

interface DecrementAction {
    type: DECREMENT_TYPE
    data:number
}

export type ModifyAction = IncrementAction | DecrementAction


// 定义同步action返回一般对象
export const increment = (data: number): IncrementAction => ({ type: INCREMENT,data })

const decrement = (data: number): DecrementAction => ({ type: DECREMENT,data})

// 定义异步action返回处理后的数据 dispatch(increment(data))
export const decrementAsync = (data: number, time: number) => {
    return (dispatch: Function) => {
        setTimeout(() => {
            dispatch(decrement(data))
        }, time)
    }
}