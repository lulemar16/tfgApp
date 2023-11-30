// services/AuthService.js
import appFirebase from '../credentials';
import { initializeAuth, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


export const signUp = async (email, password) => {
  try {
    const auth = initializeAuth(appFirebase, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await appFirebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await appFirebase.auth().signOut();
  } catch (error) {
    throw error;
  }
};
