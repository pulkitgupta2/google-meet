import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn3phY0O2ELHSm8yKX1NR0CazYe0FMT5s",
  authDomain: "meet-cln.firebaseapp.com",
  projectId: "meet-cln",
  storageBucket: "meet-cln.appspot.com",
  messagingSenderId: "33033612862",
  appId: "1:33033612862:web:6b3b9365aab6d6bdaaeb6f",
  measurementId: "G-Q484S74SV8",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
