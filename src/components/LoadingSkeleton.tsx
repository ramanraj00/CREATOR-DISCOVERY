import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function LoadingSkeleton() {
  // 8 Cards ka pseudo array taaki grid khali na dikhe loading ke time
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonCards.map((_, index) => (
        <Card key={index} className="overflow-hidden border border-border/60">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-3 pb-3 border-t">
            <Skeleton className="h-8 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}