
import React from "react";

function ProfileCard({ user = {} }) {
    return (
        <div className="profile-card">

            <div className="avatar">
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
                <h3>{user.username || "User"}</h3>

                <p>{user.email || "No Email"}</p>

                <small>
                    Joined:{" "}
                    {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "N/A"}
                </small>
            </div>
        </div>
    );
}

export default ProfileCard;