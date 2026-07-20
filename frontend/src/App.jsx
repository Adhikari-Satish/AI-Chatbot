import { useState } from 'react'
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Routes, Route, Link } from "react-router-dom"
import Chat from "./pages/Chat"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Link to="/register">Register</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/">Login</Link> */}
      <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/chat"
        element={<Chat />}
        />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
    </>
  )
}

export default App
