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

export type Match = {
  matchID: number;
  map: string;
  result: string;
  role: string;
  user1: string;
  matchup: Matchup[];
};

export type Match1 = {
  matchID: number;
  map: string;
  result: string;
  role: string;
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
