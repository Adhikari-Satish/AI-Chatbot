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

        <div>

            <h2>Login</h2>

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
            <p>
                New User?&nbsp;&nbsp;
                <Link to="/register">
                    Register
                </Link>
            </p>
            <p>{error}</p>

        </div>

    );

}