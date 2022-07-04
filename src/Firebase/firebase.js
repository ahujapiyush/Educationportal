import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjutNWygX-qFYK_3e-RdeCO_1ipS0spTc",
  authDomain: "socialmedia-61aa1.firebaseapp.com",
  projectId: "socialmedia-61aa1",
  storageBucket: "socialmedia-61aa1.appspot.com",
  messagingSenderId: "927147865021",
  appId: "1:927147865021:web:af5c3bd48949837f6d98d4",
  measurementId: "G-93VZBK6KPE",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
const db = firebase.firestore();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, projectStorage, projectFirestore, timestamp };
