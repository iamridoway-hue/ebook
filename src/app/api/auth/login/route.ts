import { NextRequest, NextResponse } from 'next/server';
import { signInAdmin } from '@/lib/firebase-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, email, password } = body;

    // Use either id or email field (for backward compatibility)
    const userEmail = email || id;

    // Validate required fields
    if (!userEmail || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sign in with Firebase Auth
    const user = await signInAdmin(userEmail, password);

    // Generate a simple session token (in production, use proper JWT)
    const sessionToken = btoa(`${user.uid}:${Date.now()}`);
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

    return NextResponse.json({ 
      message: 'Login successful',
      sessionToken,
      expiresAt,
      user: {
        uid: user.uid,
        email: user.email,
      }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
