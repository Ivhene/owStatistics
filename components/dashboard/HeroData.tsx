"use client";
import { displayByRole } from "@/functions/matchupDisplay";
import { Match } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { CategoryTick } from "./CategoryTick";

interface HeroDataProps {
  data: Match[];
}

export function HeroData({ data }: HeroDataProps) {
  const display = displayByRole("tank", data);

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-full h-fit bg-slate-100 m-16">
        <div className="w-full h-24">Filters</div>
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
              {/* Tooltip */}
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
      </div>
    </div>
  );
}
