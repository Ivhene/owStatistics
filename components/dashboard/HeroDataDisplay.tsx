import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoryTick } from "./CategoryTick";
import { displayByRole } from "@/functions/matchupDisplay";
import { Heroes } from "@/lib/constants";
import { Match, Matchup } from "@/lib/types";

interface HeroDataDisplayProps {
  data: Matchup[];
}

export default function HeroDataDisplay({ data }: HeroDataDisplayProps) {
  const display = displayByRole("tank", data);

  function CustomTooltip() {
    let allied: number[] = [];
    let enemy: number[] = [];

    for (let i = 0; i < Heroes.length; i++) {
      allied[i] = 0;
      enemy[i] = 0;
    }

    data.forEach((matchup) => {
      for (let i = 0; i < Heroes.length; i++) {
        if (
          matchup.ally1 === Heroes[i].name ||
          matchup.ally2 === Heroes[i].name ||
          matchup.ally3 === Heroes[i].name ||
          matchup.ally4 === Heroes[i].name
        ) {
          allied[i]++;
        }

        if (
          matchup.enemy1 === Heroes[i].name ||
          matchup.enemy2 === Heroes[i].name ||
          matchup.enemy3 === Heroes[i].name ||
          matchup.enemy4 === Heroes[i].name ||
          matchup.enemy5 === Heroes[i].name
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

    return (
      <div className="grid grid-cols-4 gap-2 bg-white p-2">{display()}</div>
    );
  }
  return (
    <div className="w-full h-fit">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={display}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="hero"
            interval={0}
            height={60}
            tick={<CategoryTick />}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" />
          <Bar
            dataKey="wins"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="losses"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
