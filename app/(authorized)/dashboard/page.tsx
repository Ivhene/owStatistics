import { HeroData } from "@/components/dashboard/HeroData";
import { findAllGames } from "@/lib/API";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const data = await findAllGames();

  return <HeroData data={data} />;
}
