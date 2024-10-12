import { Match, MatchToSave, Matchup, MatchupToSave } from "./types";

let rollingMatchID = 1;
let rollingMatchupID = 1;

let testData: Match[] = [];

export function getAllMatches() {
  return testData;
}

export function getAllMatchesByUser(user: string) {
  return testData.filter((match) => match.user1 === user);
}

export function getMatch(matchID: number) {
  return testData.find((match) => match.matchID === matchID);
}

export function addMatch(match: MatchToSave, user: string) {
  const newMatch: Match = {
    ...match,
    matchID: rollingMatchID,
    user1: user,
    matchup: [],
  };

  testData.push(newMatch);
  rollingMatchID++;

  return newMatch;
}

export function addMatchupToMatch(matchID: number, matchup: MatchupToSave) {
  const newMatchup: Matchup = {
    ...matchup,
    matchID: matchID,
    matchupID: rollingMatchupID,
  };

  testData.find((match) => match.matchID === matchID)?.matchup.push(newMatchup);
  rollingMatchupID++;
}

export function deleteAllMatchesByUser(user: string) {
  testData = testData.filter((match) => match.user1 === user);
}

export function deleteMatch(match: Match) {
  const index = testData.indexOf(match);

  if (index !== -1) {
    testData.splice(index, 1);
  }
}
