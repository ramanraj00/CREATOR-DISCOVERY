'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { filterSchema, FilterInputs } from '@/hooks/useCreators';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';

interface CreatorFiltersProps {
  onFilterChange: (filters: FilterInputs) => void;
  currentFilters: FilterInputs;
}

export default function CreatorFilters({ onFilterChange, currentFilters }: CreatorFiltersProps) {
  // 1. Setup React Hook Form with Zod validation schema
  const { register, handleSubmit, control, reset, watch } = useForm<FilterInputs>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: '',
      niche: 'all',
      platform: 'all',
      country: 'all',
      minFollowers: 0,
      maxFollowers: 5000000,
    },
  });

const watchedValues = watch();

useEffect(() => {
  const subscription = watch((value) => {
    onFilterChange(value as FilterInputs);
  });

  return () => subscription.unsubscribe();
}, [watch, onFilterChange]);
  const handleReset = () => {
    reset({
      search: '',
      niche: 'all',
      platform: 'all',
      country: 'all',
      minFollowers: 0,
      maxFollowers: 5000000,
    });
  };

  return (
    <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2 font-semibold text-sm tracking-tight text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filter Creators
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="text-xs h-8 text-muted-foreground hover:text-foreground flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      </div>

      {/* Responsive Grid Form Elements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Keyword Search */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              {...register('search')}
              placeholder="Search name or bio..."
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        {/* Niche Dropdown Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Niche</label>
          <Controller
            name="niche"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-9 text-sm bg-background">
                  <SelectValue placeholder="All Niches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Niches</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Vlogging">Vlogging</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Platform Dropdown Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Platform</label>
          <Controller
            name="platform"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-9 text-sm bg-background">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Country Dropdown Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Audience Country</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-9 text-sm bg-background">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="UAE">UAE</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Range Slider for Followers Count - Extreme Premium Polish */}
        <div className="space-y-1.5 sm:col-span-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-muted-foreground">Max Follower Range</label>
            <span className="text-xs font-bold text-primary">
              {(watchedValues.maxFollowers ?? 5000000) >= 1000000
                ? `${((watchedValues.maxFollowers ?? 5000000) / 1000000).toFixed(1)}M`
                : `${((watchedValues.maxFollowers ?? 5000000) / 1000).toFixed(0)}K`}
            </span>
          </div>
          <div className="pt-2">
            <Controller
              name="maxFollowers"
              control={control}
              render={({ field }) => (
                <Slider
                  min={5000}
                  max={5000000}
                  step={25000}
                  value={[field.value ?? 5000000]}
                  onValueChange={(val) => field.onChange(val[0])}
                  className="py-2"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}