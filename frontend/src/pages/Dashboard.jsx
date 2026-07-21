
import React,{useEffect, useState} from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import MobileMenu from "../components/MobileMenu";
import StatCard from "../components/StatCard";
import ProfileCard from "../components/ProfileCard";
import Activity from "../components/Activity";
import ChatBox from "../components/ChatBox";
import Profile from "./Profile";
import ChartCard from "../components/ChartCard";

function Dashboard(){
    const [user,setUser]=useState({});
    const [open,setOpen]=useState(false);
    const [stats,setStats]=useState({
        total_chats:0,
        documents:0,
        messages:0
    });
    useEffect(()=>{
        async function fetchData(){
            const profile =await API.get("/auth/profile");
            setUser(profile.data);
            const dashboard =await API.get("/stats");
            setStats(dashboard.data);
        }
        fetchData();
    },[]);
    return(
    <div className="layout">
        {/* <MobileMenu open={menu} setOpen={setMenu}/> */}
        <div className="header">
            <div>
        <button
            className="mobmenu"
            onClick={() => setOpen(!open)}
        >
            {/* {open ? <a >✕ </a>: "☰"} */}
             {open? <span className="close-icon">✕</span> : <span className="open-icon">☰</span>}
        </button>
        <div className={open ? "sidebar-active" : "sidebar1"}>
        <Sidebar/>
        </div>
        </div>
        {/* {open && (
        <div className="mobile-sidebar">

                <Sidebar/>

            </div>)
            } */}
        <div classname="nav">
            <Navbar/>
            </div>
            </div>
            <div className="main">
            <div className="dashboard"> 
                <h1>AI Dashboard</h1>
                <ProfileCard user={user}/>
                <div className="cards">
                    <StatCard 
                    title="Total Chats"
                    value={stats.total_chats}
                    />
                    <StatCard title="Documents" value={stats.documents}/>
                    <StatCard title="Messages" value={stats.messages}/>
                </div>
                <div className="dashboard-grid">
                    <ChartCard/>
                    <Activity/>
               </div>
            </div>
        </div>
    </div>
    )
}


export default Dashboard;
