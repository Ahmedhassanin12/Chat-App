import React from 'react'
import SideBar from '../../components/SideBar'
import Chat from '../../components/Chat'

import './Home.scss'
// import { UserAuth } from '../../Context/UserContext'
const Home = () => {
  
  
  
  return (
    <div className='home'>
        <div className='container'>
          <SideBar />
          <Chat />
        </div>
    </div>
  )
}

export default Home