import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed rounded-xl bg-muted/10 my-8">
      <div className="p-4 bg-muted rounded-full mb-4">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight">No creators found</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        We couldn't find any creators matching your current filter criteria. Try adjusting your search or resetting filters.
      </p>
      <Button onClick={onReset} variant="outline" className="mt-6">
        Clear All Filters
      </Button>
    </div>
  );
}