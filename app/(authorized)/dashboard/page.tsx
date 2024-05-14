import { HeroDataProcessing } from "@/components/dashboard/HeroDataProcessing";
import { findAllGames } from "@/lib/API";

export default async function DashboardPage() {
  const data = await findAllGames();

  return <HeroDataProcessing data={data} />;
}
