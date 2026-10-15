export type TradeCategory =
  | 'all'
  | 'masonry'
  | 'carpentry'
  | 'painting'
  | 'electrical'
  | 'plumbing'
  | 'general';

export type DurationFilter = 'all' | 'daily' | 'multi_day' | 'ongoing';

export interface Job {
  id: string;
  title: string;
  trade: TradeCategory;
  tradeLabel: string;
  locality: string;
  city: string;
  payAmount: number;
  payUnit: string;
  payFormatted: string;
  duration: string;
  durationType: 'daily' | 'multi_day' | 'ongoing';
  hours: string;
  paymentTiming: string;
  description: string;
  responsibilities: string[];
  toolsProvided: boolean;
  employerName: string;
  employerType: string;
  postedDaysAgo: number;
  isFeatured?: boolean;
}
