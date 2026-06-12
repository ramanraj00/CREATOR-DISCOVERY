import { Creator } from "@/types/creator";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatFollowers } from "@/lib/utils";
import { Users, BarChart, Video, Camera, Briefcase, Globe } from "lucide-react";

interface CreatorCardProps {
  creator: Creator;
  onViewDetails: (creator: Creator) => void;
}

export default function CreatorCard({ creator, onViewDetails }: CreatorCardProps) {
  
  // Strict multi-version compatible icon map
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "youtube": 
        return <Video className="h-4 w-4 text-red-500" />;
      case "instagram": 
        return <Camera className="h-4 w-4 text-pink-600" />;
      case "linkedin": 
        return <Briefcase className="h-4 w-4 text-blue-700" />;
      default: 
        return <Globe className="h-4 w-4 text-sky-400" />; 
    }
  };

  return (
    <Card className="group overflow-hidden border border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col h-full bg-card">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="h-11 w-11 rounded-full border bg-muted group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="overflow-hidden flex-1">
          <h3 className="font-semibold text-sm leading-tight truncate text-foreground group-hover:text-primary transition-colors">
            {creator.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            {getPlatformIcon(creator.platform)}
            <span className="capitalize">{creator.platform}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4 text-xs text-muted-foreground space-y-3">
        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground/90">
          {creator.bio}
        </p>
        
        <div className="flex justify-between items-center bg-muted/40 p-2.5 rounded-lg border border-muted/50">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
              <Users className="h-3 w-3" /> Followers
            </span>
            <span className="text-sm font-bold text-foreground">
              {formatFollowers(creator.followers)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-right">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1 justify-end">
              <BarChart className="h-3 w-3 text-green-500" /> Engagement
            </span>
            <span className="text-sm font-bold text-green-600">
              {creator.engagementRate}%
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-3 px-4">
        <Button 
          onClick={() => onViewDetails(creator)} 
          variant="secondary" 
          className="w-full text-xs font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
        >
          View Full Analytics
        </Button>
      </CardFooter>
    </Card>
  );
}