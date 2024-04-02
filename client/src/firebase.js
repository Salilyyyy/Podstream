// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyARoL1HnWzDMF_rSivY5CWJNZLpp6ifSic',
  authDomain: 'lalsasia.firebaseapp.com',
  projectId: 'lalsasia',
  storageBucket: 'lalsasia.appspot.com',
  messagingSenderId: '228627684040',
  appId: '1:228627684040:web:0afe321804f99108d323fd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;