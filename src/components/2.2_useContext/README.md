
## createContext和useContext

### 在父代组件中创建Context
```tsx
    import { createContext, useState } from 'react'
    import Home from './Home';

    interface TabContextInter{
        about:string
        setAb:Function
    }

    export const TabContext = createContext({} as TabContextInter);

    const Tab = () => {
        const [about, setAb] = useState('about2...')
        return (
            <>
            <TabContext.Provider value={{ about, setAb }}>
                <Home></Home>
            </TabContext.Provider>
            </>
        )
    }
    export default Tab
```

### 在About组件中使用上级组件传递的数据

```tsx
    import { useContext } from 'react'
    import { TabContext } from '../index'
    import { Button } from 'antd'


    const About = () => {
        const { about, setAb } = useContext(TabContext);
        const clickHandler = () => {
            setAb('改变后的about...')
        }
        return (
            <>
            {about}
            <Button type='primary' onClick={clickHandler}>点我设置about内容</Button>
            </>
        )
    }
    export default About
```
    
