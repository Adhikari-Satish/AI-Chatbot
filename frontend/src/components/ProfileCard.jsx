import React from "react";


function ProfileCard({user}){
    return (
    <div className="profile-card">
        <div className="avatar">
            {user.username?user.username.charAt(0).toUpperCase() :"U"}
        </div>
        <div>
            <h3>{user.username || "User"}</h3>
            <p>{user.email || ""}</p>
            <small>
                Joined:{new Date(user.created_at).toLocaleDateString()}
            </small>
        </div>
    </div>
    )

}


export default ProfileCard;