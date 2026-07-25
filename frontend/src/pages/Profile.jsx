import React,{useEffect, useState} from "react";
import API from "../services/api";
import { Navigate } from "react-router-dom";

function Profile({user={}, setUser, setPage}){
    // const [user,setUser]=useState({});
    const [username,setUsername] = useState(user.username || "");
    const [email,setEmail] = useState(user.email || "");
    const [error, setError] = useState("");
    useEffect(()=>{
    setUsername(user.username || "");
    setEmail(user.email || "");
    },[user]);
      
    
    useEffect(()=>{
        
    async function loadProfile(){
        const res =await API.get("/auth/profile");
        setUser(res.data);
    }
    loadProfile();
    },[]);
    const updateProfile=async()=>{
        if (username.trim().length < 6) {
        setError("Username must be at least 6 characters");
        return;
        }
         try{
        const res = await API.put("/auth/profile", {
            username,
            email
        });

        console.log("Updated:", res.data);
        setUser(res.data);
        setPage("/");

    }catch(err){
        //  console.log(err)
        // console.log(err.response?.data || err);
        // console.log("STATUS:", err.response?.status);
        console.log(err.response?.data);
        setError(
        err.response?.data?.detail || "Update failed"
       );
    }
        // await API.put("/auth/profile",{username:user.username,email:user.email});
        // alert("Profile updated");

    }
    
    return(
    <div className="profile-page">
        <h1>
            Profile Settings
        </h1>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" minLength={6} required/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        {/* <input value={user.username || ""} onChange={e=>setUser({...user,username:e.target.value})}/>
        <input value={user.email || ""} onChange={e=>setUser({...user,email:e.target.value})}/> */}
       <button onClick={updateProfile}> Save Changes </button>
       {error && (
    <p className="error">
        {error}
    </p>
)}
       </div>
       
    );

}
export default Profile;