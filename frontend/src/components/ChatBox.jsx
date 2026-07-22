// import { useEffect, useState } from "react";

// import {
//     createChat,
//     sendMessage,
//     getMessages
// } from "../services/chat";

// import Message from "./Message";

// function ChatBox() {

//     const [chatId, setChatId] = useState(null);

//     const [messages, setMessages] = useState([]);

//     const [input, setInput] = useState("");

//     async function startChat() {

//         const res = await createChat();

//         setChatId(res.data.id);

//     }

//     useEffect(() => {

//         startChat();

//     }, []);

//     async function handleSend() {

//         if (!input.trim()) return;

//         await sendMessage(chatId, input);

//         const history = await getMessages(chatId);

//         setMessages(history.data.messages);

//         setInput("");

//     }

//     return (

//         <div
//             style={{
//                 flex: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 padding: "20px"
//             }}
//         >

//             <div
//                 style={{
//                     flex: 1,
//                     overflowY: "auto"
//                 }}
//             >

//                 {messages.map((msg, index) => (

//                     <Message
//                         key={index}
//                         message={msg}
//                     />

//                 ))}

//             </div>

//             <div
//                 style={{
//                     display: "flex",
//                     gap: "10px"
//                 }}
//             >

//                 <input
//                     style={{
//                         flex: 1,
//                         padding: "12px"
//                     }}
//                     value={input}
//                     onChange={(e) =>
//                         setInput(e.target.value)}
//                     placeholder="Ask anything..."
//                 />

//                 <button
//                     onClick={handleSend}
//                 >
//                     Send
//                 </button>

//             </div>

//         </div>

//     );

// }

// export default ChatBox;

// import React, { useEffect, useRef, useState } from "react";
// import API from "../services/api";

// function ChatBox({ chatId }) {

//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);

//     const bottomRef = useRef(null);

//     // Load previous messages whenever chat changes
//     useEffect(() => {

//         if (!chatId) {
//             setMessages([]);
//             return;
//         }

//         loadMessages();

//     }, [chatId]);

//     // Auto scroll
//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({
//             behavior: "smooth"
//         });
//     }, [messages]);

//     async function loadMessages() {

//         try {

//             const res = await API.get(`/messages/${chatId}`);

//             setMessages(res.data);

//         } catch (err) {

//             console.log(err);

//         }

//     }

//     async function sendMessage() {

//         if (!input.trim()) return;

//         if (!chatId) {

//             alert("Create a new chat first.");

//             return;

//         }

//         const userMessage = {
//             role: "user",
//             content: input
//         };

//         setMessages(prev => [...prev, userMessage]);

//         const text = input;

//         setInput("");

//         setLoading(true);

//         try {

//             const res = await API.post(
//                 "/messages/generate_message",
//                 null,
//                 {
//                     params: {
//                         chat_id: chatId,
//                         content: text
//                     }
//                 }
//             );

//             const aiMessage = {
//                 role: "assistant",
//                 content: res.data.response
//             };

//             setMessages(prev => [...prev, aiMessage]);

//         } catch (err) {

//             console.log(err);

//         } finally {

//             setLoading(false);

//         }

//     }

//     function handleKey(e) {

//         if (e.key === "Enter") {

//             sendMessage();

//         }

//     }

//     return (

//         <div className="chat-container">

//             <div className="chat-header">

//                 AI Assistant

//             </div>

//             <div className="chat-messages">

//                 {
//                     messages.length === 0 ?

//                         <div className="empty-chat">

//                             Start a conversation...

//                         </div>

//                         :

//                         messages.map((msg, index) => (

//                             <div
//                                 key={index}
//                                 className={
//                                     msg.role === "user"
//                                         ? "user-message"
//                                         : "bot-message"
//                                 }
//                             >

//                                 {msg.content}

//                             </div>

//                         ))
//                 }

//                 {
//                     loading &&

//                     <div className="bot-message">

//                         Thinking...

//                     </div>
//                 }

//                 <div ref={bottomRef}></div>

//             </div>

//             <div className="chat-input">

//                 <input
//                     type="text"
//                     placeholder="Ask anything..."
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={handleKey}
//                 />

//                 <button onClick={sendMessage}>

//                     Send

//                 </button>

//             </div>

//         </div>

//     );

// }

// export default ChatBox;

function ChatBox({chatId,setChatId}){


console.log("Current Chat ID:",chatId);


return(
<div>

<h2>
{
chatId 
? `Chat ID : ${chatId}`
:"New Chat"
}
</h2>


</div>
)

}


export default ChatBox;