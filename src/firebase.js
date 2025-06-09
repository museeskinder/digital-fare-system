// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrx9hWjJQ2ghwzorUfFMBslX9lGDaspW4",
  authDomain: "fare-payment-system-4e820.firebaseapp.com",
  projectId: "fare-payment-system-4e820",
  storageBucket: "fare-payment-system-4e820.firebasestorage.app",
  messagingSenderId: "990477867517",
  appId: "1:990477867517:web:25325c7a70c401d1f66194",
  measurementId: "G-VWFY87KCCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 