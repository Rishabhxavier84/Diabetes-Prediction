import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpComponent = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/signin')
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.text()

        if (!response.ok){
            console.log("SignUp failed")
            return
        }

        setName('')
        setEmail('')
        setPassword('')
        
        navigate("/signin")
        
        console.log(data)
    }

  return (
    <div>
      <div className="flex-col justify-center items-center bg-gray-50 shadow-2xl">
        <h1 className="m-5 p-5 text-3xl text-center font-bold">Sign Up</h1>
      </div>
      <div className="p-5 m-5 flex justify-center items-center bg-gray-100 rounded-2xl">
        <form
          onSubmit={handleSignUp}
          className=" bg-gray-200 p-10 px-30 my-5 rounded-4xl shadow-2xl border-[0.5px] border-gray-500"
        >
            <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Name :</p>
            <input
              type="text"
              name="username"
              id="username"
              // onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">email :</p>
            <input
              type="email"
              name="username"
              id="username"
              // onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">password :</p>
            <input
              type="password"
              name="password"
              id="password"
              // onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className=" p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black cursor-pointer"
            >
              Sign up
            </button>
          </div>

          <div className="flex items-center justify-center">
            <button
            type='button'
            onClick={handleClick}
              className="mt-5 p-1 px-4 rounded-2xl bg-amber-50 text-black cursor-pointer hover:shadow"
            >
              Log in
            </button>
          </div>
          </form>
      </div>
    </div>
  )
}

export default SignUpComponent