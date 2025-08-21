// Order management utilities
export interface Order {
  id: string;
  email: string;
  name: string;
  whatsapp: string;
  transactionId: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  amount: number;
}

// In a real app, this would be connected to a database
const orders: Order[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'জন ডো',
    whatsapp: '01712345678',
    transactionId: 'BKS123456789',
    status: 'pending',
    createdAt: '2025-01-22T10:30:00Z',
    amount: 50
  },
  {
    id: '2',
    email: 'sarah@example.com',
    name: 'সারা আহমেদ',
    whatsapp: '01798765432',
    transactionId: 'NGD987654321',
    status: 'completed',
    createdAt: '2025-01-22T09:15:00Z',
    amount: 50
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'মাইক রহমান',
    whatsapp: '01856789012',
    transactionId: 'RKT456789123',
    status: 'cancelled',
    createdAt: '2025-01-22T08:45:00Z',
    amount: 50
  }
];

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
  const newOrder: Order = {
    ...orderData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  
  orders.push(newOrder);
  return newOrder;
};

export const getAllOrders = () => {
  return [...orders];
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    return orders[orderIndex];
  }
  return null;
};

export const getOrderById = (orderId: string) => {
  return orders.find(order => order.id === orderId) || null;
};

export const deleteOrder = (orderId: string) => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
    return true;
  }
  return false;
};
