// import { Navigate } from "react-router-dom";
// import React from "react";

// function ProtectedRoute({ children }) {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         return <Navigate to="/login" replace/>;
//     }

//     return children;
// }

// export default ProtectedRoute;

import React,{useEffect,useState} from "react";
import {Navigate} from "react-router-dom";
import API from "../services/api";
function ProtectedRoute({children}){
    const [loading,setLoading]=useState(true);
    const [valid,setValid]=useState(false);
    useEffect(()=>{
        async function verifyToken(){
            const token = localStorage.getItem("token");
            if (!token) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }
            try{
                const response= await API.get("/auth/profile");
                if (response.status === 200) {
                    setValid(true);
                }
            }
            catch(error){
                console.log("Authentication failed:", error);
                localStorage.removeItem("token");
                setValid(false);
            }
            setLoading(false);
        }
        verifyToken();
    },[]);
    if(loading){
        return <h2>Checking authentication...</h2>;
    }
    if(!valid){
        return <Navigate to="/login"/>
    }
    return children;
}
export default ProtectedRoute;