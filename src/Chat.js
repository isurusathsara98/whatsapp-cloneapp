import React,{useEffect, useState} from 'react';
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";
function Chat() {
    const [input,setInput] =useState("");
    const [{user},dispatch] = useStateValue();
    const sendMessage=(e)=>{
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input, 
        });
        setInput("");
    }
    const [seed,setSeed]=useState('');
    const { roomId } = useParams();
    const [ roomName, setRoomName] = useState("");
    const [ messages, setMessages ] = useState([]);
    useEffect(()=>{
        if(roomId){
         db.collection('rooms').doc(roomId).onSnapshot(snapshot=>( setRoomName(snapshot.data().name)));

         db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot((snapshot)=>(setMessages(snapshot.docs.map((doc)=>doc.data())))
         );
        
        }
    },[roomId])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[roomId]);
    return (
        <div className="chat">
             <div className="chat__header">
             <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

             <div className="chat__headerInfo">
                  <h3>{roomName}</h3>
                  <p>{new Date(
                      messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
                </p>                 
              </div>
               <div className="chat__headerright">
                   <IconButton>
                        <SearchIcon/>
                   </IconButton>
                   <IconButton>
                        <AttachFileIcon/>
                   </IconButton>
                   <IconButton>
                        <MoreVertIcon/>
                   </IconButton>
               </div>

            </div>


            <div className="chat__body">
                {messages.map((message)=>(
                     <p className={`chat__message ${message.name==user.displayName && "chat__reciever"}`}>
                         <span className="chat__name">
                             { message.name}
                         </span>
                         {message.message}
                         <span className="chat__timestamp">
                             {new Date(message.timestamp?.toDate()).toUTCString()}
                         </span>

                     </p>
                ))}
            
            </div>
            <div className="chat__footer">
              <IconButton><EmojiEmotionsIcon/></IconButton>
              <form>
                  <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Type a message"/>
                      <button onClick={sendMessage} type="submit">Send</button>         
              </form>
              <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
