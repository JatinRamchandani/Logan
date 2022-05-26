// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyANpgKH4Ie95fQRUOAu3gJGhNzOq68LlcE",
    authDomain: "logan-a98f1.firebaseapp.com",
    projectId: "logan-a98f1",
    storageBucket: "logan-a98f1.appspot.com",
    messagingSenderId: "767553094506",
    appId: "1:767553094506:web:fd61e66c0af40fc9681b13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export {auth}
export {db}
export {storage}