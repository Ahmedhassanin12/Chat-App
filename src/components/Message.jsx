import React, { useContext, useRef, useEffect } from "react";
import { UserAuth } from "../Context/UserContext";
import { ChatContext } from "../Context/ChatContext";
const Message = ({ message }) => {
  const { user } = UserAuth();
  const { data } = useContext(ChatContext);
  
  const ref = useRef();
  
  console.log(Date.now().toLocaleString())

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div ref={ref} className={`message ${message.senderId === user.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={
            message.senderId === user.uid ? user.photoURL : data.curUser.photoURL
          }
          alt="chatImage"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
       {message.img &&  <img
          src={message.img}
          alt="chatImage"
        />}
      </div>
    </div>
  );
};

export default Message;
