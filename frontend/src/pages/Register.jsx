import { useState } from "react";
import { register } from "../services/auth.js";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({

        username: "",

        email: "",

        password: ""

    });
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    // setErrors({

    //         ...errors,

    //         [e.target.name]: ""

    //     });

    const handleSubmit=async (e) => {

        e.preventDefault();

        try {

            await register(form);

            alert("Registration Successful");
            setForm({
            username:"",
            email:"",
            password:""});

            navigate("/");

        }

        catch(error){
            const detail =error.response?.data?.detail;
            if(detail?.field==="email"){
                setErrors({ email: detail?.message });
            }
            else{
                setErrors({ server: detail?.message ||"Registration failed" });
            }
        }

            // console.log(error.response);
            // alert(error.response?.data?.detail ||"Registration failed");
            // let message =error.response?.data?.detail ||"Registration failed";
            // setErrors({

            //     server: message

            // });
        }

    return (
        <div className="auth-container">
        <div className="auth-card">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    minLength={6}
                    required
                />

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                {/* { errors.email && <p style={{color:"red"}}>    {errors.email} </p>} */}
                <input
                    name="password"
                    type="password"
                    minLength={6}
                    // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
                    value={form.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button>
                    Register
                </button>

            </form>
            { errors.email && <p className="error">    {errors.email} </p>}

            {
                errors.server &&

                <p className="error">
                    {errors.server}
                </p>

            }
            <p className="auth-link">Already have account?&nbsp;&nbsp;
             <Link to="/">
                 Login
            </Link></p>
            {/* <Link to="/">Login</Link> */}

        </div>
        </div>

    );
}

export default Register;
                        