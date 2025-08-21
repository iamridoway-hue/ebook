// Authentication utilities for admin panel
export interface AdminCredentials {
  id: string;
  password: string;
}

// In a real application, these would be stored securely in environment variables
// and passwords would be hashed
const ADMIN_CREDENTIALS = {
  id: 'admin',
  password: 'ridoy@2482' // Updated admin password
};

export const validateAdminCredentials = (credentials: AdminCredentials): boolean => {
  return credentials.id === ADMIN_CREDENTIALS.id && 
         credentials.password === ADMIN_CREDENTIALS.password;
};

// Simple session management (in production, use proper JWT or session management)
export const createAdminSession = (): string => {
  const sessionToken = btoa(`${Date.now()}-${Math.random()}`);
  // In production, store this in a secure way (database, Redis, etc.)
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminSession', sessionToken);
    localStorage.setItem('adminSessionExpiry', (Date.now() + 24 * 60 * 60 * 1000).toString()); // 24 hours
  }
  return sessionToken;
};

export const validateAdminSession = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const session = localStorage.getItem('adminSession');
  const expiry = localStorage.getItem('adminSessionExpiry');
  
  if (!session || !expiry) return false;
  
  const expiryTime = parseInt(expiry);
  if (Date.now() > expiryTime) {
    // Session expired, clear it
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminSessionExpiry');
    return false;
  }
  
  return true;
};

export const clearAdminSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminSessionExpiry');
  }
};

export const getAdminSession = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminSession');
};
