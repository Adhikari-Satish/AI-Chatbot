import { useState } from 'react'
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/Chat"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css'
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
      <Route path="profile" element={<Profile/>}/>

      <Route
        path="/chat"
        element={<Chat />}
        />

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
