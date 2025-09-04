'use server';

import { createOrder } from './supabase';
import { sendAdminOrderNotification, sendCustomerOrderConfirmation } from './email';

export async function createOrderAction(orderData: {
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
    // Create order in Supabase
    const result = await createOrder(orderData);
    
    if (!result.success) {
      throw new Error(result.error?.message || 'Failed to create order');
    }

    // Prepare email data
    const emailData = {
      orderNumber: orderData.orderNumber,
      customerName: orderData.customerInfo.fullName,
      customerEmail: orderData.customerInfo.email,
      customerPhone: orderData.customerInfo.phone,
      customerAddress: orderData.customerInfo.address,
      customerCity: orderData.customerInfo.city,
      paymentMethod: orderData.paymentMethod,
      subtotal: orderData.subtotal,
      deliveryCharge: orderData.deliveryCharge,
      totalAmount: orderData.totalAmount,
      items: orderData.items.map(item => ({
        item_code: item.code,
        subject: item.subject,
        board: item.board,
        level: item.level,
        type: item.type,
        year_range: item.yearRange,
        component: item.component,
        price: item.price
      }))
    };

    // Send emails (don't fail the order if emails fail)
    try {
      await Promise.all([
        sendAdminOrderNotification(emailData),
        sendCustomerOrderConfirmation(emailData)
      ]);
      console.log('Order emails sent successfully');
    } catch (emailError) {
      console.error('Failed to send order emails:', emailError);
      // Don't throw here - order should still succeed even if emails fail
    }

    return { success: true, order: result.order };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create order' 
    };
  }
}