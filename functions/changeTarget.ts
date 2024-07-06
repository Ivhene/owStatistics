import { MatchupWithMaps } from "@/lib/types";

export function changeTarget(target: string, matchups: MatchupWithMaps[]) {
  if (target === "you") return matchups;

  if (target === "others") return findOthers(matchups);

  if (target === "teamIncludingYou") return findTeam(matchups, true);

  if (target === "teamExcludingYou") return findTeam(matchups, false);

  if (target === "enemy") return findEnemyTeam(matchups);

  return [...matchups, ...findOthers(matchups)];
}

function findTeam(matchups: MatchupWithMaps[], includeYou: boolean) {
  let newMatchups: MatchupWithMaps[] = [];

  matchups.forEach((matchup) => {
    includeYou ? newMatchups.push(matchup) : null;
    newMatchups.push(addAlly1(matchup));
    newMatchups.push(addAlly2(matchup));
    newMatchups.push(addAlly3(matchup));
    newMatchups.push(addAlly4(matchup));
  });

  return newMatchups;
}

function findEnemyTeam(matchups: MatchupWithMaps[]) {
  let newMatchups: MatchupWithMaps[] = [];

  matchups.forEach((matchup) => {
    newMatchups.push(addEnemy1(matchup));
    newMatchups.push(addEnemy2(matchup));
    newMatchups.push(addEnemy3(matchup));
    newMatchups.push(addEnemy4(matchup));
    newMatchups.push(addEnemy5(matchup));
  });

  return newMatchups;
}

function findOthers(matchups: MatchupWithMaps[]) {
  let newMatchups: MatchupWithMaps[] = [];

  matchups.forEach((matchup) => {
    newMatchups.push(addAlly1(matchup));
    newMatchups.push(addAlly2(matchup));
    newMatchups.push(addAlly3(matchup));
    newMatchups.push(addAlly4(matchup));
    newMatchups.push(addEnemy1(matchup));
    newMatchups.push(addEnemy2(matchup));
    newMatchups.push(addEnemy3(matchup));
    newMatchups.push(addEnemy4(matchup));
    newMatchups.push(addEnemy5(matchup));
  });

  return newMatchups;
}

function addAlly1(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally1,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    ally1: matchup.heroPlayed,
    ally2: matchup.ally2,
    ally3: matchup.ally3,
    ally4: matchup.ally4,
    match: matchup.match,
  };
}

function addAlly2(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally2,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    ally1: matchup.ally1,
    ally2: matchup.heroPlayed,
    ally3: matchup.ally3,
    ally4: matchup.ally4,
    match: matchup.match,
  };
}

function addAlly3(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally3,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    ally1: matchup.ally1,
    ally2: matchup.ally2,
    ally3: matchup.heroPlayed,
    ally4: matchup.ally4,
    match: matchup.match,
  };
}

function addAlly4(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally4,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    ally1: matchup.ally1,
    ally2: matchup.ally2,
    ally3: matchup.ally3,
    ally4: matchup.heroPlayed,
    match: matchup.match,
  };
}

function addEnemy1(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy1,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    ally1: matchup.enemy2,
    ally2: matchup.enemy3,
    ally3: matchup.enemy4,
    ally4: matchup.enemy5,
    match: matchup.match,
  };
}

function addEnemy2(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy2,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    ally1: matchup.enemy1,
    ally2: matchup.enemy3,
    ally3: matchup.enemy4,
    ally4: matchup.enemy5,
    match: matchup.match,
  };
}

function addEnemy3(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy3,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    ally1: matchup.enemy2,
    ally2: matchup.enemy1,
    ally3: matchup.enemy4,
    ally4: matchup.enemy5,
    match: matchup.match,
  };
}

function addEnemy4(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy4,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    ally1: matchup.enemy2,
    ally2: matchup.enemy3,
    ally3: matchup.enemy1,
    ally4: matchup.enemy5,
    match: matchup.match,
  };
}

function addEnemy5(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy5,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    ally1: matchup.enemy2,
    ally2: matchup.enemy3,
    ally3: matchup.enemy4,
    ally4: matchup.enemy1,
    match: matchup.match,
  };
}
