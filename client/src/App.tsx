import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  let [res,setRes] = useState('')
  
  const ws = new WebSocket("ws://localhost:8888");
  
  useEffect(()=>{
    ws.onopen = () => {
      console.log("connect 했음!!");
    };
  },[])


  
  const sendMessage = () => {  // 화살표함수로 만들것!!
    ws.send("okay");  // 서버로 메세지 보내는건 send
    
    ws.onmessage = (evt: MessageEvent) => {
      setRes(evt.data)
    };  

  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
        >
          {res}
        </a>
        <button onClick={sendMessage}>SendMessage</button>
      </header>
    </div>
  );
}

export default App;
