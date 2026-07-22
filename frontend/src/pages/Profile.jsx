import React,{useEffect,useState} from "react";
import API from "../services/api";


function Profile(){
    const [user,setUser]=useState({});
    useEffect(()=>{
        loadProfile();
    },[]);
    const loadProfile=async()=>{
        const res =await API.get("/auth/profile");
        setUser(res.data);
    }
    const updateProfile=async()=>{
        await API.put("/auth/profile",{username:user.username,email:user.email});
        alert("Profile updated");
    }
    
    return(
    <div className="profile-page">
        <h1>
            Profile Settings
        </h1>
        <input value={user.username || ""} onChange={e=>setUser({...user,username:e.target.value})}/>
        <input value={user.email || ""} onChange={e=>setUser({...user,email:e.target.value})}/>
       <button onClick={updateProfile}> Save Changes </button>
       </div>
       
    )
}


export default Profile;