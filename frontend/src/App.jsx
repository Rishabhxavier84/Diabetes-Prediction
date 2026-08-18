import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation, Form, Footer, AdminDashboard } from "#Components";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        {/* <Navigation /> */}
        {/* <Footer /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App