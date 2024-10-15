import { findAllHeroes } from "@/lib/API";
import { MatchupWithMaps } from "@/lib/types";

export function filterByHero(
  hero: string,
  target: string,
  matchups: MatchupWithMaps[]
) {
  /*if (target === "you") {
    return filterHeroYouTarget(hero, matchups);
  }
  if (target === "others") {
    return filterHeroOthersTarget(hero, matchups);
  }

  return [
    ...filterHeroYouTarget(hero, matchups),
    ...filterHeroOthersTarget(hero, matchups),
  ]; */
  return (matchups = matchups.filter(
    (matchup) => matchup.heroPlayed.name === hero
  ));
}

function filterHeroYouTarget(hero: string, matchups: MatchupWithMaps[]) {
  return (matchups = matchups.filter(
    (matchup) => matchup.heroPlayed.name === hero
  ));
}

function filterHeroOthersTarget(hero: string, matchups: MatchupWithMaps[]) {
  let newMatchups: MatchupWithMaps[] = [];
  matchups.forEach((matchup) => {
    if (
      matchup.ally1.name === hero ||
      matchup.ally2.name === hero ||
      matchup.ally3.name === hero ||
      matchup.ally4.name === hero
    ) {
      let newMatchup: MatchupWithMaps = matchup;
      if (matchup.ally1.name === hero) {
        newMatchup.heroPlayed = matchup.ally1;
        newMatchup.ally1 = matchup.heroPlayed;
      }
      if (matchup.ally2.name === hero) {
        newMatchup.heroPlayed = matchup.ally2;
        newMatchup.ally2 = matchup.heroPlayed;
      }
      if (matchup.ally3.name === hero) {
        newMatchup.heroPlayed = matchup.ally3;
        newMatchup.ally3 = matchup.heroPlayed;
      }
      if (matchup.ally4.name === hero) {
        newMatchup.heroPlayed = matchup.ally4;
        newMatchup.ally4 = matchup.heroPlayed;
      }
      newMatchups.push(newMatchup);
    }
    if (
      matchup.enemy1.name === hero ||
      matchup.enemy2.name === hero ||
      matchup.enemy3.name === hero ||
      matchup.enemy4.name === hero ||
      matchup.enemy4.name === hero
    ) {
      let newMatchup: MatchupWithMaps = matchup;
      if (matchup.enemy1.name === hero) {
        newMatchup.heroPlayed = matchup.enemy1;
        newMatchup.enemy1 = matchup.heroPlayed;
        newMatchup.ally1 = matchup.enemy2;
        newMatchup.enemy2 = matchup.ally1;
        newMatchup.ally2 = matchup.enemy3;
        newMatchup.enemy3 = matchup.ally2;
        newMatchup.ally3 = matchup.enemy4;
        newMatchup.enemy4 = matchup.ally3;
        newMatchup.ally4 = matchup.enemy5;
        newMatchup.enemy5 = matchup.ally4;
      }
      if (matchup.enemy2.name === hero) {
        newMatchup.heroPlayed = matchup.enemy2;
        newMatchup.enemy1 = matchup.heroPlayed;
        newMatchup.ally1 = matchup.enemy2;
        newMatchup.enemy2 = matchup.ally1;
        newMatchup.ally2 = matchup.enemy3;
        newMatchup.enemy3 = matchup.ally2;
        newMatchup.ally3 = matchup.enemy4;
        newMatchup.enemy4 = matchup.ally3;
        newMatchup.ally4 = matchup.enemy5;
        newMatchup.enemy5 = matchup.ally4;
      }
      if (matchup.enemy3.name === hero) {
        newMatchup.heroPlayed = matchup.enemy3;
        newMatchup.enemy1 = matchup.heroPlayed;
        newMatchup.ally1 = matchup.enemy2;
        newMatchup.enemy2 = matchup.ally1;
        newMatchup.ally2 = matchup.enemy3;
        newMatchup.enemy3 = matchup.ally2;
        newMatchup.ally3 = matchup.enemy4;
        newMatchup.enemy4 = matchup.ally3;
        newMatchup.ally4 = matchup.enemy5;
        newMatchup.enemy5 = matchup.ally4;
      }
      if (matchup.enemy4.name === hero) {
        newMatchup.heroPlayed = matchup.enemy4;
        newMatchup.enemy1 = matchup.heroPlayed;
        newMatchup.ally1 = matchup.enemy2;
        newMatchup.enemy2 = matchup.ally1;
        newMatchup.ally2 = matchup.enemy3;
        newMatchup.enemy3 = matchup.ally2;
        newMatchup.ally3 = matchup.enemy4;
        newMatchup.enemy4 = matchup.ally3;
        newMatchup.ally4 = matchup.enemy5;
        newMatchup.enemy5 = matchup.ally4;
      }
      if (matchup.enemy5.name === hero) {
        newMatchup.heroPlayed = matchup.enemy5;
        newMatchup.enemy1 = matchup.heroPlayed;
        newMatchup.ally1 = matchup.enemy2;
        newMatchup.enemy2 = matchup.ally1;
        newMatchup.ally2 = matchup.enemy3;
        newMatchup.enemy3 = matchup.ally2;
        newMatchup.ally3 = matchup.enemy4;
        newMatchup.enemy4 = matchup.ally3;
        newMatchup.ally4 = matchup.enemy5;
        newMatchup.enemy5 = matchup.ally4;
      }
      newMatchups.push(newMatchup);
    }
  });
  return newMatchups;
}
