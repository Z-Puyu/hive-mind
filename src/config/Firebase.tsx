// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app"s Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt-ej_74NklEL1KAdVgbhDWhA3NDM8Q68",
  authDomain: "hivemind-10fa2.firebaseapp.com",
  projectId: "hivemind-10fa2",
  storageBucket: "hivemind-10fa2.appspot.com",
  messagingSenderId: "943134296673",
  appId: "1:943134296673:web:d333eebfe01beb33017820"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);