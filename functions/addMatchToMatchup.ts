import { findAllGames } from "@/lib/API";
import { Match, Matchup, MatchupWithMaps } from "@/lib/types";
import { findHeroByName } from "./findNonAsync";

export function addMatchToMatchup(matches: Match[]) {
  let matchups: MatchupWithMaps[] = [];

  matches.forEach((match) =>
    match.matchups.forEach(async (matchup) => {
      matchups.push({
        matchupID: matchup.matchupID,
        heroPlayed: findHeroByName(matchup.heroPlayed),
        win: matchup.win,
        ally1: findHeroByName(matchup.ally1),
        ally2: findHeroByName(matchup.ally2),
        ally3: findHeroByName(matchup.ally3),
        ally4: findHeroByName(matchup.ally4),
        enemy1: findHeroByName(matchup.enemy1),
        enemy2: findHeroByName(matchup.enemy2),
        enemy3: findHeroByName(matchup.enemy3),
        enemy4: findHeroByName(matchup.enemy4),
        enemy5: findHeroByName(matchup.enemy5),
        match: match,
      });
    })
  );

  return matchups;
}

export function addMatchToMatchupSingle(match: Match) {
  let matchups: MatchupWithMaps[] = [];

  match.matchups.forEach(async (matchup) => {
    matchups.push({
      matchupID: matchup.matchupID,
      heroPlayed: findHeroByName(matchup.heroPlayed),
      win: matchup.win,
      ally1: findHeroByName(matchup.ally1),
      ally2: findHeroByName(matchup.ally2),
      ally3: findHeroByName(matchup.ally3),
      ally4: findHeroByName(matchup.ally4),
      enemy1: findHeroByName(matchup.enemy1),
      enemy2: findHeroByName(matchup.enemy2),
      enemy3: findHeroByName(matchup.enemy3),
      enemy4: findHeroByName(matchup.enemy4),
      enemy5: findHeroByName(matchup.enemy5),
      match: match,
    });
  });

  return matchups;
}

export async function addMatchToMatchups(matchups: Matchup[]) {
  let matchupsWithMatch: MatchupWithMaps[] = [];
  const games = await findAllGames();

  matchups.forEach(async (matchup) => {
    matchupsWithMatch.push({
      matchupID: matchup.matchupID,
      heroPlayed: findHeroByName(matchup.heroPlayed),
      win: matchup.win,
      ally1: findHeroByName(matchup.ally1),
      ally2: findHeroByName(matchup.ally2),
      ally3: findHeroByName(matchup.ally3),
      ally4: findHeroByName(matchup.ally4),
      enemy1: findHeroByName(matchup.enemy1),
      enemy2: findHeroByName(matchup.enemy2),
      enemy3: findHeroByName(matchup.enemy3),
      enemy4: findHeroByName(matchup.enemy4),
      enemy5: findHeroByName(matchup.enemy5),
      match: games?.find((match) => match.matchID === matchup.matchID) ?? {
        matchID: -1,
        map: "",
        matchups: [],
        result: "",
        user1: "",
        role: "",
      },
    });
  });

  return matchupsWithMatch;
}
