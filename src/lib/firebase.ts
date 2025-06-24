'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Singleton pattern to ensure Firebase is initialized only once
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

function initializeFirebaseServices() {
  if (!app) { // Only initialize if the app hasn't been initialized
    if (getApps().length > 0) {
      app = getApp();
    } else {
      const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId;
      if (isConfigValid) {
        try {
          app = initializeApp(firebaseConfig);
        } catch (e) {
          console.error("Firebase initialization error:", e);
          // Return null services if initialization fails
          return { app: null, auth: null, firestore: null };
        }
      } else {
        console.warn("Firebase configuration is missing or incomplete. Features depending on Firebase will not work.");
        return { app: null, auth: null, firestore: null };
      }
    }
    
    // Initialize services after app is confirmed to exist
    auth = getAuth(app);
    firestore = getFirestore(app);
  }

  return { app, auth, firestore };
}

// Export a single function to get all firebase services
export function getFirebaseServices() {
    // This will either return existing instances or initialize them
    return initializeFirebaseServices();
}

// A utility function to check if firebase is ready
export function isFirebaseConfigured() {
    const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId;
    return isConfigValid;
}
