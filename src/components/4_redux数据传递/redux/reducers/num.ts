
import { INCREMENT, DECREMENT } from '../const'


import type { ModifyAction } from '../actions/num'

const num = (preState: number = 0, action: ModifyAction) => {
    const { type, data } = action
    switch (type) {
        case INCREMENT:
            return preState + data
        case DECREMENT:
            return preState - data
        default:
            return preState
    }
}

export default num