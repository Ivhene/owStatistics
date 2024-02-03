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
  matchId: number;
  win: boolean;
  map: string;
};

export type Matchup = {
  matchupId: number;
  heroPlayed: Hero;
  win: boolean;
  enemy1: Hero;
  enemy2: Hero;
  enemy3: Hero;
  enemy4: Hero;
  enemy5: Hero;
  ally1: Hero;
  ally2: Hero;
  ally3: Hero;
  ally4: Hero;
  match: Match;
};
