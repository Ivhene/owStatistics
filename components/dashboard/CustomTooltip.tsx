import { Heroes } from "@/lib/constants";
import { MatchupWithMaps } from "@/lib/types";

export function CustomTooltip({ matchups }: { matchups: MatchupWithMaps[] }) {
  let allied: number[] = [];
  let enemy: number[] = [];

  for (let i = 0; i < Heroes.length; i++) {
    allied[i] = 0;
    enemy[i] = 0;
  }

  matchups.forEach((matchup) => {
    for (let i = 0; i < Heroes.length; i++) {
      if (
        matchup.ally1.name === Heroes[i].name ||
        matchup.ally2.name === Heroes[i].name ||
        matchup.ally3.name === Heroes[i].name ||
        matchup.ally4.name === Heroes[i].name
      ) {
        allied[i]++;
      }

      if (
        matchup.enemy1.name === Heroes[i].name ||
        matchup.enemy2.name === Heroes[i].name ||
        matchup.enemy3.name === Heroes[i].name ||
        matchup.enemy4.name === Heroes[i].name ||
        matchup.enemy5.name === Heroes[i].name
      ) {
        enemy[i]++;
      }
    }
  });

  function display() {
    let res = [];
    for (let i = 0; i < Heroes.length; i++) {
      res.push(
        <div className="flex">
          <img className="w-8 h-8" src={Heroes[i].image} />:{allied[i]}/
          {enemy[i]}
        </div>
      );
    }
    return res;
  }

  return <div className="grid grid-cols-4 gap-2 bg-white p-2">{display()}</div>;
}
