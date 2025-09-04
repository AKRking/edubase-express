import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import { CheckCircle, Download, Mail, ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const orderData = location.state?.orderData;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber);
    toast({
      title: "Copied!",
      description: "Order number copied to clipboard",
    });
  };

  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-400 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-black" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your educational materials are being prepared.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Order Information */}
          <div>
            <h2 className="font-display font-semibold text-xl mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Order Number:</span>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded border-2 border-gray-300">
                  {orderData.orderNumber}
                </span>
                <button
                  onClick={copyOrderNumber}
                  className="p-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150 rounded"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <div>
                <span className="text-sm font-medium">Payment Method: </span>
                <span className="text-sm">{orderData.paymentMethod}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Customer: </span>
                <span className="text-sm">{orderData.customerInfo.fullName}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Email: </span>
                <span className="text-sm">{orderData.customerInfo.email}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Address: </span>
                <span className="text-sm">{orderData.customerInfo.address}, {orderData.customerInfo.city}</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="font-display font-semibold text-xl mb-4">Order Summary</h2>
            <div className="space-y-2">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm py-1">
                  <span className="truncate mr-2">{item.code}</span>
                  <span>৳{item.price}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>৳{orderData.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span>{orderData.deliveryCharge === 0 ? "Free" : `৳${orderData.deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">৳{orderData.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-8">
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            What happens next?
          </h3>
          <div className="space-y-2 text-sm">
            <p>• You will receive an order confirmation email shortly</p>
            <p>• For digital materials: Download links will be sent within 24 hours</p>
            <p>• For physical delivery: Your materials will be shipped within 2-3 business days</p>
            <p>• You can track your order status using the order number above</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 rounded-lg font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Continue Shopping
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-blue-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 rounded-lg font-medium text-black"
          >
            <Download className="w-4 h-4 mr-2 inline" />
            Print Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;