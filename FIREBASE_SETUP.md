# Firebase Integration Setup Guide

## 🔥 Firebase Integration Complete

Your landing page has been successfully integrated with Firebase! Here's what has been implemented and what you need to do to complete the setup.

## ✅ What's Been Implemented

### 1. **Firebase Configuration**
- Created `src/lib/firebase.ts` - Firebase app initialization
- Configured Firestore database and Firebase Auth

### 2. **Order Management with Firestore**
- Created `src/lib/firebase-orders.ts` - Complete order CRUD operations
- Updated API routes to use Firestore instead of in-memory storage
- All orders now persist in Firebase Firestore database

### 3. **Authentication with Firebase Auth**
- Created `src/lib/firebase-auth.ts` - Firebase Authentication integration
- Updated login/logout API routes to use Firebase Auth
- Secure admin authentication system

### 4. **API Routes Updated**
- `/api/orders` - Now uses Firestore for order storage
- `/api/orders/[id]` - CRUD operations with Firestore
- `/api/auth/login` - Firebase Auth integration
- `/api/auth/logout` - Firebase Auth sign out

## 🚀 Next Steps - Firebase Project Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `boilagbe-landing-page`
4. Enable Google Analytics (optional)
5. Create project

### Step 2: Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your preferred location (asia-southeast1 for Bangladesh)

### Step 3: Enable Authentication
1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Create admin user:
   - Email: `admin@boilagbe.com`
   - Password: `your-secure-admin-password`

### Step 4: Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Register app name: `boilagbe-landing`
5. Copy the Firebase configuration object

### Step 5: Update Firebase Configuration
Replace the placeholder values in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Step 6: Update Admin Credentials
In `src/lib/firebase-auth.ts`, update:
```typescript
const ADMIN_EMAIL = 'admin@boilagbe.com';
const ADMIN_PASSWORD = 'your-secure-admin-password';
```

## 🔒 Security Rules for Firestore

Add these security rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection - only authenticated admin can read/write
    match /orders/{document} {
      allow read, write: if request.auth != null 
        && request.auth.token.email == 'admin@boilagbe.com';
    }
  }
}
```

## 📊 Database Structure

Your Firestore will have this structure:

```
orders/ (collection)
├── {orderId}/ (document)
│   ├── email: string
│   ├── name: string
│   ├── whatsapp: string
│   ├── transactionId: string
│   ├── status: 'pending' | 'completed' | 'cancelled'
│   ├── createdAt: timestamp
│   └── amount: number
```

## 🎯 Benefits of Firebase Integration

- **Persistent Data**: Orders are now saved permanently
- **Real-time Updates**: Admin panel updates in real-time
- **Secure Authentication**: Firebase Auth handles security
- **Scalable**: Can handle thousands of orders
- **Backup & Recovery**: Firebase handles data backup
- **Analytics**: Built-in Firebase Analytics

## 🧪 Testing the Integration

1. **Test Order Creation**: Submit an order on your landing page
2. **Check Firestore**: Verify order appears in Firebase Console
3. **Test Admin Login**: Use your admin credentials
4. **Test Order Management**: Update/delete orders from admin panel

## 🚨 Important Notes

- Replace ALL placeholder values with your actual Firebase config
- Create the admin user in Firebase Auth console
- Set up proper Firestore security rules
- Test thoroughly before deploying to production

Your Firebase integration is ready to go live once you complete the Firebase project setup!
