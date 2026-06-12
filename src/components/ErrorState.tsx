import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({ message = "Failed to fetch creator data.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 border border-destructive/20 rounded-xl bg-destructive/5 my-8">
      <div className="p-4 bg-destructive/10 text-destructive rounded-full mb-4">
        <AlertCircle className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-destructive">Something went wrong</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        {message} Please verify your connection or database setup and try again.
      </p>
      <Button onClick={onRetry} variant="destructive" className="mt-6">
        Try Again
      </Button>
    </div>
  );
}