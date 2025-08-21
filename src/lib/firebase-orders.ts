import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Order {
  id?: string;
  email: string;
  name: string;
  whatsapp: string;
  transactionId: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date | Timestamp;
  amount: number;
}

const ORDERS_COLLECTION = 'orders';

// Create a new order
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
  try {
    const newOrder = {
      ...orderData,
      status: 'pending' as const,
      createdAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), newOrder);
    
    return {
      id: docRef.id,
      ...newOrder,
      createdAt: newOrder.createdAt.toDate(),
    };
  } catch (error: any) {
    console.error('Error creating order:', error);
    
    // If it's a network/permission error, create a temporary order
    if (error.code === 'unavailable' || error.code === 'permission-denied' || error.message?.includes('NOT_FOUND')) {
      console.log('Firestore unavailable, creating temporary order');
      const tempOrder: Order = {
        id: `temp-${Date.now()}`,
        ...orderData,
        status: 'pending',
        createdAt: new Date(),
      };
      
      // Store in localStorage as backup
      if (typeof window !== 'undefined') {
        try {
          const existingOrders = JSON.parse(localStorage.getItem('temp_orders') || '[]');
          existingOrders.push(tempOrder);
          localStorage.setItem('temp_orders', JSON.stringify(existingOrders));
        } catch (localError) {
          console.error('Failed to store temporary order:', localError);
        }
      }
      
      return tempOrder;
    }
    
    throw new Error('Failed to create order');
  }
};

// Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Order[];
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    
    // If Firestore is unavailable, return temporary orders from localStorage
    if (error.code === 'unavailable' || error.code === 'permission-denied' || error.message?.includes('NOT_FOUND')) {
      console.log('Firestore unavailable, returning temporary orders');
      if (typeof window !== 'undefined') {
        try {
          const tempOrders = JSON.parse(localStorage.getItem('temp_orders') || '[]');
          return tempOrders.sort((a: Order, b: Order) => {
            const dateA = typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt instanceof Date ? a.createdAt : a.createdAt.toDate();
            const dateB = typeof b.createdAt === 'string' ? new Date(b.createdAt) : b.createdAt instanceof Date ? b.createdAt : b.createdAt.toDate();
            return dateB.getTime() - dateA.getTime();
          });
        } catch (localError) {
          console.error('Failed to read temporary orders:', localError);
        }
      }
      return [];
    }
    
    throw new Error('Failed to fetch orders');
  }
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      } as Order;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch order');
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order | null> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, { status });
    
    // Return updated order
    return await getOrderById(orderId);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
};

// Delete order
export const deleteOrder = async (orderId: string): Promise<boolean> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Failed to delete order');
  }
};
