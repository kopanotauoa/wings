// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCru1Ju9V2mng0vAtBH4bGwKtmIak2oFsg",
  authDomain: "wings-139b7.firebaseapp.com",
  databaseURL: "https://wings-139b7-default-rtdb.firebaseio.com",
  projectId: "wings-139b7",
  storageBucket: "wings-139b7.appspot.com", // Fixed incorrect URL
  messagingSenderId: "291775887416",
  appId: "1:291775887416:web:0b27989344bd4660494ecd",
  measurementId: "G-5F6JPSH3RF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // For Authentication
const db = getFirestore(app); // For Firestore Database

// Export the services
export { auth, db };
