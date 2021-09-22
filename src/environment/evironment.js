// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { from "firebase";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyAnvwCH89lN1yCHIDEQRLcnLLbvyplFVOM",
    authDomain: "practica-galeria.firebaseapp.com",
    projectId: "practica-galeria",
    storageBucket: "practica-galeria.appspot.com",
    messagingSenderId: "353153239103",
    appId: "1:353153239103:web:d003cbadc1487b80e3908a",
    measurementId: "G-6DB7LRMWFE",
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
