import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Navigation,
  Form,
  AdminDashboard,
  SignInComponent,
  Denied,
  SignUpComponent,
  Dashboard
} from "#Components";
import ProtectedRoute from "./Protected/ProtectedRoute";
import RoleBasedRoute from "./Protected/RoleBasedRoute";
import AdminRoute from "./Components/Admin/AdminRoute";
import ManageUser from "./Components/Admin/ManageUser";
// import Dashboard from "./Components/Dashboard";
// import { SignIn, Show } from "@clerk/react";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <RoleBasedRoute/>
          </ProtectedRoute>} />

        <Route path="/signin" element={<SignInComponent/>} />
        <Route path="/signup" element={<SignUpComponent />} />

        <Route path="/form" element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        } />

        <Route path="/user/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        }/>

        <Route path="/admin/manage-users" element={
          <AdminRoute>
            <ManageUser/>
          </AdminRoute>
        }/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
