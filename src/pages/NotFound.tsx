import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-gradient-primary w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-display font-bold text-2xl">404</span>
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The educational resource you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-medium transition-smooth"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
