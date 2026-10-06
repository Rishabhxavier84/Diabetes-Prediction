import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/signin', {replace: true})
    }
  return (
    <div className='flex item-center justify-end px-5 mx-5'>
        <button onClick={handleLogout} className=" p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black cursor-pointer font-bold">
          Logout
        </button>
    </div>
  )
}

export default Logout