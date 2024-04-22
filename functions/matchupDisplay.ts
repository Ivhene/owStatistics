import { Heroes } from "@/lib/constants";
import { Display, Match } from "@/lib/types";

export function displayByRole(role: string, matches: Match[]) {
  const heroes = Heroes.filter((hero) => hero.role === role);

  let display: Display[] = [];

  heroes.forEach((hero) => {
    console.log(hero);
    let wins = 0,
      losses = 0;

    matches.forEach((match) =>
      match.matchup
        .filter((matchups) => matchups.enemy1 === hero.name)
        .forEach((matchups) => (matchups.win ? wins++ : losses++))
    );
    console.log(wins + " " + losses);
    display.push({ hero: hero.image, wins: wins, losses: losses });
  });

  return display;
}
