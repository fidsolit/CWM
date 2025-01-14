// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkVLG9N9zSuX1Jxoyx2ofbyP7v7XAHFB8",
  authDomain: "cwmwebapp.firebaseapp.com",
  projectId: "cwmwebapp",
  storageBucket: "cwmwebapp.firebasestorage.app",
  messagingSenderId: "697331352079",
  appId: "1:697331352079:web:b92bf4e17347ed996f597a",
  measurementId: "G-130VBM532S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
