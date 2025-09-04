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
    <div className="space-y-3">
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

      {/* Subject Grid - 4 rows x 3 columns */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onSubjectSelect(null)}
          className={`px-3 py-2 text-xs font-medium rounded transition-smooth ${
            !selectedSubject 
              ? 'bg-primary text-primary-foreground' 
              : 'border border-border hover:bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          All Subjects
        </button>
        
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSubjectSelect(subject.code)}
            className={`px-3 py-2 text-xs font-medium rounded transition-smooth text-center ${
              selectedSubject === subject.code
                ? 'bg-primary text-primary-foreground'
                : 'border border-border hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            title={subject.title}
          >
            {subject.code}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectFilter;