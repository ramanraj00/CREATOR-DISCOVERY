import { Creator } from "@/types/creator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { formatFollowers } from "@/lib/utils";
import { Globe, Users, TrendingUp, Radio } from "lucide-react";

interface CreatorDetailsSheetProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatorDetailsSheet({ creator, isOpen, onClose }: CreatorDetailsSheetProps) {
  if (!creator) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l border-border/60">
        <SheetHeader className="text-left space-y-4">
          <div className="flex items-center gap-4 mt-4">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="h-16 w-16 rounded-full border bg-muted"
            />
            <div>
              <SheetTitle className="text-xl font-bold">{creator.name}</SheetTitle>
              <div className="flex gap-2 mt-1.5">
                <Badge variant="secondary">{creator.niche}</Badge>
                <Badge variant="outline" className="capitalize">{creator.platform}</Badge>
              </div>
            </div>
          </div>
          <SheetDescription className="text-sm text-muted-foreground pt-2">
            {creator.bio}
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="p-4 rounded-xl border bg-card/50 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Users className="h-4 w-4 text-primary" />
              Followers
            </div>
            <span className="text-lg font-bold mt-1">{formatFollowers(creator.followers)}</span>
          </div>

          <div className="p-4 rounded-xl border bg-card/50 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Engagement
            </div>
            <span className="text-lg font-bold mt-1 text-green-500">{creator.engagementRate}%</span>
          </div>

          <div className="p-4 rounded-xl border bg-card/50 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Globe className="h-4 w-4 text-blue-500" />
              Country
            </div>
            <span className="text-base font-semibold mt-1">{creator.country}</span>
          </div>

          <div className="p-4 rounded-xl border bg-card/50 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Radio className="h-4 w-4 text-red-500" />
              Platform
            </div>
            <span className="text-base font-semibold mt-1 capitalize">{creator.platform}</span>
          </div>
        </div>

        {/* Audience Breakdown Metric Section - Pure Premium Vibe */}
        <div className="space-y-4 border-t pt-6">
          <h4 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
            Audience Demographics
          </h4>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Male ({creator.audienceBreakdown.male}%)</span>
              <span>Female ({creator.audienceBreakdown.female}%)</span>
            </div>
            {/* Custom Multi-colored Visual Demographics Bar */}
            <div className="w-full h-3 rounded-full bg-pink-400 overflow-hidden flex">
              <div 
                className="bg-blue-500 h-full transition-all duration-500" 
                style={{ width: `${creator.audienceBreakdown.male}%` }}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}