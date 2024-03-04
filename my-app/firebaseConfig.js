import { initializeApp } from '@firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2X0zRBw5oop4YxXoViVhl8IoDkEZ4X6g",
  authDomain: "appnotes-b6c6f.firebaseapp.com",
  projectId: "appnotes-b6c6f",
  storageBucket: "appnotes-b6c6f.appspot.com",
  messagingSenderId: "534498666404",
  appId: "1:534498666404:web:7aa230eaa93eb622f84331",
  measurementId: "G-6PJ6685HLK"
};

const appFirebase = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export { db, auth };
