import { useState } from 'react'
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css'
import ForgotPassword from './pages/ForgotPassword'
function App() {

  return (

      <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/forgot"
        element={<ForgotPassword />}
      />
      {/* <Route path="profile" element={<Profile/>}/> */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
   
  )
}

export default App
