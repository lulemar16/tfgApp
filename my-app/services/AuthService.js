import appFirebase from '../firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Alert } from 'react-native';

const auth = getAuth();
const db = getFirestore();

export const signUp = async (email, password) => {

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('Account created')
    const user = userCredential.user;
    console.log('User:', user)
  })
  .catch(error => {
    console.group(error)
    Alert.alert(error.message)
  });
};

export const logIn = async (email, password) => {

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('Logged in')
    const user = userCredential.user;
    console.log('User:', user)
  })
  .catch(error => {
    console.group(error)
    Alert.alert(error.message)
  });
};

export const logOut = () => {
  // Implement your logout logic here
  // For example, you can use Firebase Auth signOut method if you are using Firebase Auth
  auth().signOut()
  console.log('User logged out successfully');
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export { auth };
