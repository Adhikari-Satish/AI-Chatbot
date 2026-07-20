function Message({ message }) {

    const isUser = message.role === "user";

    return (

        <div
            style={{
                textAlign: isUser ? "right" : "left",
                marginBottom: "15px"
            }}
        >

            <span
                style={{
                    display: "inline-block",
                    padding: "12px",
                    borderRadius: "10px",
                    background: isUser ? "#4F46E5" : "#E5E7EB",
                    color: isUser ? "white" : "black",
                    maxWidth: "70%"
                }}
            >

                {message.content}

            </span>

        </div>

    );

}

export default Message;