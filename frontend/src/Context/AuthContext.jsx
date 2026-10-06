// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../Api/api";
// import { useNavigate } from "react-router-dom";


// const AuthContext = createContext()

// export function AuthProvider({ children }){
//     const [username, setUsername] = useState('')
//     const [email, setEmail] = useState('')
//     const [isAdmin, setIsAdmin] = useState(false)
//     const [loading, setLoading] = useState(true)
  
//     const token = localStorage.getItem('access_token')

//     useEffect(() => {

//         if (!token){
//             setLoading(false)
//             return 
//         }

//         const getUserDetails = async () =>{
//             try {
//                 const response = await api.get('/auth/me')
//                 // console.log(user.data)
//                 setEmail(response.data.email)
//                 setUsername(response.data.username)
//                 setIsAdmin(response.data.isAdmin)

//                 console.log(response.data)

//                 // console.log(username, email, isAdmin)
                
//             } catch (error) {
//                 console.log(error)

//                 localStorage.removeItem('access_token')
//                 localStorage.removeItem('refresh_token')

//                 setUsername('')
//                 setEmail("")
//                 setIsAdmin(false)
//             } finally {
//                 setLoading(false)
//             }
//         } 

//     getUserDetails();
//     }, []);  
    
//     return (
//         <AuthContext.Provider value={{username, email, isAdmin, loading}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () => {
//     return useContext(AuthContext)
// }


import { createContext, useContext, useEffect, useState } from "react";
import api from "../Api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/me");

      console.log("User data:", response.data);

      setUsername(response.data.username);
      setEmail(response.data.email);
      setIsAdmin(response.data.isAdmin);

      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUsername("");
      setEmail("");
      setIsAdmin(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      fetchUser();
      // console.log(email)
      // console.log(username)
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        email,
        isAdmin,
        loading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);