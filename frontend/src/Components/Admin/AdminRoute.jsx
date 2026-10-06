import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const { username, loading, isAdmin } = useAuth()

//   console.log(username, isAdmin)

  if (loading){
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!username){
    console.log("Username",username)
    return <Navigate to="/signup" replace />
  }

  if (!isAdmin){
    console.log(isAdmin)
    return <Navigate to="/form" replace />
  }

  return children
}

export default AdminRoute