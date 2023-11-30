//credentials.js
// Import the functions you need from the SDKs you need
import { firebase, initializeApp}  from "firebase/app";
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2X0zRBw5oop4YxXoViVhl8IoDkEZ4X6g",
  authDomain: "appnotes-b6c6f.firebaseapp.com",
  projectId: "appnotes-b6c6f",
  storageBucket: "appnotes-b6c6f.appspot.com",
  messagingSenderId: "534498666404",
  appId: "1:534498666404:web:7aa230eaa93eb622f84331",
  measurementId: "G-6PJ6685HLK"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
