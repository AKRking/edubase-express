import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  payment_method: string;
  subtotal: number;
  delivery_charge: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  item_code: string;
  subject: string;
  board: string;
  level: string;
  type: string;
  year_range: string;
  component: string;
  price: number;
  created_at: string;
}

// Order creation function
export async function createOrder(orderData: {
  orderNumber: string;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  items: Array<{
    code: string;
    subject: string;
    board: string;
    level: string;
    type: string;
    yearRange: string;
    component: string;
    price: number;
  }>;
}) {
  try {
    // Create the order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderData.orderNumber,
        customer_name: orderData.customerInfo.fullName,
        customer_email: orderData.customerInfo.email,
        customer_phone: orderData.customerInfo.phone,
        customer_address: orderData.customerInfo.address,
        customer_city: orderData.customerInfo.city,
        payment_method: orderData.paymentMethod,
        subtotal: orderData.subtotal,
        delivery_charge: orderData.deliveryCharge,
        total_amount: orderData.totalAmount,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      item_code: item.code,
      subject: item.subject,
      board: item.board,
      level: item.level,
      type: item.type,
      year_range: item.yearRange,
      component: item.component,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw itemsError;
    }

    return { success: true, order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error };
  }
}

// Function to get order by order number
export async function getOrderByNumber(orderNumber: string) {
  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (orderError) {
      throw orderError;
    }

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);

    if (itemsError) {
      throw itemsError;
    }

    return { success: true, order, items };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error };
  }
}