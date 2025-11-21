export interface Alert {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'SUCCESS';
  message: string;
  time: string;
  impact: string;
  source?: string;
  xp?: number;
}

export interface PlatformStat {
  name: string;
  percentage: number;
  trend: 'up' | 'down';
  data: number[]; // For sparkline
}

export interface SentimentPoint {
  time: string;
  score: number;
}

export interface DashboardState {
  level: number;
  currentXP: number;
  maxXP: number;
  vibeScore: number;
  streak: number;
  totalMentions: number;
  reach: string;
  alerts: Alert[];
  achievements: { name: string; xp: number; icon: string }[];
  platforms: PlatformStat[];
  sentimentHistory: SentimentPoint[];
}

export enum ScenarioType {
  CRISIS = 'CRISIS',
  VIRAL_SUCCESS = 'VIRAL_SUCCESS',
  NORMAL = 'NORMAL'
}