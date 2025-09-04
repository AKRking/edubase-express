import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Shield, Trash2, Truck, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  // Calculate delivery charge
  const calculateDeliveryCharge = () => {
    const subtotal = getTotalPrice();
    const isChittagong = formData.address.toLowerCase().includes('chittagong') || 
                        formData.city.toLowerCase().includes('chittagong');
    
    if (isChittagong) return 0;
    if (subtotal >= 1000) return 0;
    return 50;
  };

  const deliveryCharge = calculateDeliveryCharge();
  const totalAmount = getTotalPrice() + deliveryCharge;

  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      details: "Pay when you receive your materials. Available for physical delivery only."
    },
    {
      id: "bkash",
      name: "bKash",
      details: "Send money to: 01XXXXXXXXX. Use your order number as reference."
    },
    {
      id: "nagad",
      name: "Nagad",
      details: "Send money to: 01XXXXXXXXX. Use your order number as reference."
    },
    {
      id: "bank",
      name: "Bank Transfer",
      details: "Account: 1234567890, Bank: ABC Bank Ltd. Include order number in description."
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setShowPaymentDetails(true);
  };

  const handleCompleteOrder = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page with order data
      navigate('/success-page', {
        state: {
          orderData: {
            items,
            customerInfo: formData,
            paymentMethod: paymentMethods.find(p => p.id === selectedPaymentMethod)?.name,
            subtotal: getTotalPrice(),
            deliveryCharge,
            total: totalAmount,
            orderNumber: `ORD-${Date.now()}`
          }
        }
      });
      
      clearCart();
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-card rounded-xl border border-border p-8 shadow-card">
            <h1 className="font-display font-bold text-2xl text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Add some educational materials to your cart to proceed with checkout
            </p>
            <Button onClick={() => navigate('/')} className="bg-gradient-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">
              Checkout
            </h1>
            <p className="text-muted-foreground">
              Complete your order for educational materials
            </p>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <h2 className="font-display font-semibold text-xl mb-4">
                Order Summary
              </h2>
              
              {/* Items List - Concise, no padding, no scrolls */}
              <div className="space-y-1 mb-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs text-foreground">
                        {item.code}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.subject} • ৳{item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Charge Section */}
              <div className="space-y-2 py-4 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Delivery Information</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({items.length} items)</span>
                  <span>৳{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Charge</span>
                  <span className={deliveryCharge === 0 ? "text-green-600" : "text-foreground"}>
                    {deliveryCharge === 0 ? "Free" : `৳${deliveryCharge}`}
                  </span>
                </div>
                {deliveryCharge === 0 && (
                  <p className="text-xs text-green-600">
                    {formData.address.toLowerCase().includes('chittagong') || formData.city.toLowerCase().includes('chittagong') 
                      ? "Free delivery in Chittagong!" 
                      : "Free delivery for orders above ৳1000!"}
                  </p>
                )}
                <div className="flex justify-between font-display font-bold text-lg border-t border-border pt-2">
                  <span>Total</span>
                  <span className="text-primary">৳{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Customer Details */}
          <div className="lg:col-span-4">
            <h2 className="font-display font-semibold text-xl mb-4">
              Customer Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium mb-1 block">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"

                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-1 block">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"

                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm font-medium mb-1 block">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+880 1XX XXX XXXX"

                  required
                />
              </div>
              
              <div>
                <Label htmlFor="address" className="text-sm font-medium mb-1 block">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"

                  required
                />
              </div>
              
              <div>
                <Label htmlFor="city" className="text-sm font-medium mb-1 block">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"

                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div className="lg:col-span-4">
            <h2 className="font-display font-semibold text-xl mb-4">
              Payment & Confirmation
            </h2>
            
            {/* Payment Methods */}
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <button
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      className={`w-full p-3 text-left rounded-lg font-medium transition-all duration-150 ${
                        selectedPaymentMethod === method.id 
                          ? 'border-2 border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-500' 
                          : 'border-2 border-gray-400 bg-white text-gray-600 opacity-90 ring-2 ring-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{method.name}</span>
                        {selectedPaymentMethod === method.id && showPaymentDetails ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    
                    {/* Payment Details */}
                    {selectedPaymentMethod === method.id && showPaymentDetails && (
                      <div className="mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-700">{method.details}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Security Info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Shield className="w-4 h-4" />
              <span>SSL Encrypted • Secure Processing</span>
            </div>

            {/* Complete Order Button */}
            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="w-full p-4 bg-green-400 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 rounded-lg font-bold text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2 inline" />
                  Complete Order - ৳{totalAmount}
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              By completing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;