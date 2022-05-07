import React, { useState, useEffect } from 'react';

const Header = (props) => {
    const socket = props.socket
    const [userCounter, setUserCounter] = useState(0);

    useEffect(() => {
        socket.on("userCounter", msg => {
            setUserCounter(msg)
        })
    })

    return (
        <div className="header">
            <span className="logo">YVlive</span>
            <span>이용중인 유저 수: {userCounter}</span>
            <div className="search-button">
                <span className="search-button-text">새로찾기</span>
            </div>
        </div>
    );
};

export default Header;