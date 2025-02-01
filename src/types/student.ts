export interface PrfoileResponse {
  nama: string;
  username: string;
  poin: number;
  totalActivity: number;
  avarageScore: number;
}

export interface LevelInfo {
  level: string;
  currentPoints: number;
  maxPoints: number;
  progressPercentage: number;
}
