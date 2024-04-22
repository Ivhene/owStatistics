import { HeroDataProcessing } from "@/components/dashboard/HeroDataProcessing";
import { findAllGames } from "@/lib/API";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const data = await findAllGames();

  return <HeroDataProcessing data={data} />;
}
