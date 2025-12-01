import { ArrowLeft, Save } from "lucide-react";

export function CourseHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-xl border border-border hover:bg-muted transition-colors flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Course</h1>
          <p className="text-muted-foreground mt-1">
            Share your knowledge with students worldwide
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="px-6 py-2.5 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all">
          <Save className="w-4 h-4 inline mr-2" />
          Save Draft
        </button>
      </div>
    </div>
  );
}