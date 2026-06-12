export type NicheType = 'Tech' | 'Lifestyle' | 'Finance' | 'Gaming' | 'Fashion' | 'Fitness' | 'Travel' | 'Vlogging';

export type PlatformType = 'YouTube' | 'Instagram' | 'LinkedIn' | 'Twitter';

export interface AudienceBreakdown {
  male: number;
  female: number;
}

export interface Creator {
  id: number;
  name: string;
  avatar: string;
  niche: NicheType;
  platform: PlatformType;
  followers: number;
  engagementRate: number;
  country: string;
  bio: string;
  audienceBreakdown: AudienceBreakdown;
}