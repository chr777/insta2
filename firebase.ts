// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "insta2-c8ffe.firebaseapp.com",
  projectId: "insta2-c8ffe",
  storageBucket: "insta2-c8ffe.appspot.com",
  messagingSenderId:process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };