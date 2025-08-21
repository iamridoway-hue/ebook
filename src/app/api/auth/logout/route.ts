import { NextRequest, NextResponse } from 'next/server';
import { signOutAdmin } from '@/lib/firebase-auth';

export async function POST(request: NextRequest) {
  try {
    // Sign out from Firebase Auth
    await signOutAdmin();
    
    return NextResponse.json({ 
      message: 'Logout successful' 
    });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: error.message || 'Logout failed' },
      { status: 500 }
    );
  }
}
