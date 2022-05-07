import React, { useState, useEffect } from 'react';

const Header = (props) => {
    const socket = props.socket
    const [userCounter, setUserCounter] = useState(0);

    useEffect(() => {
        socket.on("userCounter", msg => {
            setUserCounter(msg)
        })
    },[socket])

    return (
        <div className="header">
            <span className="logo">YVlive</span>
            <span>이용중인 유저 수: {userCounter}</span>
            {props.isJoined 
            ?<div className="leave-button" onClick={()=>{
                socket.emit("leaveAll",props.roomId)
            }}>
                <span className="search-button-text">나가기</span>
            </div>
            :<div className="search-button" onClick={()=>{
                socket.emit("joinRoom","")
                // useContext써서 새로 찾으면 채팅내역 다 지우기
            }}>
                <span className="search-button-text">새로찾기</span>
            </div>}
            
        </div>
    );
};

export default Header;