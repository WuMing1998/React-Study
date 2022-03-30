## react数据传递的方式

### react中的组件分为：
    父子组件 兄弟组件 隔代组件

    它们适用的数据传递分别为：

        父子组件 props

        兄弟组件 useContext useReducer redux 状态提升

        隔代组件 useContext useReducer redux 


### props数据传递
```tsx
        <Son num={num} setNum={setNum}></Son>
        const Son: FC<SonProps> = (props) => {
            const {num,setNum} = props
            return (
                <>
                    Son...
                    父组件的数据为：{num}
                    <button onClick={()=>setNum(10)}>点我改变父组件的数据</button> </> 
            )}
		)   
```

### useContext

```tsx
        export interface FatherContextType {
            str: string
            setStr: Function
        }
        const FatherContext = createContext({} as FatherContextType)

        // father组件
        const Father: FC = () => {
            const [str, setStr] = useState<string>('123')
            const Provider = FatherContext.Provider
            return (
                <>
                    Father...
                    <br />
                    <Provider value={{ str, setStr }}>
                        <Son></Son>
                    </Provider>
                </>
            )
        }

        // 后代组件
        const SonChilden: FC = () => {
        const { str, setStr } = useContext(FatherContext);
            return (
                <>
                    SonChilden...
                    祖先组件的str是：{str}
                    <br />
                    <button onClick={() => setStr('改变后的祖先str')}>点我改变祖先的str数据</button>
                </>
            )
        }
```

### useReducer

```tsx
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

    function reducer(state: State, action: Actions): State {  //创建reducer函数集中管理状态
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
        const [state, dispatch] = useReducer(reducer, initializerArg);  //使用useReducer hook 创建state和dispatch触发函数
        return (
            <>
                <br />Count:{state.count}<br />
                <button onClick={_ => dispatch({ type: 'increment' })} style={{ marginRight: 20 }}>+</button>
                <button onClick={_ => dispatch({ type: 'decrement' })}>-</button><br />
                <input type="number" onChange={e => dispatch({ type: 'arbCount', countType, num: Number(e.target.value) })} />
            </>
        )
    }

```
