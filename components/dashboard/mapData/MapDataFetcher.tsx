import { findAllGames } from "@/lib/API";
import { HeroDataProcessing } from "../heroData/HeroDataProcessing";
import { MapDataProcessing } from "./MapDataProcessing";

export default async function MapDataFetching() {
  let data = await findAllGames();

  return <MapDataProcessing data={data} />;
}
