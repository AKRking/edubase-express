import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { sendAdminOrderNotification, sendCustomerOrderConfirmation, OrderEmailData } from './email';

const app = new Hono();

// Enable CORS for frontend requests
app.use('/*', cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/', (c) => {
  return c.json({ message: 'EduMaterials API Server is running!' });
});

// Send admin notification email
app.post('/api/send-admin-email', async (c) => {
  try {
    const orderData: OrderEmailData = await c.req.json();
    
    console.log('📧 Sending admin notification for order:', orderData.orderNumber);
    
    const result = await sendAdminOrderNotification(orderData);
    
    console.log('✅ Admin notification sent successfully');
    return c.json({ success: true, result });
  } catch (error: any) {
    console.error('❌ Failed to send admin notification:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to send admin notification' 
    }, 500);
  }
});

// Send customer confirmation email
app.post('/api/send-customer-email', async (c) => {
  try {
    const orderData: OrderEmailData = await c.req.json();
    
    console.log('📧 Sending customer confirmation to:', orderData.customerEmail);
    
    const result = await sendCustomerOrderConfirmation(orderData);
    
    console.log('✅ Customer confirmation sent successfully');
    return c.json({ success: true, result });
  } catch (error: any) {
    console.error('❌ Failed to send customer confirmation:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to send customer confirmation' 
    }, 500);
  }
});

// Send both emails in one request
app.post('/api/send-order-emails', async (c) => {
  try {
    const orderData: OrderEmailData = await c.req.json();
    
    console.log('📧 Sending order emails for:', orderData.orderNumber);
    
    // Send both emails concurrently
    const [adminResult, customerResult] = await Promise.allSettled([
      sendAdminOrderNotification(orderData),
      sendCustomerOrderConfirmation(orderData)
    ]);
    
    const results = {
      admin: adminResult.status === 'fulfilled' ? 
        { success: true, data: adminResult.value } : 
        { success: false, error: adminResult.reason },
      customer: customerResult.status === 'fulfilled' ? 
        { success: true, data: customerResult.value } : 
        { success: false, error: customerResult.reason }
    };
    
    console.log('📊 Email results:', results);
    
    return c.json({ 
      success: true, 
      results,
      message: 'Email sending completed'
    });
  } catch (error: any) {
    console.error('❌ Failed to send order emails:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to send order emails' 
    }, 500);
  }
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Hono API server running at http://localhost:${port}`);