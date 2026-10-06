import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ClerkProvider } from "@clerk/react";
import { AuthProvider } from './Context/AuthContext.jsx';

const PUBLISHER_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUBLISHER_KEY){
  throw new Error("Publisher Key not available")
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHER_KEY}> */}
      <AuthProvider>
        <App />
      </AuthProvider>
    {/* </ClerkProvider> */}
  </StrictMode>,
);
