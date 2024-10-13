export type Hero = {
  name: string;
  image: string;
  role: string;
};

export type Map = {
  name: string;
  image: string;
  mode: string;
};

export type Player = {
  heroPlayed: Hero;
  groupedWithYou: boolean;
};

export type Match = {
  matchID: number;
  map: Map;
  result: string;
  role: string;
  user1: string;
  matchup: Matchup[];
};

export type MatchToSave = {
  result: string;
  role: string;
  map: string;
  matchup: MatchupToSave[];
};

export type Matchup = {
  matchupID: number;
  heroPlayed: Hero;
  win: boolean;
  enemy1: Player;
  enemy2: Player;
  enemy3: Player;
  enemy4: Player;
  enemy5: Player;
  ally1: Player;
  ally2: Player;
  ally3: Player;
  ally4: Player;
  matchID: number;
};

export type MatchupToSave = {
  heroPlayed: string;
  win: boolean;
  enemy1: string;
  enemy2: string;
  enemy3: string;
  enemy4: string;
  enemy5: string;
  ally1: string;
  ally2: string;
  ally3: string;
  ally4: string;
};

export type MatchupWithMaps = {
  matchupID: number;
  heroPlayed: Hero;
  win: boolean;
  enemy1: Player;
  enemy2: Player;
  enemy3: Player;
  enemy4: Player;
  enemy5: Player;
  ally1: Player;
  ally2: Player;
  ally3: Player;
  ally4: Player;
  match: Match;
};

export type Display = {
  hero: string;
  wins: number;
  losses: number;
};

export type DisplayMap = {
  map: string;
  wins: number;
  losses: number;
  draws: number;
};

export type HeroPlayedData = {
  name: string;
  image: string;
  percentagePlayed: number;
};
