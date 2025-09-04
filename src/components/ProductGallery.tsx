import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  categoryInfo: {
    board: string;
    level: string;
    type: string;
  };
}

const ProductGallery = ({ categoryInfo }: ProductGalleryProps) => {
  // Mock gallery images - in real app these would come from props/API
  const galleryImages = [
    {
      id: 1,
      src: "/placeholder.svg",
      alt: `${categoryInfo.board} ${categoryInfo.level} Cover`,
      title: "Question Paper Cover"
    },
    {
      id: 2,
      src: "/placeholder.svg", 
      alt: `${categoryInfo.board} Sample Page`,
      title: "Sample Questions"
    },
    {
      id: 3,
      src: "/placeholder.svg",
      alt: `${categoryInfo.board} Mark Scheme`,
      title: "Mark Scheme Preview"
    },
    {
      id: 4,
      src: "/placeholder.svg",
      alt: `${categoryInfo.board} Answer Guide`,
      title: "Answer Guidelines"
    }
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Product Image */}
      <div className="relative bg-gradient-card rounded-xl border border-border overflow-hidden aspect-[4/3]">
        <img
          src={galleryImages[selectedImage].src}
          alt={galleryImages[selectedImage].alt}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-smooth"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-smooth"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium text-foreground">
          {selectedImage + 1} / {galleryImages.length}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-display font-bold text-xl text-foreground">
          {categoryInfo.board} {categoryInfo.level}
        </h3>
        <p className="text-muted-foreground">
          {categoryInfo.type}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
            {categoryInfo.board}
          </span>
          <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full font-medium">
            {categoryInfo.level}
          </span>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="space-y-3">
        <h4 className="font-display font-semibold text-foreground">Gallery</h4>
        <div className="grid grid-cols-2 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-smooth ${
                selectedImage === index 
                  ? 'border-primary shadow-card' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/0 hover:bg-background/10 transition-smooth" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;