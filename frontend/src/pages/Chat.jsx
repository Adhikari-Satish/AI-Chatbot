// import {useState} from "react";
// import axios from "axios";


// function Chat(){
//     const [message,setMessage]=useState("");
//     const [response,setResponse]=useState("");
//     const sendMessage=async()=>{
//         const result = await axios.post("http://127.0.0.1:8000/api/v1/chat/", {
//             title: message
//         });
//         setResponse(result.data.response);
//     };
//     return (
//     <div>
//         <h1>AI Chatbot</h1>
//         <input value={message}  onChange={(e)=>setMessage(e.target.value)} placeholder="Ask something"/>
//         <button onClick={sendMessage}> Send</button>
//         <h3>{response}</h3>
//     </div>
//     );
// }


// export default Chat;