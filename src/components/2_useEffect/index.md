### Hooks

useEffect

在react functionComponent(FC)中使用useEffect hook

```tsx
    useEffect(()=>{
        console.log(num,'render更新了,[]')
    },[])

    useEffect(()=>{
        console.log(num,'render更新了,[num]')
    },[num])

    useEffect(()=>{
        console.log(num,'render更新了,空')

        return ()=>{
            console.log('组件卸载时调用')
        }
    })
```
useEffect 在组件渲染时调用

### useEffect(function,array):return function

function是回调函数视图渲染时更新

array 是数组 
    传空数组：表示仅页面初次加载时调用effect，
    传递state数组：表示当数组中的state更新时触发effect回调

return function
    effect返回一个函数，这个函数在component销毁时调用