// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyC297_ObIKEAJvaAAr9tdl2PJCe8MFgkEU",
    authDomain: "swiggyrest.firebaseapp.com",
    projectId: "swiggyrest",
    storageBucket: "swiggyrest.appspot.com",
    messagingSenderId: "144976285988",
    appId: "1:144976285988:web:f9fbfbb75de4e66c4723b1",
    measurementId: "G-YD2926H1LX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore and export it
export default app;
