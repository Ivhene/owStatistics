"use client";
import { Heroes } from "@/lib/constants";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-full h-fit bg-slate-100 m-16">
        <div className="w-full h-24">Filters</div>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={exampleData}>
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="hero" />
              <YAxis />
              {/* Tooltip */}
              <Legend />
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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const exampleData = [
  {
    hero: "winston",
    wins: 8,
    losses: 3,
  },
  {
    hero: "reinhardt",
    wins: 6,
    losses: 4,
  },
  {
    hero: "d.va",
    wins: 4,
    losses: 5,
  },
  {
    hero: "roadhog",
    wins: 1,
    losses: 1,
  },
  {
    hero: "doomfist",
    wins: 1,
    losses: 0,
  },
  {
    hero: "orisa",
    wins: 4,
    losses: 4,
  },
  {
    hero: "zarya",
    wins: 2,
    losses: 3,
  },
  {
    hero: "rammatra",
    wins: 2,
    losses: 2,
  },
  {
    hero: "junker queen",
    wins: 1,
    losses: 4,
  },
  {
    hero: "wrecking ball",
    wins: 0,
    losses: 1,
  },
  {
    hero: "mauga",
    wins: 2,
    losses: 0,
  },
];
