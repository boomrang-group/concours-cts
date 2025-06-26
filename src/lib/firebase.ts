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
  if (typeof window !== 'undefined' && !app) { // Only initialize on client and if not already initialized
    if (getApps().length > 0) {
      app = getApp();
    } else {
      // Check if config keys are present
      if (firebaseConfig.apiKey && firebaseConfig.projectId) {
        try {
          app = initializeApp(firebaseConfig);
        } catch (e) {
          console.error("Firebase initialization error:", e);
          // In case of error, ensure services remain null
          return { app: null, auth: null, firestore: null };
        }
      } else {
        console.warn("Firebase configuration is missing or incomplete. Please check your .env.local file. Features depending on Firebase will not work.");
        // Config is invalid, return null services
        return { app: null, auth: null, firestore: null };
      }
    }
    
    // If app was successfully initialized, get the other services
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

// A utility function to check if firebase is ready from the outside
export function isFirebaseConfigured() {
    return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
}
