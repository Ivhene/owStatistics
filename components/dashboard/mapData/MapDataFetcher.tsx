import { findAllGames } from "@/lib/API";
import { HeroDataProcessing } from "../heroData/HeroDataProcessing";
import { MapDataProcessing } from "./MapDataProcessing";
import { convertNewMatchupToOldType } from "@/functions/convertNewMatchupToOldType";

export default async function MapDataFetching() {
  let data = await findAllGames();

  const converted = convertNewMatchupToOldType(data);

  return <MapDataProcessing data={converted} />;
}
