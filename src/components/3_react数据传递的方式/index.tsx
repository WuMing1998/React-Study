import { createContext, FC, useContext, useState } from "react";

import Crement from './Crement'

export interface SonProps {
    num: number
    setNum: Function
}
export interface FatherContextType {
    str: string
    setStr: Function
}

export interface FatherReducerType {
    arr: Array<number>,
    setArr: Function
}

const FatherContext = createContext({} as FatherContextType)

const Father: FC = () => {
    const [num, setNum] = useState<number>(0)
    const [str, setStr] = useState<string>('123')
    const Provider = FatherContext.Provider
    return (
        <>
            Father...
            <br />
            <Provider value={{ str, setStr }}>
                <Son num={num} setNum={setNum}></Son>
            </Provider>
        </>
    )
}

const Son: FC<SonProps> = (props) => {
    const { num, setNum } = props
    return (
        <>
            Son...
            <br />
            父组件的数据为：{num}
            <br />
            <button onClick={() => setNum(10)}>点我改变父组件的数据</button>
            <br />
            <SonChilden></SonChilden>
        </>
    )
}

const SonChilden: FC = () => {
    const { str, setStr } = useContext(FatherContext);
    return (
        <>
            SonChilden...
            祖先组件的str是：{str}
            <br />

            <button onClick={() => setStr('改变后的祖先str')}>点我改变祖先的str数据</button>

            <Crement countType={{ type: 'decrement' }}></Crement>
        </>
    )
}

export default Father