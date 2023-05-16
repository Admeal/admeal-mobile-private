// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB92cfOPTeF54H6tjPS6cSwOnZoUUNF5V8",
  authDomain: "admeal-firebase.firebaseapp.com",
  databaseURL: "https://admeal-firebase-default-rtdb.firebaseio.com/",
  projectId: "admeal-firebase",
  storageBucket: "admeal-firebase.appspot.com",
  messagingSenderId: "830854626619",
  appId: "1:830854626619:web:d409be208850837d7f0b1e",
  measurementId: "G-567Y22BFQY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage, auth };
