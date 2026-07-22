import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createRoot } from 'react-dom/client'
// import {ThemeProvider} from "./pages/ThemeContext"
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App'
// import "./styles/dashboard.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
      <App />
</BrowserRouter>
    </React.StrictMode>
)
