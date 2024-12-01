// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAn2ICg2uSzp65A6xBlSiVNd_xrnS5Rd5E",
  authDomain: "crashwatch-19e18.firebaseapp.com",
  projectId: "crashwatch-19e18",
  storageBucket: "crashwatch-19e18.firebasestorage.app",
  messagingSenderId: "434052149483",
  appId: "1:434052149483:web:4de49e9e4027cf51a7ceae",
  measurementId: "G-SLZTTSP1NG"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage}