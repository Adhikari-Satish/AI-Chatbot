import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import ThemeToggle from "./ThemeToggle";

function Navbar(){
    // const navigate = useNavigate();
    // const [open,setOpen]=useState(false);
    const logout = ()=>{
    localStorage.removeItem("token");
    navigate("/login");
};

    return(
    <div className="navbar">
        <div className="user-menu">
            {/* <button onClick={()=>{localStorage.removeItem("token").clear();
                    window.location="/login";}}> */}
                    {/* navigate("/login");}}> */}
                <button onClick={logout}>
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