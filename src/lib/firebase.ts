import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOrUf7aMOEt1s0sgFQzGVf3Y8MxS0e0bA",
  authDomain: "boilagbe-6b2de.firebaseapp.com",
  projectId: "boilagbe-6b2de",
  storageBucket: "boilagbe-6b2de.firebasestorage.app",
  messagingSenderId: "738274799764",
  appId: "1:738274799764:web:6a44b0cd1db19cf328c481",
  measurementId: "G-LQRY8XNM85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Handle Firestore connection issues
export const handleFirestoreConnection = async () => {
  try {
    // Try to enable network connection
    await enableNetwork(db);
    console.log('Firestore connected successfully');
  } catch (error) {
    console.error('Firestore connection error:', error);
    // Disable network to prevent constant retries
    try {
      await disableNetwork(db);
      console.log('Firestore offline mode enabled');
    } catch (disableError) {
      console.error('Failed to disable Firestore network:', disableError);
    }
  }
};

// Initialize connection handling
if (typeof window !== 'undefined') {
  handleFirestoreConnection();
}

export default app;
