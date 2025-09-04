import Header from "@/components/Header";
import SyllabusButton from "@/components/SyllabusButton";
import { GraduationCap, BookOpenCheck, Star, TrendingUp } from "lucide-react";

// Educational materials categories data
const categories = [
  { 
    id: 1, 
    title: "Cambridge A Level QP", 
    slug: "cambridge-a-level-question-papers",
    board: "cambridge" as const, 
    level: "a-level" as const, 
    type: "question-papers" as const
  },
  { 
    id: 2, 
    title: "Cambridge A Level MS", 
    slug: "cambridge-a-level-mark-schemes",
    board: "cambridge" as const, 
    level: "a-level" as const, 
    type: "mark-schemes" as const
  },
  { 
    id: 3, 
    title: "Cambridge O Level QP", 
    slug: "cambridge-o-level-question-papers",
    board: "cambridge" as const, 
    level: "o-level" as const, 
    type: "question-papers" as const
  },
  { 
    id: 4, 
    title: "Cambridge O Level MS", 
    slug: "cambridge-o-level-mark-schemes",
    board: "cambridge" as const, 
    level: "o-level" as const, 
    type: "mark-schemes" as const
  },
  { 
    id: 5, 
    title: "Cambridge IGCSE QP", 
    slug: "cambridge-igcse-question-papers",
    board: "cambridge" as const, 
    level: "igcse" as const, 
    type: "question-papers" as const
  },
  { 
    id: 6, 
    title: "Cambridge IGCSE MS", 
    slug: "cambridge-igcse-mark-schemes",
    board: "cambridge" as const, 
    level: "igcse" as const, 
    type: "mark-schemes" as const
  },
  { 
    id: 7, 
    title: "Edexcel IGCSE QP", 
    slug: "edexcel-igcse-question-papers",
    board: "edexcel" as const, 
    level: "igcse" as const, 
    type: "question-papers" as const
  },
  { 
    id: 8, 
    title: "Edexcel IGCSE MS", 
    slug: "edexcel-igcse-mark-schemes",
    board: "edexcel" as const, 
    level: "igcse" as const, 
    type: "mark-schemes" as const
  }
];

const stats = [
  { icon: BookOpenCheck, label: "Past Papers", value: "2,500+" },
  { icon: GraduationCap, label: "Subjects", value: "50+" },
  { icon: Star, label: "Success Rate", value: "98%" },
  { icon: TrendingUp, label: "Students", value: "10,000+" }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
              Premium Educational{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Materials
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Access comprehensive Cambridge and Edexcel question papers and mark schemes. 
              Boost your exam preparation with authentic past papers and detailed marking guidelines.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/5 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display font-bold text-2xl text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-4">
              <span className="text-xs font-medium text-accent-foreground uppercase tracking-wide">
                Educational Boards
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Choose Your Course Materials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select from our comprehensive collection of Cambridge and Edexcel educational resources
            </p>
          </div>

          {/* Syllabus Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {categories.map((category) => (
              <SyllabusButton
                key={category.id}
                title={category.title}
                slug={category.slug}
                board={category.board}
                level={category.level}
                type={category.type}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
              <BookOpenCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">EduMaterials</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Your trusted source for Cambridge and Edexcel educational materials
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-primary transition-smooth">Privacy Policy</a>
            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
            <a href="/terms" className="hover:text-primary transition-smooth">Terms of Service</a>
            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
            <a href="/contact" className="hover:text-primary transition-smooth">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
