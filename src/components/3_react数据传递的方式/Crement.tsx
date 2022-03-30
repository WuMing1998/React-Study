import { FC, useReducer } from 'react'

interface Increment {
    type: 'increment';
}
interface Decrement {
    type: 'decrement';
}


interface ArbCount {
    type: 'arbCount';
    countType: Increment | Decrement
    num: number;
}

interface State {
    count: number;
}

const initializerArg: State = { count: 0 };

interface Props {
    countType: Increment | Decrement
}

type Actions = Increment | Decrement | ArbCount

function reducer(state: State, action: Actions): State {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };;
        case 'arbCount':
            return action.countType.type === 'increment' ? { count: state.count + action.num } : { count: state.count - action.num };
        default:
            return state
    }
}

const Count: FC<Props> = ({
    countType,
}) => {
    const [state, dispatch] = useReducer(reducer, initializerArg);
    return (
        <>
            <br />Count:{state.count}<br />
            <button onClick={_ => dispatch({ type: 'increment' })} style={{ marginRight: 20 }}>+</button>
            <button onClick={_ => dispatch({ type: 'decrement' })}>-</button><br />
            <input type="number" onChange={e => dispatch({ type: 'arbCount', countType, num: Number(e.target.value) })} />
        </>
    )
}

export default Count;
