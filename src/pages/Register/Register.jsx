import React, { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { auth, storage, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

import "./Register.scss";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      

      await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              setLoading(false);
              navigate("/");
            } catch (err) {
              console.log(err);
              setError(true);
              
            }
          });
        }

      );
      setLoading(true);
      
    } catch (error) {
      setError(true);
      setLoading(false);
    } 
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">AHMED CHAT</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file" className="add">
            <FcAddImage className="add-icon" /> add your avatar
          </label>
          <button disabled={loading}>Sing Up</button>
          {loading && <p style={{color: "violet", }}>Uploading and compressing the image please wait...</p>}
          {error && <span>Something went wrong</span>}
        </form>
        
        <p>You do have account ? <Link to="/login">Login</Link> </p>
      </div>
    </div>
  );
};

export default Register;
