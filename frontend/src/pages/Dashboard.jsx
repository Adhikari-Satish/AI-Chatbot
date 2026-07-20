import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

function Dashboard() {

    return (

        <div
            style={{
                display: "flex",
                height: "100vh"
            }}
        >

            <Sidebar />

            <ChatBox />

        </div>

    );

}

export default Dashboard;