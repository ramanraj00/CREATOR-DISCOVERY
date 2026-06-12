'use client';

import { useState } from 'react';

// Bulletproof Absolute Paths
import { useCreators, FilterInputs } from '@/hooks/useCreators';
import { Creator } from '@/types/creator';

import CreatorFilters from '@/components/CreatorFilters';
import CreatorGrid from '@/components/CreatorGrid';
import CreatorDetailsSheet from '@/components/CreatorDetailsSheet';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';

import { Users2 } from 'lucide-react';

export default function CreatorDiscoveryPage() {
  // 1. Central filter state managed seamlessly
  const [filters, setFilters] = useState<FilterInputs>({
    search: '',
    niche: 'all',
    platform: 'all',
    country: 'all',
    minFollowers: 0,
    maxFollowers: 5000000,
  });

  // 2. State for controlling the full analytics sheet view
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 3. React Query Hook doing the async operations under the hood
  const { data: creators, isLoading, isError, refetch } = useCreators(filters);

  const handleFilterChange = (newFilters: FilterInputs) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (creator: Creator) => {
    setSelectedCreator(creator);
    setIsSheetOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      niche: 'all',
      platform: 'all',
      country: 'all',
      minFollowers: 0,
      maxFollowers: 5000000,
    });
  };

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Premium Header Layout Area */}
      <div className="border-b bg-card/40 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Users2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                upstageX
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium -mt-0.5">
                Creator Discovery Platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Find the Perfect Creators
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse, filter, and analyze creators across platforms for your next campaign.
          </p>
        </div>

        {/* 4. Filter Control Form Grid Component */}
        <CreatorFilters 
          onFilterChange={handleFilterChange} 
          currentFilters={filters} 
        />

        {/* 5. Conditional Rendering according to upstageX evaluation requirements */}
        <div className="pt-2">
          {isLoading && <LoadingSkeleton />}

          {isError && (
            <ErrorState 
              message="Failed to simulate connection data stream." 
              onRetry={refetch} 
            />
          )}

          {!isLoading && !isError && creators && creators.length > 0 && (
            <CreatorGrid 
              creators={creators} 
              onViewDetails={handleViewDetails} 
            />
          )}

          {!isLoading && !isError && creators && creators.length === 0 && (
            <EmptyState onReset={handleResetFilters} />
          )}
        </div>
      </div>

      {/* 6. Sliding Side Sheet Profile Drawer component */}
      <CreatorDetailsSheet
        creator={selectedCreator}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </main>
  );
}