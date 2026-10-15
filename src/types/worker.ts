export type WorkerTrade =
  | 'all'
  | 'mason'
  | 'carpenter'
  | 'painter'
  | 'electrician'
  | 'plumber'
  | 'general';

export type AvailabilityFilter = 'all' | 'today' | 'this_week';

export interface WorkerProfile {
  id: string;
  name: string;
  initials: string;
  trade: WorkerTrade;
  tradeLabel: string;
  experienceYears: number;
  locality: string;
  city: string;
  expectedRate: string;
  rateAmount: number;
  availability: 'Available Today' | 'Available This Week';
  availabilityType: 'today' | 'this_week';
  rating: number;
  skills: string[];
  bio: string;
  sampleWorkExamples: string[];
}

export interface PostedJob {
  id: string;
  trade: string;
  tradeLabel: string;
  title: string;
  locality: string;
  city: string;
  payAmount: number;
  payUnit: 'per_day' | 'per_job';
  payFormatted: string;
  hours: string;
  duration: string;
  paymentTiming: string;
  description: string;
  createdAt: string;
}

export type WorkerAvailabilityStatus = 'today' | 'this_week' | 'not_available';

export interface UserWorkerProfile {
  name: string;
  trade: Exclude<WorkerTrade, 'all'>;
  tradeLabel: string;
  experienceYears: number;
  locality: string;
  city: string;
  payAmount: number;
  payUnit: 'per_day' | 'per_job';
  availability: WorkerAvailabilityStatus;
  skills: string[];
  bio: string;
  phone?: string;
  lastSavedAt?: string;
}

