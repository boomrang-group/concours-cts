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

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
const isFirebaseInitialized = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

if (isFirebaseInitialized) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  // This warning will be visible in the developer console.
  console.warn(
    "Firebase configuration is missing or incomplete. Authentication will not work. Please create a `.env.local` file in your project's root and add your Firebase project credentials. You can use the `.env` file as a template."
  );
}

export { app, auth, isFirebaseInitialized };
