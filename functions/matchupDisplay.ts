import { Heroes } from "@/lib/constants";
import { Display, MatchupWithMaps } from "@/lib/types";

// For opposing tanks
export function displayByRole(role: string, matchups: MatchupWithMaps[]) {
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
