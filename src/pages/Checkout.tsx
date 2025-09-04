import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Bangladesh"
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

  const handleCheckout = async () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive your materials via email shortly",
      });
      
      clearCart();
      navigate('/payment-success');
    } catch (error) {
      toast({
        title: "Payment Failed",
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-xl border border-border p-6 shadow-card sticky top-24">
              <h2 className="font-display font-semibold text-xl mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-card-foreground truncate">
                        {item.code}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.subject} • {item.yearRange}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        ৳{item.price}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-muted-foreground hover:text-destructive p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({items.length} items)</span>
                  <span>৳{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Digital Delivery</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="flex justify-between font-display font-bold text-lg border-t border-border pt-2">
                  <span>Total</span>
                  <span className="text-primary">৳{getTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Customer Details */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="font-display font-semibold text-xl mb-6">
                Customer Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
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
                  <Label htmlFor="email">Email Address *</Label>
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
                  <Label htmlFor="phone">Phone Number *</Label>
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
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Delivery Method</h3>
                <p className="text-sm text-primary/80">
                  Digital download - Materials will be sent to your email instantly after payment
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="font-display font-semibold text-xl mb-6">
                Payment & Confirmation
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>SSL Encrypted • Secure Processing</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium"
                size="lg"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Complete Order - ৳{getTotalPrice()}
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By completing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;