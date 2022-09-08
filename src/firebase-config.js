import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBqN1wmSMaOFaZ-oV4fh7GUHIykT47NQcM",
  authDomain: "frb2-ec215.firebaseapp.com",
  projectId: "frb2-ec215",
  storageBucket: "frb2-ec215.appspot.com",
  messagingSenderId: "1070261239037",
  appId: "1:1070261239037:web:7f45a333b614d464339294",
  measurementId: "G-Q5W7NTXQH8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth();
