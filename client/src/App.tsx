import React,{useEffect,useState} from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import NavBar from './components/NavBar'
import Login from './components/Login'
import ChatText from './components/ChatText'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {changeUserInfo} from './store'
const ws = new WebSocket("ws://localhost:8888");


function App() {

  let [inputMessage,setInputMessage] = useState('')
  let [chatText, setChatText] = useState([
    {id:'',text:''}
  ])
  let [isLogin, setIslogin] = useState(false)

  let dispatch = useDispatch()
  let a = useSelector((state)=>{return state})

  
  useEffect(()=>{
    ws.onopen = () => {
      console.log("connect 했음!!");
    };
  },[])


  
  const ws_sendMessage = (req:any) => {  // 화살표함수로 만들것!!
    ws.send(req);  // 서버로 메세지 보내는건 send
    
    ws.onmessage = (evt: MessageEvent) => {
      setChatText(
        (chatText => [...chatText, {id:'bot',text: JSON.parse(evt.data)}])
      )  
    };  

  };

  const onChangeText = (e:any) =>{
    setInputMessage(e.target.value)
  }

  const sendText = () => {
    if(inputMessage == "블록넘버"){
      ws_sendMessage(inputMessage)
    } else if(inputMessage == "변경"){
      // dispatch(changeUserInfo())
      console.log(a)
    }

    setChatText(
      (chatText => [...chatText, {id:'d',text: inputMessage}])
    )
    // return(chatText)
  }



  const onKeyPress = (e:any) =>{
    if(e.key =="Enter"){
      sendText();
    }
  }


  
  return (
    <div className="App">
      <NavBar />

      <div className="chatArea">        
        <div className='chatState'>
          {
          chatText.map((a,i) =>
          i == 0?
          null
          :
          <ChatText chat={a} key={i} />          
          )
          }

        </div>
        
        <div className="chatBottom">
          <input placeholder="message 적기" onKeyPress={onKeyPress} onChange={onChangeText}></input>
        <Button onClick={sendText}>보내기</Button>
        </div>
      </div>

    </div>
  );
}

export default App;
