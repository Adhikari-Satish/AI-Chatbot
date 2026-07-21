import React from "react";


function Activity(){
    const activities=["Account created", "Logged into dashboard", "Profile updated"];
    return(
    <div className="activity">
        <h2>Recent Activity</h2>
        {activities.map((item,index)=>(
            <div className="activity-item" key={index}>
                {item}
                </div>
            ))
        }
    </div>
    )
}


export default Activity;