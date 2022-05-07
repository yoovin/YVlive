import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Chat from './components/Chat';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io.connect('http://61.255.79.207:3001/')

function App() {
  const name = new Date().getTime().toString(36)
  const [roomId, setRoomId] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    socket.on("roomId", msg => {
      setRoomId(msg)
      setIsJoined(true)
      console.log(roomId)
    })

    socket.on("signal", msg => {
      socket.emit(msg, roomId)
      setIsJoined(false)
    })
  },[socket])

  return (
    <div className="App">
      <Header socket={socket} isJoined={isJoined} roomId={roomId}/>
      <Chat name={name} socket={socket}/>
      <Footer name={name} roomId={roomId} socket={socket}/>
    </div>
  );
}

export default App;
