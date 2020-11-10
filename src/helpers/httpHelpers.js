import firebase from "firebase";

import { validateForm } from ".";
/**
 * Networks helpers functions;
 * @memberof Helpers
 * @namespace Helpers.httpHelpers
 */

/**
 * Get json data via fetch;
 * @param {Object} urlData `{ baseUrl, param, query }`
 * @param {RequestInit} postBody request body
 *
 * @memberof Helpers.httpHelpers
 */
export async function getData(urlData, postBody) {
  const input = getUrl(urlData);

  let response = !postBody
    ? await fetch(input)
    : await fetch(input, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(postBody),
      });
  let data = await response.json();
  return data;
}

export function getUrl(urlData) {
  const { baseUrl, param, query } = urlData;
  let url = baseUrl;
  if (param) {
    url += `${param}/`;
  }
  if (query) {
    url += "?" + new URLSearchParams(query).toString();
  }
  return url;
}

const firebaseConfig = {
  apiKey: "AIzaSyDBkOq6daLKKiGA6QTrCscb0JupbVXD5wE",
  authDomain: "star-wars-api-70c4e.firebaseapp.com",
  databaseURL: "https://star-wars-api-70c4e.firebaseio.com",
  projectId: "star-wars-api-70c4e",
  storageBucket: "star-wars-api-70c4e.appspot.com",
  messagingSenderId: "864744893293",
  appId: "1:864744893293:web:bd13512c77c47dd9d14864",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export async function createUserWithFirebase(email, password) {
  try {
    if (validateForm(email, password)) {
      return await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);
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
      return await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password);
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
    return await firebase.auth().signInWithPopup(provider);
  } catch (ex) {
    console.log(ex);
  }
}

export async function signOutFirebase() {
  await firebase.auth().signOut();
}
