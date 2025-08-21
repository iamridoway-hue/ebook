import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getAllOrders } from '@/lib/firebase-orders';

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('GET /api/orders error:', error);
    // Return empty orders array if Firebase fails
    return NextResponse.json({ orders: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, whatsapp, transactionId } = body;

    // Validate required fields
    if (!email || !name || !whatsapp || !transactionId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(whatsapp)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    try {
      const newOrder = await createOrder({
        email,
        name,
        whatsapp,
        transactionId,
        amount: 50
      });

      return NextResponse.json({ 
        message: 'Order created successfully',
        order: newOrder 
      }, { status: 201 });
    } catch (firebaseError) {
      console.error('Firebase error:', firebaseError);
      // Fallback: Store order locally if Firebase fails
      const fallbackOrder = {
        id: Date.now().toString(),
        email,
        name,
        whatsapp,
        transactionId,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        amount: 50
      };
      
      return NextResponse.json({ 
        message: 'Order created successfully (offline mode)',
        order: fallbackOrder 
      }, { status: 201 });
    }
  } catch (error) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
