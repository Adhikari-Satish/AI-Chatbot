import { useEffect, useState } from "react";

import {
    createChat,
    sendMessage,
    getMessages
} from "../services/chat";

import Message from "./Message";

function ChatBox() {

    const [chatId, setChatId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    async function startChat() {

        const res = await createChat();

        setChatId(res.data.id);

    }

    useEffect(() => {

        startChat();

    }, []);

    async function handleSend() {

        if (!input.trim()) return;

        await sendMessage(chatId, input);

        const history = await getMessages(chatId);

        setMessages(history.data.messages);

        setInput("");

    }

    return (

        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "20px"
            }}
        >

            <div
                style={{
                    flex: 1,
                    overflowY: "auto"
                }}
            >

                {messages.map((msg, index) => (

                    <Message
                        key={index}
                        message={msg}
                    />

                ))}

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "10px"
                }}
            >

                <input
                    style={{
                        flex: 1,
                        padding: "12px"
                    }}
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)}
                    placeholder="Ask anything..."
                />

                <button
                    onClick={handleSend}
                >
                    Send
                </button>

            </div>

        </div>

    );

}

export default ChatBox;