import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Chat from './components/Chat';
import io from 'socket.io-client'

const socket = io.connect('http://61.255.79.207:3001/')

function App() {
  const name = new Date().getTime().toString(36)

  return (
    <div className="App">
      <Header socket={socket}/>
      <Chat name={name} socket={socket}/>
      <Footer name={name} socket={socket}/>
    </div>
  );
}

export default App;
