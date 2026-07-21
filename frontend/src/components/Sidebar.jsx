// import { useNavigate , Link} from "react-router-dom";
// import React from "react";

// function Sidebar() {

//     const navigate = useNavigate();

//     function logout() {

//         localStorage.removeItem("token");

//         navigate("/");

//     }

//     return (

//         <div
//             style={{
//                 width: "250px",
//                 background: "#202123",
//                 color: "white",
//                 padding: "20px",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between"
//             }}
//         >

//             <div>

//                 <button
//                     style={{
//                         width: "100%",
//                         padding: "10px",
//                         cursor: "pointer"
//                     }}
//                 >
//                     + New Chat
//                 </button>

//                 <hr />

//                 <h3>Your Chats</h3>

//                 {/* Later we'll load chats from database */}

//             </div>

//             <button
//                 onClick={logout}
//                 style={{
//                     padding: "10px",
//                     cursor: "pointer"
//                 }}
//             >
//                 Logout
//             </button>

//         </div>

//     );

// }

// export default Sidebar;


import React from "react";
import { Link, Navigate } from "react-router-dom";


function Sidebar(){
    return (
    <div className="sidebar">
        <h2>AI Chatbot</h2>
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/history">History</Link>
        <Link to="/documents">Documents</Link>
        <Link to="/settings">Settings</Link>
        </div>
    );

}


export default Sidebar;