import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { UserAuth } from "../Context/UserContext";
const Search = () => {
  const { user } = UserAuth();
  const [userName, setUserName] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  // const [friends, setFriends] = useState([]);

  const [err, setErr] = useState(false);

  const SearchUser = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchUser(doc.data());
      });
    } catch (error) {
      setErr(true);
      console.log(error)
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && SearchUser();
  };

  const handleSelect = async () => {
    // check wether chats in firestore exists ,  if not create
    const combinedId =
      user.uid > searchUser.uid
        ? user.uid + searchUser.uid
        : searchUser.uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { message: [] });
        // create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: searchUser.uid,
            displayName: searchUser.displayName,
            photoURL: searchUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", searchUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setSearchUser(null)
    setUserName('')
  };

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder="Search ..."
        />
      </div>
      {err && <p>user not found</p>}
      {searchUser && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={searchUser.photoURL} alt="person" />
          <div className="user-chatInfo">
            <span>{searchUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
