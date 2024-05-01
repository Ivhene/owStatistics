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
  win: boolean;
  map: string;
  matchup: Matchup[];
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
