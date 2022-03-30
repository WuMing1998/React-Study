import { createContext, Fragment, useState } from 'react'

import Home from './Home';

interface TabContextInter{
  about:string
  setAb:Function
}

export const TabContext = createContext({} as TabContextInter);

const Tab = () => {

  const [about, setAb] = useState('about2...')

  return (
    <Fragment>
      <TabContext.Provider value={{ about, setAb }}>
        <Home></Home>
      </TabContext.Provider>
    </Fragment>
  )
}

export default Tab
