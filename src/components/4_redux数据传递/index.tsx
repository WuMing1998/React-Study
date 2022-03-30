import { FC } from "react";
import HomeChild1 from "./container/HomeChild1";
import HomeChild2 from "./container/HomeChild2";
// 引入provider组件 传递给全局需要store的组件
import { Provider } from 'react-redux'
import store from './redux/store'


const Home: FC = () => {
    return (
        <Provider store={store}>
            Home...
            <HomeChild1></HomeChild1>
            <HomeChild2></HomeChild2>
        </Provider>
    )
}

export default Home