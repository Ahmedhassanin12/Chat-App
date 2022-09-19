// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'
import {getStorage } from 'firebase/storage'
import { getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoT-go3heQckUgpG2gJPBH73z9l9Ekdgg",
  authDomain: "chat-app-d2d51.firebaseapp.com",
  projectId: "chat-app-d2d51",
  storageBucket: "chat-app-d2d51.appspot.com",
  messagingSenderId: "247251747116",
  appId: "1:247251747116:web:f3b85b467f6f76077bec89",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage()
export const db = getFirestore(app);
 