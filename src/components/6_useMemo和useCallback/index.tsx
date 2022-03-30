import { FC, useMemo, useState, memo, useCallback } from 'react'

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

const Parent: FC = () => {
  const [count, setCount] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(true);

  // const changeCount = useMemo(() => {
  //   return () => {
  //     setCount(count + 1)
  //   }
  // }, [count])

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

export default Parent
