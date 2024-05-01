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
import { MatchupWithMaps } from "@/lib/types";
import { CustomTooltip } from "./CustomTooltip";

interface HeroDataDisplayProps {
  data: MatchupWithMaps[];
  role: string;
}

export default function HeroDataDisplay({ data, role }: HeroDataDisplayProps) {
  const display = displayByRole(role, data);

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
          <Tooltip content={<CustomTooltip matchups={data} />} />
          <Legend verticalAlign="top" />
          <Bar
            dataKey="wins"
            fill="#33BB33"
            activeBar={<Rectangle fill="green" stroke="green" />}
          />
          <Bar
            dataKey="losses"
            fill="#FF3333"
            activeBar={<Rectangle fill="red" stroke="red" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
