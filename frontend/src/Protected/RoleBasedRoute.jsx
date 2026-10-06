import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoute = () => {
  const { username, loading, isAdmin } = useAuth()

  if (loading){
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!username){
    return <Navigate to='/signin' replace />
  }

  if (isAdmin){
    return <Navigate to="/admin/dashboard" replace/>
  }

  return <Navigate to='/form' replace />
}

export default RoleBasedRoute

