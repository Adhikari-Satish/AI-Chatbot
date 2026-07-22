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
import { useState } from "react";
import image from "../assets/image.png";


function Sidebar({page, setPage, setOpen, chatHistory, setChatId, createNewChat}){
    const changePage = (name) => {
        setPage(name);
        setOpen(false);
    };
    const openChat=(chat)=>{
      setChatId(chat.id);
      setPage("chat");
      setOpen(false);
    };
    return (
    <div className="sidebar">
        <button onClick={() => changePage("/")}>
        Dashboard
      </button>
      <button onClick={() => changePage("profile")}>
        Profile
      </button>
      <button onClick={() => changePage("documents")}>
        Documents
      </button>
      {/* <button onClick={() => {changePage("chat");createNewChat}}> */}
      <button onClick={() => changePage("history")}>
        History
      </button>
      <button onClick={createNewChat}>
       <img src={image} className="ima" alternae="im"></img> New chat
      </button>

      {/* <hr /> */}
      <h3 className="history-title">Recent Chats</h3>
      <div className="history-list">
        {chatHistory && chatHistory.length > 0 ?
        chatHistory.map(chat=>(
          <button key={chat.id} className="history-item" onClick={()=>{
            setChatId(chat.id);
              openChat(chat.id)
              setPage("chat");
            setOpen(false);
          }}>
            {chat.title}
          </button>
        )):<p>No chats available</p>
        }
      </div>
        {/* <h2>AI Chatbot</h2>
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/history">History</Link>
        <Link to="/documents">Documents</Link>
        <Link to="/settings">Settings</Link> */}
    </div>
    );
}
export default Sidebar;