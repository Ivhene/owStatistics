import { Heroes, Maps } from "@/lib/constants";
import { Display, DisplayMap, Match, MatchupWithMaps } from "@/lib/types";

export function displayByRoleAgainst(
  role: string,
  matchups: MatchupWithMaps[]
) {
  let heroes = Heroes;
  if (role !== "") {
    heroes = Heroes.filter((hero) => hero.role === role);
  }

  let display: Display[] = [];

  heroes.forEach((hero) => {
    let wins = 0,
      losses = 0;

    matchups.forEach((matchup) => {
      if (
        matchup.enemy1 === hero.name ||
        matchup.enemy2 === hero.name ||
        matchup.enemy3 === hero.name ||
        matchup.enemy4 === hero.name ||
        matchup.enemy5 === hero.name
      ) {
        matchup.win ? wins++ : losses++;
      }
    });
    display.push({ hero: hero.image, wins: wins, losses: losses });
  });

  return display;
}

export function displayByRoleWith(role: string, matchups: MatchupWithMaps[]) {
  let heroes = Heroes;
  if (role !== "") {
    heroes = Heroes.filter((hero) => hero.role === role);
  }

  let display: Display[] = [];

  heroes.forEach((hero) => {
    let wins = 0,
      losses = 0;

    matchups.forEach((matchup) => {
      if (
        matchup.ally1 === hero.name ||
        matchup.ally2 === hero.name ||
        matchup.ally3 === hero.name ||
        matchup.ally4 === hero.name
      ) {
        matchup.win ? wins++ : losses++;
      }
    });
    display.push({ hero: hero.image, wins: wins, losses: losses });
  });

  return display;
}

export function displayMaps(maptype: string, role: string, matches: Match[]) {
  let maps = Maps;
  if (maptype !== "") {
    maps = Maps.filter((map) => map.mode === maptype);
  }

  let display: DisplayMap[] = [];

  maps.forEach((map) => {
    let wins = 0,
      losses = 0;

    matches.forEach((match) => {
      if (match.map === map.name) {
        match.win ? wins++ : losses++;
      }
    });
    display.push({ map: map.image, wins: wins, losses: losses });
  });

  return display;
}
