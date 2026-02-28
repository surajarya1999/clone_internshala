
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuzzV27BaZ39WkRaTAO3D-a4nT8DXSg14",
  authDomain: "internshala-cca7c.firebaseapp.com",
  projectId: "internshala-cca7c",
  storageBucket: "internshala-cca7c.firebasestorage.app",
  messagingSenderId: "823446742267",
  appId: "1:823446742267:web:f130d8063e756909bafc5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};