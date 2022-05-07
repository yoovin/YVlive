import React, { useState } from 'react';

const Footer = (props) => {
    const [contents, setContents] = useState({
        message:"",
        name:props.name,
        roomId:props.roomId
    });

    const socket = props.socket

    return (
        <div className="footer">
            <input 
            type="text" 
            className="input-chat" 
            value={contents.message} 
            onChange={(e) => {
                setContents({message:e.target.value, name:props.name, roomId: props.roomId})
            }}
            onKeyPress={e => {
                if(e.key === "Enter"){
                    const {name, message, roomId} = contents
                    socket.emit("message", {name, message, roomId})
                    setContents({message:"", name, roomId})
                }
            }}
            />
            <div 
            className="send-button"
            onClick={() => {
                const {name, message, roomId} = contents
                socket.emit("message", {name, message, roomId})
                setContents({message:"", name, roomId})
            }
            }></div>
        </div>
    );
};

export default Footer;