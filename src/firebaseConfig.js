// Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore Database

// Firebase configuration (your provided config)
const firebaseConfig = {  
  apiKey: "AIzaSyCru1Ju9V2mng0vAtBH4bGwKtmIak2oFsg",
  authDomain: "wings-139b7.firebaseapp.com",
  projectId: "wings-139b7",
  storageBucket: "wings-139b7.firebasestorage.app",
  messagingSenderId: "291775887416",
  appId: "1:291775887416:web:0b27989344bd4660494ecd",
  measurementId: "G-5F6JPSH3RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firestore Database

export { auth, db }; 
