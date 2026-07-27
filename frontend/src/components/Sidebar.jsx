
import React from "react";
import { useState, useEffect } from "react";
import image from "../assets/add.png";
import threedots from "../assets/threedots.png";
import {
    renameChat,
    deleteChat
} from "../services/chat";
// import api from "../services/api";

function Sidebar({page, setPage, setOpen, chatHistory, setChatId, createNewChat, setChatHistory,currentChatId, setCurrentChatId}){
    // const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(null);
    const changePage = (name) => {
        setPage(name);
        setOpen(false);
    };
    const changethreedots = (name) => {
        setPage(name);
        // setOpen(false);
    };
    const openChat=(chat)=>{
      setChatId(chat.id);
      setCurrentChatId(chat.id);
      setPage("chat");
      setOpen(false);
    };
    useEffect(() => {
    if(currentChatId){
        console.log("Current chat:", currentChatId);
    }
    }, [currentChatId]);
    const handleDelete = async (chatId) => {
    try {
        await deleteChat(chatId);
        setChatHistory(prev =>
            prev.filter(chat => chat.id !== chatId)
        );
        // console.log(chatId)
        // console.log(currentChatId)
        // If deleted chat is open
        if (chatId === currentChatId) {
            setChatId(null);
            setCurrentChatId(null)
            setPage("/");
            // console.log("Deleting chat:", currentChatId);
        }

    } catch (err) {
        // alert("delete failed");
        console.log(err.response?.data || err);
    }
  };
  const handleRename = async (chatId) => {
    const newTitle = prompt("Enter new chat title");
    if (!newTitle) return;
    try {
        await renameChat(chatId, newTitle);
        setChatHistory(prev =>
            prev.map(chat =>
                chat.id === chatId
                    ? { ...chat, title: newTitle }
                    : chat
            )
        );
    } catch (err) {
        alert("Rename failed");
        // console.log(err.response?.data || err);
    }
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
      <button onClick={() => changePage("forgot")}>
        Forgot password
      </button>
      <button onClick={createNewChat} className="ima1">
       <img src={image} className="ima" alternae="im"></img> New chat
      </button>
      {/* <hr /> */}
      <h3 className="history-title">Recent Chats</h3>
      <div className="history-list">
        {chatHistory && chatHistory.length > 0 ?
        chatHistory.map(chat=>(
          <div className="history-wrapper" key={chat.id}>
          <button key={chat.id} className="history-item" onClick={()=>
          //   {
          //   setChatId(chat.id);
          //     openChat(chat.id)
          //     setPage("chat");
          //   setOpen(false);
          // }
          openChat(chat)
          }
          title={chat.title}

          >

            {/* {chat.title} */}
            {/* <div className="both">
            <span className="ima2"
              onClick={(e) => {
                e.stopPropagation();
                handleRename(chat.id);
              }}
            >
              ✏️
            </span>

            <span className="ima3"
              onClick={(e) => {
                e.stopPropagation();                
                handleDelete(chat.id);               
              }}
            >
              🗑
            </span>
            </div> */}
            <span className="chat-title">
            {chat.title}
            </span>
          <img
          src={threedots}
          alt="menu"
          className="threedot"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(menuOpen === chat.id ? null : chat.id);
          }}
          />
          </button>
          {menuOpen === chat.id && (
          <div
            className="history-dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dropdown-item"
              onClick={() => {
                handleRename(chat.id);
                setMenuOpen(null);
              }}
            >
              ✏️ Rename
            </div>

            <div className="dropdown-item delete"
              onClick={() => {
                handleDelete(chat.id);  
                setMenuOpen(null);
              }}
            >
              🗑 Delete
            </div>
          </div>
          )}
            {/* <img src={threedots} className="ima2" alternae="im" 
            onClick={(e) => {
              e.stopPropagation(); 
              changethreedots("/")}}>
            </img> */}
          {/* </button> */}
          </div>
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