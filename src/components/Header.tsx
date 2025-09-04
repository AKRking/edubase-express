import { BookOpen, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

const Header = () => {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">
                EduMaterials
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Cambridge & Edexcel Resources
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
              Home
            </a>
            <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
              About
            </a>
            <a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </nav>

          {/* Cart */}
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="w-4 h-4" />
            <span className="ml-2 hidden sm:inline">Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;