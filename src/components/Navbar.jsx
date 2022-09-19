import React from 'react'
import { UserAuth } from '../Context/UserContext'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
 const {user} = UserAuth()
  const navigate = useNavigate()
  const {logout} = UserAuth()
  const singOut = ()=>{
    logout(auth)
    navigate("/login")
  }
  return (
    <div className='navbar'>
        <span className='logo'>AHMED CHAT</span>
        <div className='user'>
             <img src={user.photoURL} alt="person" />
             <span>{user.displayName}</span>
             <button onClick={singOut}>log out</button>
        </div>

    </div>
  )
}

export default Navbar