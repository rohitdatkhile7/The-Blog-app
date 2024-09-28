import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom';


function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate(0)
        })
        
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 bg-blue-100 focus:ring-4 focus:outline-none focus:bg-transparent focus:ring-blue-200 focus:text-[#ff3358] rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn