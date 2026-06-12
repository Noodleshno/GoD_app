export interface PlayerProgression {
  level: number;
  rank: string;
  xp: number;
  maxXp: number;
  gamesToNextLevel: number;
}

const LEVELS = [
  { level: 1, rank: "Rookie", minGames: 0, nextGames: 6 },
  { level: 2, rank: "Racer", minGames: 6, nextGames: 21 },
  { level: 3, rank: "Pilot", minGames: 21, nextGames: 51 },
  { level: 4, rank: "Ace", minGames: 51, nextGames: 101 },
  { level: 5, rank: "Legend", minGames: 101, nextGames: null },
];

const XP_PER_GAME = 100;

export function getPlayerProgression(totalGames: number): PlayerProgression {
  const currentLevel = [...LEVELS]
    .reverse()
    .find(level => totalGames >= level.minGames) ?? LEVELS[0];

  const xp = totalGames * XP_PER_GAME;

  if (currentLevel.nextGames === null) {
    return {
      level: currentLevel.level,
      rank: currentLevel.rank,
      xp,
      maxXp: xp,
      gamesToNextLevel: 0,
    };
  }

  return {
    level: currentLevel.level,
    rank: currentLevel.rank,
    xp,
    maxXp: currentLevel.nextGames * XP_PER_GAME,
    gamesToNextLevel: currentLevel.nextGames - totalGames,
  };
}
