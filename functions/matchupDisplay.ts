import { Heroes } from "@/lib/constants";
import { Display, Match, Matchup } from "@/lib/types";

// For opposing tanks
export function displayByRole(role: string, matchups: Matchup[]) {
  const heroes = Heroes.filter((hero) => hero.role === role);

  let display: Display[] = [];

  heroes.forEach((hero) => {
    let wins = 0,
      losses = 0;

    matchups.forEach((matchup) => {
      if (matchup.enemy1 === hero.name) {
        matchup.win ? wins++ : losses++;
      }
    });
    display.push({ hero: hero.image, wins: wins, losses: losses });
  });

  return display;
}
