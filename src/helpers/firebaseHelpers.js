import dotenv from "dotenv";
import firebase from "firebase";

import { validateForm } from ".";

dotenv.config({ path: "../../" });

const getFirebaseConfig = () => ({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORE_BUCJET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

firebase.initializeApp(getFirebaseConfig());

export async function createUserWithFirebase(email, password) {
  try {
    if (validateForm(email, password)) {
      const auth = firebase.auth();
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      return await auth.createUserWithEmailAndPassword(email, password);
    } else {
      throw Error("incorrect form");
    }
  } catch (ex) {
    console.log(ex);
  }
}

export async function signInWithFormFirebase(email, password) {
  try {
    if (validateForm(email, password)) {
      const auth = firebase.auth();
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      return await auth.signInWithEmailAndPassword(email, password);
    } else {
      throw Error("incorrect form");
    }
  } catch (ex) {
    console.log(ex);
  }
}

export async function signInWithGoogleFirebase() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return await auth.signInWithPopup(provider);
  } catch (ex) {
    console.log(ex);
  }
}

export function observeFirebaseUser(userExistsCallback, userNotExistsCallback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (userExistsCallback && typeof userExistsCallback === "function")
        userExistsCallback(user);
    } else {
      if (userNotExistsCallback && typeof userNotExistsCallback === "function")
        userNotExistsCallback();
    }
  });
}

export async function signOutFirebase() {
  await firebase.auth().signOut();
}
