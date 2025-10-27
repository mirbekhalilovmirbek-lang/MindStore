// src/firebase.js
// Firebase configuration using environment variables
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Use environment variables for Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if we have a valid API key
let app = null;
let auth = null;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined") {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase Authentication and get a reference to the service
    auth = getAuth(app);
  } catch (error) {
    console.warn("Firebase initialization error:", error);
    // Fallback to null values
    app = null;
    auth = null;
  }
} else {
  console.warn("Firebase API key not found. Firebase features will be disabled.");
  app = null;
  auth = null;
}

export { auth };
export default app;