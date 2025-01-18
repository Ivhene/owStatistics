import { findAllGames } from "@/lib/API";
import { HeroDataProcessing } from "./HeroDataProcessing";
import { addMatchToMatchup } from "@/functions/addMatchToMatchup";

export default async function HeroDataFetching() {
  const data = await findAllGames();

  if (!data) {
    return <div>Error</div>;
  }

  // const converted = convertNewMatchupToOldType(data);

  const initialMatchups = addMatchToMatchup(data);

  return <HeroDataProcessing data={initialMatchups} />;
}
