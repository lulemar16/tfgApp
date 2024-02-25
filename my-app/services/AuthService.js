// services/AuthService.js
import appFirebase from '../credentials';
import { initializeAuth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import auth from '@react-native-firebase/auth';

const auth = getAuth();

export const logIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};

export const signUp = async (username, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};

export const logOut = async () => {
  try {
    await appFirebase.auth().signOut();
  } catch (error) {
    throw error;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});