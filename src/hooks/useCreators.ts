import { useQuery } from '@tanstack/react-query';
import { Creator } from '@/types/creator';
import z from 'zod';

// Zod schema for search and filters as requested by upstageX
export const filterSchema = z.object({
  search: z.string().optional(),
  niche: z.string().optional(),
  platform: z.string().optional(),
  minFollowers: z.number().optional(),
  maxFollowers: z.number().optional(),
  country: z.string().optional(),
});

export type FilterInputs = z.infer<typeof filterSchema>;

// Mock API Call simulating a network database request
const fetchCreators = async (filters: FilterInputs): Promise<Creator[]> => {
  // 1. Fetching local static JSON data
  const response = await fetch('/data/creators.json'); // Next.js serves files from public or absolute paths if configured, but since we are working locally, we will import it or fetch it.
  
  // Cleanest way in Next client side: build a simulation delay
  await new Promise((resolve) => setTimeout(resolve, 800)); // 800ms delay to gracefully show skeletons!
  
  // Direct import approach is safer for absolute client environment simulation:
  const data: Creator[] = require('@/data/creators.json');

  // 2. Client side query filtering logic
  return data.filter((creator) => {
    if (filters.search && !creator.name.toLowerCase().includes(filters.search.toLowerCase()) && !creator.bio.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.niche && filters.niche !== 'all' && creator.niche !== filters.niche) {
      return false;
    }
    if (filters.platform && filters.platform !== 'all' && creator.platform.toLowerCase() !== filters.platform.toLowerCase()) {
      return false;
    }
    if (filters.country && filters.country !== 'all' && creator.country !== filters.country) {
      return false;
    }
    if (filters.minFollowers && creator.followers < filters.minFollowers) {
      return false;
    }
    if (filters.maxFollowers && creator.followers > filters.maxFollowers) {
      return false;
    }
    return true;
  });
};

export const useCreators = (filters: FilterInputs) => {
  return useQuery({
    queryKey: ['creators', filters],
    queryFn: () => fetchCreators(filters),
  });
};