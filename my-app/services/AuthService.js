// services/AuthService.js
import firebase from '../credentials';
import 'firebase/auth';

export const signUp = async (email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    throw error;
  }
};
