import React, {useState} from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import eye from "../assets/eye.png";
import eyeOff from "../assets/eye-off.png";

function ForgotPassword(){
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const navigate = useNavigate();
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [otpVerified,setOtpVerified] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirm,setShowConfirm] = useState(false);
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    // Send OTP
    const sendOTP = async()=>{
        setError("");
        setSuccess("");
        try{
            await API.post("/auth/send-otp",{
                email
            });
            setSuccess(
                "OTP sent to your email"
            );
        }
        
        catch(err){
            setError(
                err.response?.data?.detail ||
                "OTP sending failed"
            );
        }
    };
    // Verify OTP
    const verifyOTP = async()=>{
        setError("");
        try{
            await API.post("/auth/verify-otp",{
                email,
                otp
            });
            setOtpVerified(true);
            setSuccess(
                "OTP verified successfully"
            );
        }
        catch(err){
            setError(
            err.response?.data?.detail ||
            "Invalid OTP"
            );
        }
    };
    // Reset Password
    const resetPassword = async()=>{
        setError("");
        setSuccess("");
        if(!newPassword || !confirmPassword){
        setError("All password fields are required");
        return;
        }
        if(newPassword.length < 6){
            setError(
            "Password length must be 6 characters"
            );
            return;
        }
        if(newPassword !== confirmPassword){
            setError(
            "Password does not match"
            );
            return;
        }
        try{
            await API.put("/auth/reset-password",{
                email,
                password:newPassword
            });
            setSuccess(
            "Password reset successfully"
            );
            navigate("/");
        }
        catch(err){
            setError(
            err.response?.data?.detail ||
            "Password reset failed"
            );
        }
    }
    return(
    <div className="forgot-page">
        <div className="forgot-card">
            <h1>Forgot Password</h1>
            {/* Email */}
            <input type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button onClick={sendOTP}>
                Send OTP</button>
            {/* OTP */}
            <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            />
            <button onClick={verifyOTP}>
                Verify OTP</button>
                {otpVerified &&<>
            <div className="password-box">
                <input
                type={showPassword ?"text":"password"}
                placeholder="New Password"
                value={newPassword}
                minLength={6}
                onChange={(e)=>setNewPassword(e.target.value)}
                />
                <img 
                src={showPassword ?eyeOff:eye}
                className="eye-img"
                onClick={()=>setShowPassword(!showPassword)}
                />
                </div>
                <div className="password-box">
                    <input
                    type={showConfirm ?"text":"password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <img src={showConfirm ?eyeOff:eye}
                    className="eye-img"
                    onClick={()=>setShowConfirm(!showConfirm)}/>
                </div>
                <button onClick={resetPassword}>
                    Reset Password</button></>}
                    {error && <p className="error">{error}</p>}
                    {success &&<p className="success">{success}</p>}
            </div>
        </div>
    )
}

export default ForgotPassword;