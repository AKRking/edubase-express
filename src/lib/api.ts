// API client for communicating with Hono backend
export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  paymentMethod: string;
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  items: Array<{
    item_code: string;
    subject: string;
    board: string;
    level: string;
    type: string;
    year_range: string;
    component: string;
    price: number;
  }>;
}

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:4000' : '';

// Send admin notification email via Hono API
export async function sendAdminOrderNotification(orderData: OrderEmailData) {
  try {
    console.log('📧 Calling API to send admin notification...');
    
    const response = await fetch(`${API_BASE_URL}/api/send-admin-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send admin notification');
    }

    console.log('✅ Admin notification API call successful');
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Admin notification API call failed:', error);
    return { success: false, error };
  }
}

// Send customer confirmation email via Hono API
export async function sendCustomerOrderConfirmation(orderData: OrderEmailData) {
  try {
    console.log('📧 Calling API to send customer confirmation...');
    
    const response = await fetch(`${API_BASE_URL}/api/send-customer-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send customer confirmation');
    }

    console.log('✅ Customer confirmation API call successful');
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Customer confirmation API call failed:', error);
    return { success: false, error };
  }
}

// Send both emails in one API call
export async function sendOrderEmails(orderData: OrderEmailData) {
  try {
    console.log('📧 Calling API to send both order emails...');
    
    const response = await fetch(`${API_BASE_URL}/api/send-order-emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send order emails');
    }

    console.log('✅ Order emails API call successful');
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Order emails API call failed:', error);
    return { success: false, error };
  }
}