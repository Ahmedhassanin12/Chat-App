import React, { useState, useContext, useEffect } from "react";
import { images } from "../img/index";
import { UserAuth } from "../Context/UserContext";
import { ChatContext } from "../Context/ChatContext";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import {BiSend} from 'react-icons/bi'

import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  
  const { user } = UserAuth();
  const { data } = useContext(ChatContext);
  //get size of the screen 
  const [isDesktop, setDesktop] = useState(window.innerWidth > 550);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 550);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // handel send messages
  const handelSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              message: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.curUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        {isDesktop ? <img src={images.add} alt="add" /> : null }
        
        <input
          id="file"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={images.img} alt="img" />
        </label>
        {isDesktop ? <button onClick={handelSend}>Send</button>: <BiSend />}
         
        
      </div>
    </div>
  );
};

export default Input;
