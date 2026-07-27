import { useState } from "react"
import { login } from "../services/auth.js"
import { Link, useNavigate } from "react-router-dom"
import eye from "../assets/eye.png";
import eyeOff from "../assets/eye-off.png";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    // const [password, setPassword] = useState("");
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
        } catch(err) {
            setError(
        err.response?.data?.detail ||
        "Invalid email or password"
        );
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
                    required
                />
                <div className="password-box">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />
                <img
                        src={showPassword ? eyeOff : eye}
                        alt="toggle password"
                        className="eye-img"
                        onClick={() => setShowPassword(!showPassword)}
                         />
                </div>
                <button type="submit">
                    Login
                </button>
                <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
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