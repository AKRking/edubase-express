import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import SubjectFilter from "@/components/SubjectFilter";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Star, ArrowLeft, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Paper {
  id: string;
  code: string;
  yearRange: string;
  price: number;
  isPopular?: boolean;
  component: string;
}

interface Subject {
  id: number;
  title: string;
  code: string;
  status?: string;
  description: string;
  papers: Paper[];
}

// Mock data structure following the specifications
const mockSubjects: Subject[] = [
  {
    id: 1,
    title: "COMPUTER 9618 (Current)",
    code: "9618",
    status: "Current",
    description: "AS Paper 1,2 || A2 Paper 3,4 (latest)",
    papers: [
      {
        id: "comp-qp1-2021-2025",
        code: "AL-COM-qp1-2021 to 2025",
        yearRange: "2021 to 2025",
        price: 390,
        isPopular: true,
        component: "qp1"
      },
      {
        id: "comp-qp2-2021",
        code: "AL-COM-qp2-2021 to 2021",
        yearRange: "2021 to 2021",
        price: 160,
        component: "qp2"
      },
      {
        id: "comp-qp2-2022-2025",
        code: "AL-COM-qp2-2022 to 2025",
        yearRange: "2022 to 2025",
        price: 450,
        isPopular: true,
        component: "qp2"
      },
      {
        id: "comp-qp3-2020-2025",
        code: "AL-COM-qp3-2020 to 2025",
        yearRange: "2020 to 2025",
        price: 520,
        component: "qp3"
      }
    ]
  },
  {
    id: 2,
    title: "COMPUTER 9608 (OLD SYLLABUS)",
    code: "9608",
    status: "Old Syllabus",
    description: "AS Paper 1,2 || A2 Paper 3,4",
    papers: [
      {
        id: "comp-old-qp1-2015",
        code: "AL-COM-qp1-2015 to 2015",
        yearRange: "2015 to 2015",
        price: 130,
        component: "qp1"
      },
      {
        id: "comp-old-qp2-2010-2016",
        code: "AL-COM-qp2-2010 to 2016",
        yearRange: "2010 to 2016",
        price: 280,
        component: "qp2"
      }
    ]
  },
  {
    id: 3,
    title: "ECONOMICS 9708",
    code: "9708",
    description: "AS Paper 1,2 || A2 Paper 3,4",
    papers: [
      {
        id: "eco-qp1-2002-2004",
        code: "AL-ECO-qp1-2002 to 2004",
        yearRange: "2002 to 2004",
        price: 90,
        component: "qp1"
      },
      {
        id: "eco-qp1-2020-2025",
        code: "AL-ECO-qp1-2020 to 2025",
        yearRange: "2020 to 2025",
        price: 440,
        isPopular: true,
        component: "qp1"
      },
      {
        id: "eco-qp2-2018-2025",
        code: "AL-ECO-qp2-2018 to 2025",
        yearRange: "2018 to 2025",
        price: 350,
        component: "qp2"
      }
    ]
  }
];

const ProductListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItems } = useCart();
  const { toast } = useToast();
  const [selectedPapers, setSelectedPapers] = useState<Paper[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showCheckoutButton, setShowCheckoutButton] = useState(false);

  // Parse the category from the slug
  const getCategoryInfo = (slug: string | undefined) => {
    if (!slug) return null;
    
    const parts = slug.split('-');
    const board = parts[0]; // cambridge or edexcel
    const level = parts[1]; // a-level, o-level, igcse
    const type = parts.slice(2).join('-'); // question-papers or mark-schemes
    
    return {
      board: board.charAt(0).toUpperCase() + board.slice(1),
      level: level.toUpperCase().replace('-', ' '),
      type: type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
  };

  const categoryInfo = getCategoryInfo(slug);

  // Filter subjects based on selected filter
  const filteredSubjects = useMemo(() => {
    if (!selectedSubject) return mockSubjects;
    return mockSubjects.filter(subject => subject.code === selectedSubject);
  }, [selectedSubject]);

  // Extract unique subjects for filter
  const subjectOptions = useMemo(() => {
    return mockSubjects.map(subject => ({
      id: subject.id,
      title: subject.title,
      code: subject.code
    }));
  }, []);

  const handlePaperSelection = (paper: Paper, isSelected: boolean) => {
    if (isSelected) {
      setSelectedPapers(prev => [...prev, paper]);
    } else {
      setSelectedPapers(prev => prev.filter(p => p.id !== paper.id));
    }
  };

  const totalPrice = selectedPapers.reduce((sum, paper) => sum + paper.price, 0);
  const totalItems = selectedPapers.length;

  const handleAddToCart = () => {
    if (selectedPapers.length === 0) return;

    // Convert selected papers to cart items
    const cartItems: CartItem[] = selectedPapers.map(paper => ({
      id: paper.id,
      code: paper.code,
      price: paper.price,
      subject: mockSubjects.find(s => s.papers.includes(paper))?.title || "Unknown Subject",
      board: categoryInfo?.board || "Unknown Board",
      level: categoryInfo?.level || "Unknown Level", 
      type: categoryInfo?.type || "Unknown Type",
      yearRange: paper.yearRange,
      component: paper.component
    }));

    // Add to cart
    addItems(cartItems);

    // Show success toast
    toast({
      title: "Added to Cart!",
      description: `${selectedPapers.length} item${selectedPapers.length > 1 ? 's' : ''} added successfully`,
    });

    // Clear current selection
    setSelectedPapers([]);
    
    // Show checkout button
    setShowCheckoutButton(true);

    // Clear all checkboxes by triggering a re-render
    const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  };

  const handleGoToCheckout = () => {
    // Hide the checkout button
    setShowCheckoutButton(false);
    // Navigate to checkout page (to be implemented)
    navigate('/checkout');
  };

  if (!categoryInfo) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="hover:text-primary transition-smooth flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">
            {categoryInfo.board} {categoryInfo.level} {categoryInfo.type}
          </span>
        </nav>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Sticky */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              {/* Product Gallery */}
              <div>
                <ProductGallery categoryInfo={categoryInfo} />
              </div>
            </div>
          </div>

          {/* Right Column - Scrollable Content */}
          <div className="lg:col-span-8">
            {/* Category Header */}
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
                {categoryInfo.board} {categoryInfo.level}
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                {categoryInfo.type}
              </p>
              <p className="text-muted-foreground">
                Select the materials you need from our comprehensive collection
                {selectedSubject && (
                  <span className="ml-2 text-primary font-medium">
                    (Filtered by: {subjectOptions.find(s => s.code === selectedSubject)?.title})
                  </span>
                )}
              </p>
            </div>

            {/* Subject Filter - Moved to top */}
            <div className="mb-6">
              <SubjectFilter
                subjects={subjectOptions}
                selectedSubject={selectedSubject}
                onSubjectSelect={setSelectedSubject}
              />
            </div>

            {/* Subject Cards */}
            <div className="space-y-4 mb-20">
              {filteredSubjects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">No subjects found for the selected filter</div>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedSubject(null)}
                  >
                    Clear Filter
                  </Button>
                </div>
              ) : (
                filteredSubjects.map((subject) => (
                  <div key={subject.id} className="py-3">
                    {/* Subject Header */}
                    <div className="mb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="font-display font-bold text-xl text-card-foreground">
                          {subject.title}
                        </h2>
                        {subject.status && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            subject.status === 'Current' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-warning/10 text-warning'
                          }`}>
                            {subject.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        {subject.description}
                      </p>
                    </div>

                    {/* Papers Selection */}
                    <div className="space-y-1">
                      {subject.papers.map((paper) => (
                        <label 
                          key={paper.id} 
                          className="flex items-center gap-3 py-2 cursor-pointer transition-smooth group"
                        >
                          <input
                            type="checkbox"
                            value={paper.id}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-offset-2"
                            onChange={(e) => handlePaperSelection(paper, e.target.checked)}
                          />
                          <div className="flex-1 flex items-center gap-3">
                            <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-smooth">
                              {paper.code}
                            </span>
                            {paper.isPopular && (
                              <Star className="w-4 h-4 text-warning fill-warning" />
                            )}
                          </div>
                          <span className="text-sm font-semibold text-card-foreground">
                            (+৳ {paper.price})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Selection Summary - Updated functionality */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 bg-background border border-border p-4 max-w-sm z-50">
          <h3 className="font-display font-semibold text-lg mb-4">
            Selected Items ({totalItems})
          </h3>
          
          <div className="space-y-1 max-h-40 overflow-y-auto mb-3">
            {selectedPapers.map((paper) => (
              <div key={paper.id} className="flex justify-between items-center text-sm">
                <span className="truncate text-card-foreground">{paper.code}</span>
                <span className="font-medium text-card-foreground ml-2">৳{paper.price}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between items-center font-display font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">৳{totalPrice}</span>
            </div>
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium"
              size="lg"
              disabled={totalItems === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      )}

      {/* Go to Checkout Button - Appears after adding to cart */}
      {showCheckoutButton && (
        <div className="fixed bottom-6 right-6 bg-warning rounded-xl border border-warning/20 shadow-card-lg p-6 max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
              <CreditCard className="w-6 h-6 text-warning-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-warning-foreground mb-1">
                Ready to Checkout?
              </h3>
              <p className="text-sm text-warning-foreground/80">
                Items added to your cart successfully
              </p>
            </div>
            <div className="space-y-2">
              <Button 
                onClick={handleGoToCheckout}
                className="w-full bg-warning hover:bg-warning/90 text-warning-foreground font-medium"
                size="lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Go to Checkout
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCheckoutButton(false)}
                className="w-full text-warning-foreground/70 hover:text-warning-foreground"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;