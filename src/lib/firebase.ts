'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// This function initializes and returns the Firebase app instance.
function initializeFirebase() {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    // Check if the configuration is valid before initializing
    const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId;
    if (isConfigValid) {
      try {
        app = initializeApp(firebaseConfig);
      } catch (e) {
        console.error("Firebase initialization error", e);
        app = null;
      }
    } else {
      // This warning will appear in the browser console if .env.local is not set up
      console.warn("Firebase configuration is missing or incomplete. Authentication will not work.");
      app = null;
    }
  }

  if (app && !auth) {
    auth = getAuth(app);
  }
}

// Call initialization logic on module load.
initializeFirebase();

export function getFirebaseAuth() {
  // If initialization failed, this will be null.
  return auth;
}

export function isFirebaseInitialized() {
    // This now simply checks if the auth object was successfully created.
    return auth !== null;
}
