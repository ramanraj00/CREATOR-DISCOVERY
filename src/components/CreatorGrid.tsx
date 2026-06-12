import { Creator } from "@/types/creator";
import CreatorCard from "./CreatorCard";

interface CreatorGridProps {
  creators: Creator[];
  onViewDetails: (creator: Creator) => void;
}

export default function CreatorGrid({ creators, onViewDetails }: CreatorGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {creators.map((creator) => (
        <CreatorCard 
          key={creator.id} 
          creator={creator} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
}