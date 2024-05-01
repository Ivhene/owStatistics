import { Match, MatchupWithMaps } from "@/lib/types";

export function addMatchToMatchup(matches: Match[]) {
  let matchups: MatchupWithMaps[] = [];

  matches.forEach((match) =>
    match.matchup.forEach((matchup) => {
      matchups.push({
        matchupID: matchup.matchupID,
        heroPlayed: matchup.heroPlayed,
        win: matchup.win,
        ally1: matchup.ally1,
        ally2: matchup.ally2,
        ally3: matchup.ally3,
        ally4: matchup.ally4,
        enemy1: matchup.enemy1,
        enemy2: matchup.enemy2,
        enemy3: matchup.enemy3,
        enemy4: matchup.enemy4,
        enemy5: matchup.enemy5,
        match: match,
      });
    })
  );

  return matchups;
}
