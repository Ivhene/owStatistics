"use client";
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
        <div className="w-full h-fit">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={exampleData}>
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

const CategoryTick = (props: any) => {
  console.log(props);
  return (
    <foreignObject x={props.x - 20} y={props.y} width={40} height={40}>
      <img src={props.payload.value} />
    </foreignObject>
  );
};

const exampleData = [
  {
    hero: "/heroImages/winston.webp",
    wins: 8,
    losses: 3,
  },
  {
    hero: "/heroImages/reinhardt.webp",
    wins: 6,
    losses: 4,
  },
  {
    hero: "/heroImages/dva.webp",
    wins: 4,
    losses: 5,
  },
  {
    hero: "/heroImages/roadhog.webp",
    wins: 1,
    losses: 1,
  },
  {
    hero: "/heroImages/doomfist.webp",
    wins: 1,
    losses: 0,
  },
  {
    hero: "/heroImages/orisa.webp",
    wins: 4,
    losses: 4,
  },
  {
    hero: "/heroImages/zarya.webp",
    wins: 2,
    losses: 3,
  },
  {
    hero: "/heroImages/ramattra.webp",
    wins: 2,
    losses: 2,
  },
  {
    hero: "/heroImages/junker-queen.webp",
    wins: 1,
    losses: 4,
  },
  {
    hero: "/heroImages/wrecking-ball.webp",
    wins: 0,
    losses: 1,
  },
  {
    hero: "/heroImages/mauga.webp",
    wins: 2,
    losses: 0,
  },
];
