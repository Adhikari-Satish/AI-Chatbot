import { useState } from "react"
import { login } from "../services/auth.js"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await login(
                email,
                password
            );

            localStorage.setItem(
                "token",
                res.data.access_token
            );

            navigate("/");

        } catch {

            setError("Invalid Email or Password");

        }

    };

    return (
        <div className="auth-container">
        <div className="auth-card">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">
                    Login
                </button>
            </form>
             <p className="error">{error}</p>
            <p className="auth-link">
                New User?&nbsp;&nbsp;
                <Link to="/register">
                    Register
                </Link>
            </p>
        </div>
        </div>
    );
}