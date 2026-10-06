import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import { useAuth } from "../../Context/AuthContext";

const SignInComponent = () => {

  const { fetchUser } = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/signup')
  }

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signin", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });


      const data = await response.json()

      if (!response.ok){
        console.log("Login failed")
        console.error(response.status)
        console.error(data.detail)
        setError(data.detail)
        return
      }

      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)

      const user = await fetchUser()

      if (!user){
        console.error('Unable to retrive user data')
        return
      }

      setEmail('')
      setPassword('')
      navigate('/')
      
    } catch (error) {
      setError(error.data)
      console.error(error)
    }


    // console.log(data.access_token, data.refresh_token)


  };

  return (
    <div>
      <div className="flex-col justify-center items-center bg-gray-50 shadow-2xl">
        <h1 className="m-5 p-5 text-3xl text-center font-bold">Login</h1>
      </div>
      <div className="p-5 m-5 flex justify-center items-center bg-gray-100 rounded-2xl">
        <form
          onSubmit={handleLogin}
          className=" bg-gray-200 p-10 px-30 my-5 rounded-4xl shadow-2xl border-[0.5px] border-gray-500"
        >
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">email :</p>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
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
              value={password}
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
              Login
            </button>
          </div>

          {error && 
            (<div>
              <div className="flex items-center gap-2 p-3 px-5 mt-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-4xl w-fit mx-auto">
                <p>{error}</p>
                {/* <span
                  data-tooltip-id="Signin-Error-Tooltip"
                  className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-red-800 bg-red-200 rounded-full cursor-pointer"
                >
                  ?
                </span> */}
              </div>

              
                {/* <Tooltip 
                  id="Signin-Error-Tooltip" 
                  place="bottom"
                  variant="error"
                  content={error}
                /> */}
              
            </div>)
          }
          

          <div className="flex items-center justify-center">
            <button
            type="button"
            onClick={handleClick}
              className="mt-5 p-1 px-4 rounded-2xl bg-amber-50 text-black cursor-pointer hover:shadow"
            >
              Sign Up instead.
            </button>
          </div>
          </form>
      </div>
    </div>
  );
};

export default SignInComponent;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";


// const SignInComponent = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const { fetchUser } = useAuth();

//   const handleClick = () => {
//     navigate("/signup");
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/auth/signin",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: email,
//             password: password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.detail || "Login failed");
//         return;
//       }

//       // Save tokens
//       localStorage.setItem("access_token", data.access_token);
//       localStorage.setItem("refresh_token", data.refresh_token);

//       // Fetch and update the logged-in user's details
//       const user = await fetchUser();

//       if (!user) {
//         setError("Unable to retrieve user details");
//         return;
//       }

//       // Reset form
//       setEmail("");
//       setPassword("");

//       // RoleBasedRoute determines the destination
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div className="flex-col justify-center items-center bg-gray-50 shadow-2xl">
//         <h1 className="m-5 p-5 text-3xl text-center font-bold">
//           Login
//         </h1>
//       </div>

//       <div className="p-5 m-5 flex justify-center items-center bg-gray-100 rounded-2xl">
//         <form
//           onSubmit={handleLogin}
//           className="bg-gray-200 p-10 px-30 my-5 rounded-4xl shadow-2xl border-[0.5px] border-gray-500"
//         >
//           <div className="flex gap-5 p-3 m-3">
//             <p className="p-1 px-4 w-3xs">email :</p>

//             <input
//               type="email"
//               name="email"
//               value={email}
//               required
//               className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="flex gap-5 p-3 m-3">
//             <p className="p-1 px-4 w-3xs">password :</p>

//             <input
//               type="password"
//               name="password"
//               value={password}
//               required
//               className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center justify-center">
//             <button
//               type="submit"
//               className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black cursor-pointer"
//             >
//               Login
//             </button>
//           </div>

//           {error && (
//             <div className="flex items-center gap-2 p-3 px-5 mt-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-4xl w-fit mx-auto">
//               <p>{error}</p>
//             </div>
//           )}

//           <div className="flex items-center justify-center">
//             <button
//               type="button"
//               onClick={handleClick}
//               className="mt-5 p-1 px-4 rounded-2xl bg-amber-50 text-black cursor-pointer hover:shadow"
//             >
//               Sign Up instead.
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInComponent;