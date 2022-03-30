## useMemo和useCallback

useMemo是用于处理
    父组件状态更新，子组件的状态没更新，父子组件却同时渲染的问题

当父组件中的状态 count和flag更新时
    会引起父组件的render，父组件render时又会引起子组件render

### 这时我们可以通过memo和useCallback进行限制

子组件：
```tsx
    interface childProps {
        count?: number;
    }

    const Child = memo<childProps>(props => {
        console.log('child render');
        const { count } = props
        return (
            <div>parentCount:{count}</div>
        )
    })
```

父组件：
```tsx
    const Parent: FC = () => {
        const [count, setCount] = useState<number>(0);
        const [flag, setFlag] = useState<boolean>(true);

        // 这里使用useMemo和useCallback是同样的效果,useCallback是useMemo的语法糖
        // const changeCount = useMemo(() => {
        //   return () => {
        //     setCount(count + 1)
        //   }
        // }, [count])

        // 当且仅当父组件的count状态发生变化时，才会引起子组件的更新
        const changeCount = useCallback(() => {
            setCount(count + 1)
        }, [count])

        return (
            <div>
            <Child count={count}></Child>
            <br />
            count:{count}
            flag:{flag ? '真' : '假'}
            <br />
            <button onClick={changeCount}>change count</button>
            <button onClick={_ => { setFlag(!flag) }}>change Flag</button>
            </div>
        )
    }
```
