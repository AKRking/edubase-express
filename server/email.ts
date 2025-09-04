import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

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

export async function sendAdminOrderNotification(orderData: OrderEmailData) {
  const itemsList = orderData.items.map(item => 
    `• ${item.item_code} - ${item.subject} (${item.board} ${item.level}) - ৳${item.price}`
  ).join('\n');

  return await resend.emails.send({
    from: 'EduMaterials <onboarding@resend.dev>',
    to: ['djbox9@gmail.com'],
    subject: `🔔 New Order: ${orderData.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New Order Received!</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Order Details</h2>
          <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
          <p><strong>Total Amount:</strong> ৳${orderData.totalAmount}</p>
          <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Customer Information</h2>
          <p><strong>Name:</strong> ${orderData.customerName}</p>
          <p><strong>Email:</strong> ${orderData.customerEmail}</p>
          <p><strong>Phone:</strong> ${orderData.customerPhone}</p>
          <p><strong>Address:</strong> ${orderData.customerAddress}, ${orderData.customerCity}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Order Items</h2>
          <div style="font-family: monospace; white-space: pre-line; background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
${itemsList}
          </div>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1e293b; margin-top: 0;">Order Summary</h2>
          <p><strong>Subtotal:</strong> ৳${orderData.subtotal}</p>
          <p><strong>Delivery Charge:</strong> ${orderData.deliveryCharge === 0 ? 'Free' : `৳${orderData.deliveryCharge}`}</p>
          <p style="font-size: 18px; color: #3b82f6;"><strong>Total: ৳${orderData.totalAmount}</strong></p>
        </div>
      </div>
    `,
  });
}

export async function sendCustomerOrderConfirmation(orderData: OrderEmailData) {
  const itemsList = orderData.items.map(item => 
    `• ${item.item_code} - ${item.subject} (${item.board} ${item.level}) - ৳${item.price}`
  ).join('\n');

  return await resend.emails.send({
    from: 'EduMaterials <onboarding@resend.dev>',
    to: [orderData.customerEmail],
    subject: `✅ Order Confirmed: ${orderData.orderNumber}`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">✅ Order Confirmed!</h1>
            <p style="color: white; margin: 10px 0 0 0;">Thank you for your order, ${orderData.customerName}!</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e293b; margin-top: 0;">Order Details</h2>
            <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p><strong>Total Amount:</strong> ৳${orderData.totalAmount}</p>
            <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e293b; margin-top: 0;">Your Items</h2>
            <div style="font-family: monospace; white-space: pre-line; background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981;">
${itemsList}
            </div>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e293b; margin-top: 0;">Delivery Information</h2>
            <p><strong>Address:</strong> ${orderData.customerAddress}, ${orderData.customerCity}</p>
            <p><strong>Phone:</strong> ${orderData.customerPhone}</p>
            <p style="color: #059669; font-weight: bold;">📦 Your order will be delivered within 2-3 business days</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Order Summary</h2>
            <p><strong>Subtotal:</strong> ৳${orderData.subtotal}</p>
            <p><strong>Delivery Charge:</strong> ${orderData.deliveryCharge === 0 ? 'Free' : `৳${orderData.deliveryCharge}`}</p>
            <p style="font-size: 18px; color: #10b981;"><strong>Total: ৳${orderData.totalAmount}</strong></p>
          </div>
        </div>
      `,
  });
}