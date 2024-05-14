import { findAllGames } from "@/lib/API";
import { HeroDataProcessing } from "./HeroDataProcessing";

export default async function HeroDataFetching() {
  const data = await findAllGames();

  return <HeroDataProcessing data={data} />;
}
