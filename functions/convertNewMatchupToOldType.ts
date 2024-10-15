import { Match, Matchup, newMatch, NewMatchup } from "@/lib/types";

export function convertNewMatchupToOldType(matches: newMatch[]) {
  let converted: Match[] = [];

  matches.forEach((match) =>
    converted.push({
      matchID: match.matchID,
      map: match.map,
      result: match.result,
      groupMembers: match.groupMembers,
      role: match.role,
      user1: match.user1,
      matchup: matchupConverter(match.matchups),
    })
  );

  return converted;
}

function matchupConverter(matchups: NewMatchup[]) {
  let res: Matchup[] = [];

  matchups.forEach((matchup) =>
    res.push({
      matchupID: matchup.matchupID,
      heroPlayed: matchup.heroPlayed,
      win: matchup.win,
      matchID: matchup.matchID,
      ally1: matchup.allies[0],
      ally2: matchup.allies[1],
      ally3: matchup.allies[2],
      ally4: matchup.allies[3],
      enemy1: matchup.enemies[0],
      enemy2: matchup.enemies[1],
      enemy3: matchup.enemies[2],
      enemy4: matchup.enemies[3],
      enemy5: matchup.enemies[4],
    })
  );

  return res;
}
