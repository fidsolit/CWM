// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJjtLKDocZqGlI1aazYaAzBp5UTRAtlCE",
  authDomain: "gisupport-a1f47.firebaseapp.com",
  projectId: "gisupport-a1f47",
  storageBucket: "gisupport-a1f47.appspot.com",
  messagingSenderId: "962831946899",
  appId: "1:962831946899:web:3caf50f3639c64454de966",
  measurementId: "G-YY0DENGPWK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
