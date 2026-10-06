import React, { useEffect, useState } from 'react'
import api from '../../Api/api'
import Logout from '../Logout'
import { useAuth } from '../../Context/AuthContext'

const ManageUser = () => {
    const {username, loading} = useAuth()
    const [users, setUsers] = useState([])
    // const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    
    useEffect(() =>{
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const response = await api.get("/admin/users")
            setUsers(response.data)
        } catch (error) {
            console.error(error)
            setError(error)
        } 
        // finally {
        //     setLoading(false)
        // }
    }

    const toggleAdmin = async (user) => {
        const newState = !user.isAdmin

        try {
            await api.patch(`/admin/users/${user.uid}/admin`, {
                isAdmin: newState
            })


            setUsers((prevUser) => (
              prevUser.map((u) => (
                u.uid === user.uid
                  ? {...u, isAdmin:newState}
                  : u
              ))
            ))
        } catch (error) {
            console.error(error)
            setError(error)
        }
    }

  if (loading){
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="m-5 p-5 text-3xl text-center font-bold">
        Manage Users
      </h1>
        <div className="flex justify-end items-center mb-10 mx-10 px-5">
          <p className="flex item-center p-2 font-5 capitalize mx-5 font-bold">Welcome back {username}</p>
          <Logout />
        </div>

  {error && (
    <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
      {error}
    </p>
  )}

  <div className="overflow-hidden rounded-xl bg-white shadow-lg border">
    <table className="w-full border-collapse ">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-center inline-flex ">Admin Access</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.uid} className="border-t">
            <td className="p-4">{user.username}</td>
            <td className="p-4">{user.email}</td>

            <td className="p-4 text-center inline-flex gap-2">
              <label className="inline-flex cursor-pointer items-center justify-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={user.isAdmin}
                  onChange={() => toggleAdmin(user)}
                />

                <div className="relative h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-green-500 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
              </label>

              <span className="ml-3 text-sm">
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {users.length === 0 && (
      <p className="p-6 text-center text-gray-500">
        No users found.
      </p>
    )}
  </div>
</div>
  )
}

export default ManageUser