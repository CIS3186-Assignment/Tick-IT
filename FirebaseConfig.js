// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUAqitwzHfFBZl_s_F1I2eGKKRoXEbIIY",
  authDomain: "tick-it-6452c.firebaseapp.com",
  projectId: "tick-it-6452c",
  storageBucket: "tick-it-6452c.appspot.com",
  messagingSenderId: "192522835612",
  appId: "1:192522835612:web:01ced68c932d579e173f59"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE = getFirestore(FIREBASE_APP);

export const AuthProviderGoogle = new GoogleAuthProvider(FIREBASE_APP)