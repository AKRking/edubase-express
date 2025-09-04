import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubjectFilterProps {
  subjects: Array<{
    id: number;
    title: string;
    code: string;
  }>;
  selectedSubject: string | null;
  onSubjectSelect: (subjectCode: string | null) => void;
}

const SubjectFilter = ({ subjects, selectedSubject, onSubjectSelect }: SubjectFilterProps) => {
  const clearFilter = () => {
    onSubjectSelect(null);
  };

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <h4 className="font-display font-semibold text-foreground">Filter by Subject</h4>
        </div>
        {selectedSubject && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilter}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Selected Filter Display */}
      {selectedSubject && (
        <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-primary">
            Showing: {subjects.find(s => s.code === selectedSubject)?.title}
          </span>
          <button
            onClick={clearFilter}
            className="w-5 h-5 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-smooth"
          >
            <X className="w-3 h-3 text-primary" />
          </button>
        </div>
      )}

      {/* Subject List */}
      <div className="space-y-1 max-h-80 overflow-y-auto">
        <button
          onClick={() => onSubjectSelect(null)}
          className={`w-full text-left p-3 rounded-lg transition-smooth ${
            !selectedSubject 
              ? 'bg-primary text-primary-foreground font-medium' 
              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          All Subjects
        </button>
        
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSubjectSelect(subject.code)}
            className={`w-full text-left p-3 rounded-lg transition-smooth ${
              selectedSubject === subject.code
                ? 'bg-primary text-primary-foreground font-medium'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="space-y-1">
              <div className="text-sm font-medium">
                {subject.title}
              </div>
              <div className="text-xs opacity-75">
                Code: {subject.code}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectFilter;