import { findAllGames } from "@/lib/API";
import { MatchesList } from "./MatchesList";
import { convertNewMatchupToOldType } from "@/functions/convertNewMatchupToOldType";

export async function MatchesListFetcher() {
  const matches = await findAllGames();

  const converted = convertNewMatchupToOldType(matches);

  return <MatchesList matches={converted} />;
}
