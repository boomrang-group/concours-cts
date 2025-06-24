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

function initializeFirebase() {
    const isConfigValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;
    if (isConfigValid && !app) { // check !app to run only once
        try {
            app = getApps().length ? getApp() : initializeApp(firebaseConfig);
            auth = getAuth(app);
        } catch(e) {
            console.error("Firebase initialization error", e);
            app = null;
            auth = null;
        }
    } else if (!isConfigValid) {
        console.warn("Firebase configuration is missing or incomplete. Authentication will not work. Please add your Firebase project credentials to a `.env.local` file.");
    }
}

export function getFirebaseAuth() {
    if (!auth) {
        initializeFirebase();
    }
    return auth;
}

export function isFirebaseInitialized() {
    if (!app) {
        initializeFirebase();
    }
    return app !== null;
}
