import React, {useContext} from 'react'
import { images } from '../img'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from "../Context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  //  console.log(data)
 
  return (
    <div className='chat'>
       <div className="chat-info">
        <span>{data?.curUser.displayName}</span>
        <div className='chat-icons'>
           <img src={images.cam} alt="icon"  />
           <img src={images.add} alt="icon"  />
           <img src={images.more} alt="icon"  />
        </div>
       </div>
       <Messages />
       <Input />
    </div>
  )
}

export default Chat