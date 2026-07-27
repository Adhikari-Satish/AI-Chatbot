import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import image from "../assets/logout.png";

// import ThemeToggle from "./ThemeToggle";

function Navbar(){
    const navigate = useNavigate();
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
                <button onClick={logout} className="naima1">
                    Logout
                    <img src={image} className="naima" alternae="im"></img>
                </button>
        </div>
    </div>

    )

}


export default Navbar;