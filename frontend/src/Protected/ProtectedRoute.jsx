import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../Api/api'
import { useAuth } from '../Context/AuthContext'

const ProtectedRoute = ({ children }) => {

    const {username, loading} = useAuth()

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>
    }


    if (!username){
        return <Navigate to='/signin' replace />
    }


    return children
}

export default ProtectedRoute