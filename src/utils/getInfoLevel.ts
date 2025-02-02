import { LevelInfo } from "@/hooks/student/type";

export const getLevelInfo = (points: number): LevelInfo => {
  const levels = [
    { name: "Chibi", min: 0, max: 99 },
    { name: "Kiki", min: 100, max: 199 },
    { name: "Lulu", min: 200, max: 299 },
    { name: "Hipo", min: 300, max: 399 },
    { name: "Giga", min: 400, max: Infinity },
  ];

  const currentLevel = levels.find((level) => points >= level.min && points <= level.max) || levels[levels.length - 1];
  const nextLevel = levels.find((level) => level.min > points);

  const maxPoints = currentLevel.max;
  const progressPercentage = nextLevel ? ((points - currentLevel.min) / (maxPoints - currentLevel.min)) * 100 : 100;

  return {
    level: currentLevel.name,
    currentPoints: points,
    maxPoints,
    progressPercentage: progressPercentage > 100 ? 100 : progressPercentage,
  };
};
