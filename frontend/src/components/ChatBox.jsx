import React, { useEffect, useState } from "react";
import API from "../services/api";


function ChatBox({ chatId, setChatId, chatHistory, setChatHistory }) {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    console.log("Current Chat ID:", chatId );

    // Load messages whenever chatId changes
    useEffect(() => {
        if (!chatId) return;
        loadMessages();
    }, [chatId]);

    const loadMessages = async () => {
        try {
            const res = await API.get(`/messages/chats/${chatId}/messages`);
            // console.log("API Response:", res.data);
            // console.log("Is Array:", Array.isArray(res.data));
            setMessages(res.data.messages);
        } catch (err) {
            console.log(err);
        }
    };

    const sendMessage = async () => {
        if (content.trim() === "") return;
        const userMessage = content;
        setLoading(true);
        try {
            const res = await API.post(
                "/messages/generate_message",
                null,
                {
                    params: {
                        chat_id: chatId,
                        // content: content
                        content: userMessage
                    }
                }
            );

            // Add user message
            setMessages(prev => [
                ...prev,
                {
                    role: "user",
                    content: userMessage
                },
            // ]);
            // // Add AI message
            // setMessages(prev => [
            //     ...prev,
                {
                    role: "assistant",
                    content: res.data.response
                }
            ]);

            // Find current chat
        const currentChat = chatHistory.find(
            chat => chat.id === chatId
        );
        // Rename only if title is New Chat
        if (
            currentChat &&
            currentChat.title === "New Chat"
        ) {
            const newTitle = userMessage.slice(0, 30);
            await API.put(
                `/chat/${chatId}`,
                {
                    title: newTitle
                }
            );
            // Update sidebar immediately
            setChatHistory(prev =>
                prev.map(chat =>
                    chat.id === chatId
                    ?
                    {
                        ...chat,
                        title:newTitle
                    }
                    :
                    chat
                )
            );

        }

            setContent("");
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <div className="chatbox">
            {/* <h2>
                Chat:{chatId}
            </h2> */}
            <div className="messages">
                {messages.length === 0 ? (
                    <p>AI ASSISTANT : I am ready to begin ...</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={msg.role}
                        >
                            {/* <b>{msg.role} :</b> */}
                            {msg.content}
                        </div>
                    ))
                )}
            </div>
            <div className="chat-input">
                <textarea rows={1}
                    type="text"
                    value={content}
                    placeholder="Type your message..."
                    onChange={(e) => {setContent(e.target.value)
                         e.target.style.height = "auto";
                        e.target.style.height =
                            Math.min(
                                e.target.scrollHeight, 250) + "px";
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
}

export default ChatBox;

// function ChatBox({chatId,setChatId}){


// console.log("Current Chat ID:",chatId);


// return(
// <div>

// <h2>
// {
// chatId 
// ? `Chat ID : ${chatId}`
// :"New Chat"
// }
// </h2>


// </div>
// )

// }


// export default ChatBox;