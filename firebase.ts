// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaS8jl1AO-KcJyyfcy34wLta5w0eskjOg",
  authDomain: "insta2-c8ffe.firebaseapp.com",
  projectId: "insta2-c8ffe",
  storageBucket: "insta2-c8ffe.appspot.com",
  messagingSenderId: "707750461780",
  appId: "1:707750461780:web:698d7f8c402581d47e48c1"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };