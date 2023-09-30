// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEg7cJCI12q5aTbhvA-z4Tq2M8TlkskfQ",
  authDomain: "email-validation-practice.firebaseapp.com",
  projectId: "email-validation-practice",
  storageBucket: "email-validation-practice.appspot.com",
  messagingSenderId: "27764972318",
  appId: "1:27764972318:web:891d95ab96c7b457bc070f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;