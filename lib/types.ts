export type Hero = {
  heroID: number;
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
  map: Map;
  result: string;
  role: string;
  user1: string;
  matchup: Matchup[];
  groupMembers: GroupMember[];
};

export type newMatch = {
  matchID: number;
  map: Map;
  result: string;
  role: string;
  user1: string;
  matchups: NewMatchup[];
  groupMembers: GroupMember[];
};

export type NewMatchup = {
  matchupID: number;
  heroPlayed: Hero;
  win: boolean;
  enemies: Hero[];
  allies: Hero[];
  matchID: number;
};

export type GroupMember = {
  groupMemberID: number;
  allyNumber: number;
  role: string;
  gameID: number;
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
  enemy1: Hero;
  enemy2: Hero;
  enemy3: Hero;
  enemy4: Hero;
  enemy5: Hero;
  ally1: Hero;
  ally2: Hero;
  ally3: Hero;
  ally4: Hero;
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
