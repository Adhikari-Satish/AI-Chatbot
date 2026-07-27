import React,{useEffect, useState} from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import eye from "../assets/eye.png";
import eyeOff from "../assets/eye-off.png";

function Profile({user={}, setUser, setPage}){
    // const [user,setUser]=useState({});
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [password, setPassword] = useState("");
    const [username,setUsername] = useState(user.username || "");
    const [email,setEmail] = useState(user.email || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [error1, setError1] = useState("");
    const [success1, setSuccess1] = useState("");
    const [error2, setError2] = useState("");
    const [success2, setSuccess2] = useState("");
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
        
    const changePassword = async()=>{
    setError1("");
    setSuccess1("");
    if(!oldPassword || !newPassword || !confirmPassword){
        setError1("All password fields are required");
        return;
    }
    if(newPassword !== confirmPassword){
        setError1("New password and confirm password do not match");
        return;
    }
    if(newPassword.length < 6){
        setError1("Password must be minimum 6 characters");
        return;
    }
    try{
        const res = await API.put("/auth/change-password",{
            old_password: oldPassword,
            new_password: newPassword
        });
        setSuccess1("Password changed successfully");
        alert("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }
    catch(err){
        setError1(
            err.response?.data?.detail ||
            "Password change failed"
        );
    }
    }

    const deleteAccount = async()=>{
    setError2("");
    setSuccess2("");
    const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
    );
    if(!confirmDelete)
        return;
    try{
        await API.delete("/auth/delete-account");
        setSuccess2("Account deleted successfully");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login")
    }
    catch(err){
        setError2(
        err.response?.data?.detail ||
        "Delete failed"
        );
    }
    }

    const updateProfile=async()=>{
        setError("");
        setSuccess("");
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
        setSuccess("Profile updated successfully");
    }catch(err){
        console.log(err.response?.data);
        setSuccess("");
        setError(
        err.response?.data?.detail || "Updated failed"
       );
    }
        
    }
    
    return(
//     <div className="profile-page">
//         <h1>
//             Profile Settings
//         </h1>
//         <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" minLength={6} required/>
//         <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
//        <button onClick={updateProfile}> Save Changes </button>
//        {error && (
//     <p className="error">
//         {error}
//     </p>
// )}
//        </div>
    <div className="profile-page">

    <h1>Profile Settings</h1>

    {/* Personal Information */}

    <div className="profile-card">

        <h2>Personal Information</h2>

        <div className="profile-avatar">
            <img
                src="https://ui-avatars.com/api/?name=User"
                alt="profile"
            />
        </div>
        <input
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username"
        />

        <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
        />

        <button onClick={updateProfile}>
            Save Changes
        </button>
            {error && (
    <div className="profile-error">
        {error}
    </div>
    )}
    {success && (
    <div className="profile-success">
        {success}
    </div>
    )}
    </div>


    {/* Account */}

    <div className="profile-card">

        <h2>Account Information</h2>

        {/* <div className="info-row">
            <span>User ID :</span>
            <span>{user.id}</span>
        </div> */}
        <div className="info-row">
           <span className="row1">Username</span>
            <span className="row2">: {user.username}</span>
        </div>
        <div className="info-row">
        <span className="row1">Email</span>
        <span className="row2">: {user.email}</span>
        </div>
        {/* <div className="info-row">
            <span>Joined</span>
            <span>: {user.created_at}</span>
        </div> */}

    </div>

    {/* Password */}

    <div className="profile-card">

        <h2>Change Password</h2>
        {/* <input
            type="password"
            placeholder="Current Password"
        />
        <input
            type="password"
            placeholder="New Password"
        />
        <input
            type="password"
            placeholder="Confirm Password"
        /> */}
        <div className="password-box">
        <input
        type={showOld ? "text" : "password"}
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        />

        <img
        src={showOld ? eyeOff : eye}
        alt="toggle password"
        className="eye-img"
        onClick={() => setShowOld(!showOld)}
         />
        </div>
        <div className="password-box">
        <input
        type={showNew ? "text":"password"}
        placeholder="new Password"
        minLength={6}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        />

        <img
        src={showNew ? eyeOff : eye}
        alt="toggle password"
        className="eye-img"
        onClick={() => setShowNew(!showNew)}
         />
        </div>
        <div className="password-box">
        <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <img
        src={showConfirm ? eyeOff : eye}
        alt="toggle password"
        className="eye-img"
        onClick={() => setShowConfirm(!showConfirm)}
         />
        </div>
        <button onClick={changePassword}>
            Change Password
        </button>
                {error1 && (
    <div className="profile-error">
        {error1}
    </div>
    )}
    {success1 && (
    <div className="profile-success">
        {success1}
    </div>
    )}
    </div>

    {/* Preferences */}

    {/* <div className="profile-card">

        <h2>Preferences</h2>

        <label className="lab1">
            <span className="lab2">Email Notifications </span>
            <input type="checkbox"/>
        </label>
        <label className="lab1">
            <span className="lab2">Dark Mode</span>
            <input type="checkbox"/>
            
        </label>

    </div> */}

    {/* Danger */}

    <div className="profile-card danger">

        <h2>Danger Zone</h2>

        <button className="delete-btn" onClick={deleteAccount}>
            Delete Account
        </button>
    {error2 && (
    <div className="profile-error">
        {error2}
    </div>
    )}
    {success2 && (
    <div className="profile-success">
        {success2}
    </div>
    )}
    </div>


</div>
       
    );

}
export default Profile;