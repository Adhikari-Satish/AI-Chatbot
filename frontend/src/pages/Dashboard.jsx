
import React,{useEffect, useState} from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ProfileCard from "../components/ProfileCard";
import Activity from "../components/Activity";
import ChatBox from "../components/ChatBox";
import Profile from "./Profile";
import ChartCard from "../components/ChartCard";
import App from "../App";
function Dashboard(){
    // const [messages, setMessages] = useState([]);
    const [user,setUser]=useState({});
    const [open,setOpen]=useState(false);
    const [page, setPage] = useState("/");
    const [chatId, setChatId] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [stats,setStats]=useState({
        total_chats:0,
        documents:0,
        messages:0
    });
    useEffect(()=>{
        async function fetchData(){
            try{
            const profile =await API.get("/auth/profile");
            setUser(profile.data);
            const dashboard =await API.get("/stats");
            setStats(dashboard.data);
            const chats = await API.get("/chat/get_all");
            console.log("CHAT API RESPONSE:", chats.data);
            setChatHistory(chats.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[]);

    const createNewChat = async () => {
    try {
        const res = await API.post("/chat/create",{title:"New Chat"});
        console.log("CREATE CHAT RESPONSE:",res.data);
        setChatId(res.data.id);
        setChatHistory(prev => [
            res.data,
            ...prev
        ]);
        
        setPage("chat");
        setOpen(false);
        } catch (err) {
        // console.log(err);
        console.log(err.response?.data || err);
        }
    };


    console.log("History:",chatHistory);

console.log("Current page:",page);

console.log("Chat ID:",chatId);
    return(
    <div className="layout">
            <button className="mobmenu"
            onClick={() => setOpen(!open)}>
             {/* {open? <span className="close-icon">✕</span> : <span className="open-icon">☰</span>} */}
             {open? "✕" : "☰"}
            </button>
            <div className={open ? "sidebar-active" : "sidebar-container"}>
            <Sidebar page={page} setPage={setPage} setOpen={setOpen} 
            chatHistory={chatHistory}
            setChatId={setChatId}
            createNewChat={createNewChat}/>
            </div>
        <div className="main">
            <Navbar/>
            <div className="dashboard">
            {page === "/" && (
            <>
            <h1>AI Dashboard</h1>
            <ProfileCard user={user}/>
            <div className="cards">
              <StatCard title="total Chats" value={stats.total_chats} />
              <StatCard title="Documents" value={stats.documents} />
              <StatCard title="Messages" value={stats.messages} />
            </div>

            <div className="dashboard-grid">
              <ChartCard />
              <Activity />
            </div>
            </>
            )}
            {page === "profile" && <Profile />}
            {page === "chat" && chatId && <ChatBox chatId={chatId} />}
            {page === "documents" && <Documents />}
            {page === "history" && <History />}
            
            </div>
        </div>
    </div>
    )
}
export default Dashboard;
