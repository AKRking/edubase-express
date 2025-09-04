import { cn } from "@/lib/utils";
import { BookOpen, FileText, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

interface SyllabusButtonProps {
  title: string;
  slug: string;
  board: "cambridge" | "edexcel";
  level: "a-level" | "o-level" | "igcse";
  type: "question-papers" | "mark-schemes";
  className?: string;
}

const SyllabusButton = ({ title, slug, board, level, type, className }: SyllabusButtonProps) => {
  const router = useRouter();

  const getIcon = () => {
    if (type === "question-papers") {
      return <FileText className="w-5 h-5" />;
    }
    return <GraduationCap className="w-5 h-5" />;
  };

  const getBoardColor = () => {
    return board === "cambridge" ? "border-primary/20 bg-primary-light" : "border-secondary/20 bg-secondary-light";
  };

  const handleClick = () => {
    router.push(`/products/${slug}`);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        // Base styles with design system tokens
        "group relative w-full p-6 rounded-xl border transition-smooth",
        "bg-card hover:bg-gradient-card shadow-card hover:shadow-card-lg",
        
        // Interactive states
        "hover:scale-[1.02] active:scale-[0.98] transition-bounce",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        
        // Board-specific styling
        getBoardColor(),
        
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-lg transition-smooth",
          board === "cambridge" 
            ? "bg-primary text-primary-foreground group-hover:bg-primary-hover" 
            : "bg-secondary text-secondary-foreground group-hover:bg-secondary-hover"
        )}>
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <h3 className="font-display font-semibold text-base text-card-foreground mb-1 group-hover:text-primary transition-smooth">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="capitalize">{board}</span>
            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span className="uppercase">{level.replace("-", " ")}</span>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="opacity-0 group-hover:opacity-100 transition-smooth">
          <svg 
            className="w-5 h-5 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-xl transition-smooth" />
    </button>
  );
};

export default SyllabusButton;