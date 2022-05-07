import React, { useState } from 'react';

const Footer = (props) => {
    const [contents, setContents] = useState({
        message:"",
        name:props.name
    });

    const socket = props.socket

    return (
        <div className="footer">
            <input 
            type="text" 
            className="input-chat" 
            value={contents.message} 
            onChange={(e) => {
                setContents({message:e.target.value, name:props.name})
            }}
            onKeyPress={e => {
                if(e.key === "Enter"){
                    const {name, message} = contents
                    socket.emit("message", {name, message})
                    setContents({message:"", name})
                }
            }}
            />
            <div 
            className="send-button"
            onClick={() => {
                const {name, message} = contents
                socket.emit("message", {name, message})
                setContents({message:"", name})
            }
            }></div>
        </div>
    );
};

export default Footer;