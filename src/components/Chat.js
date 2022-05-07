import React, { useState, useEffect } from 'react';



const Chat = (props) => {
    const [chat, setChat] = useState([]);
    const socket = props.socket

    useEffect(() => {
        socket.on('message', ({name, message}) => {
            setChat([...chat,{name,message}])
        })
    },[chat])


    return (
        <div className="chat-view">
            {chat.map(({name, message}) => (
                <div className="chat-line">
                {name == props.name ? "나" 
                : name == "notion" ? "알림"
                : "상대방"}: {message}
                <hr/>
                </div>
            ))}
        </div>
    );
};

export default Chat;