// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-mern-89e38.firebaseapp.com",
  projectId: "blog-mern-89e38",
  storageBucket: "blog-mern-89e38.appspot.com",
  messagingSenderId: "791808415748",
  appId: "1:791808415748:web:7f88cf4d4920ab8aa4fd51"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

