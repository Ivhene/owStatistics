import { Heroes } from "@/lib/constants";
import { HeroPlayedData, Matchup } from "@/lib/types";

export function convertHeroPlayedData(matchups: Matchup[]) {
  const matchupCount = matchups.length;

  const heroPlayedData: HeroPlayedData[] = [];

  Heroes.forEach((hero) => {
    let count = 0;
    matchups.forEach((matchup) => {
      if (matchup.heroPlayed === hero.name) {
        count++;
      }
    });

    if (count > 0) {
      heroPlayedData.push({
        name: hero.name,
        image: hero.image,
        percentagePlayed: (count / matchupCount) * 100,
      });
    }
  });

  return heroPlayedData;
}
