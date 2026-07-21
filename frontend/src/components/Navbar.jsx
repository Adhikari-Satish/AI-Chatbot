import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import ThemeToggle from "./ThemeToggle";

function Navbar(){
    const navigate = useNavigate();
    const [open,setOpen]=useState(false);

    return(
    <div className="navbar">
        {/* <h3>
           AI Dashboard👋
        </h3> */}
        <div className="user-menu">
            <button onClick={()=>{localStorage.removeItem("token");
                    window.location="/";}}>
                    {/* navigate("/login");}} */}
                    Logout
                </button>
        {/* <button onClick={()=>setOpen(!open)}>👤</button>
        {open && (
            <div className="dropdown">
                <button onClick={()=>navigate("/profile")}>
                    Profile
                </button>
               
                <button onClick={()=>{localStorage.removeItem("token");
                    window.location="/";}}>
                    Logout
                </button>
            </div>
        )} */}

    </div>
    </div>

    )

}


export default Navbar;