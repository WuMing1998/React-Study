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
