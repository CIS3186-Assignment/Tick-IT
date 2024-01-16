import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUAqitwzHfFBZl_s_F1I2eGKKRoXEbIIY",
  authDomain: "tick-it-6452c.firebaseapp.com",
  projectId: "tick-it-6452c",
  storageBucket: "tick-it-6452c.appspot.com",
  messagingSenderId: "192522835612",
  appId: "1:192522835612:web:01ced68c932d579e173f59",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE = getFirestore(FIREBASE_APP);
export const STORAGE = getStorage();
export const imagesRef = ref(STORAGE, "images");

export const AuthProviderGoogle = new GoogleAuthProvider(FIREBASE_APP);
