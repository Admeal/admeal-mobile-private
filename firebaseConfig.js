// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';
import { getStorage } from '@react-native-firebase/storage';
// import { getAuth } from '@react-native-firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB92cfOPTeF54H6tjPS6cSwOnZoUUNF5V8",
  authDomain: "admeal-firebase.firebaseapp.com",
  databaseURL: "https://admeal-firebase-default-rtdb.firebaseio.com",
  projectId: "admeal-firebase",
  storageBucket: "admeal-firebase.appspot.com",
  messagingSenderId: "830854626619",
  appId: "1:830854626619:web:d409be208850837d7f0b1e",
  measurementId: "G-567Y22BFQY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// const auth = getAuth();

const db = getFirestore(app);
const storage = getStorage(app);
// const realtimeDB = getDatabase();

export { app, db, storage };
