// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiUaW6NH9jaTwtdEWV6RucxwaSSouuaKo",
  authDomain: "mystore-b3319.firebaseapp.com",
  databaseURL: "https://mystore-b3319-default-rtdb.firebaseio.com",
  projectId: "mystore-b3319",
  storageBucket: "mystore-b3319.appspot.com",
  messagingSenderId: "771558605271",
  appId: "1:771558605271:web:ac63889b8d093c29f8cb92",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const db = firebase.firestore();
const storage = firebase.storage();
//const storage = firebase.getStorage();

const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};

export { auth, firestore, db, firebase, onAuthStateChanged, storage };
