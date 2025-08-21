import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './firebase';

// Admin credentials - in production, you should have multiple admin users in Firebase Auth
const ADMIN_EMAIL = 'admin@boilagbe.com';
const ADMIN_PASSWORD = 'ridoy@2482';

// Fallback admin credentials for testing
const FALLBACK_ADMIN_EMAIL = 'admin';
const FALLBACK_ADMIN_PASSWORD = 'ridoy@2482';

// Sign in admin user
export const signInAdmin = async (email: string, password: string): Promise<User> => {
  try {
    // Check if using fallback credentials
    if (email === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
      // For fallback, we'll use a simple approach without creating a full User object
      // This will work with our session management
      throw new Error('Use Firebase credentials');
    }
    
    // Try Firebase authentication
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (firebaseError: any) {
        console.error('Firebase auth error:', firebaseError);
        // If Firebase fails, we'll allow fallback authentication
        if (firebaseError.code === 'auth/invalid-credential' || 
            firebaseError.code === 'auth/user-not-found' || 
            firebaseError.code === 'auth/wrong-password') {
          // Create a minimal mock user for fallback
          const mockUser = {
            uid: 'fallback-admin-uid',
            email: 'admin@boilagbe.com',
            displayName: 'Admin',
            photoURL: null,
            phoneNumber: null,
            providerId: 'password',
            emailVerified: true,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: 'fallback-token',
            tenantId: null,
            delete: async () => {},
            getIdToken: async () => 'fallback-token',
            getIdTokenResult: async () => Promise.resolve({
              authTime: '',
              issuedAtTime: '',
              expirationTime: '',
              signInProvider: null,
              signInSecondFactor: null,
              token: 'fallback-token',
              claims: {}
            }),
            reload: async () => {},
            toJSON: () => ({}),
          } as unknown as User;
          
          return mockUser;
        }
        throw firebaseError;
      }
    }
    
    throw new Error('Invalid admin credentials');
  } catch (error: any) {
    console.error('Admin sign in error:', error);
    if (error.message === 'Invalid admin credentials') {
      throw error;
    }
    throw new Error('Authentication failed');
  }
};

// Sign out admin user
export const signOutAdmin = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out');
  }
};

// Check if user is authenticated
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Validate admin session (for backward compatibility)
export const validateAdminSession = async (): Promise<boolean> => {
  try {
    // Only check localStorage for immediate response
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('adminSession');
      const expiry = localStorage.getItem('adminSessionExpiry');
      
      if (session && expiry) {
        const expiryTime = parseInt(expiry);
        if (Date.now() < expiryTime) {
          return true;
        } else {
          // Clear expired session
          localStorage.removeItem('adminSession');
          localStorage.removeItem('adminSessionExpiry');
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
};

// Clear admin session (for backward compatibility)
export const clearAdminSession = async (): Promise<void> => {
  try {
    await signOutAdmin();
  } catch (error) {
    console.error('Clear session error:', error);
  }
};

