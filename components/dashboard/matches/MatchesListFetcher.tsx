import { findAllGames } from "@/lib/API";
import { MatchesList } from "./MatchesList";

export async function MatchesListFetcher() {
  const matches = await findAllGames();

  if (!matches) {
    return <div>Error</div>;
  }

  // const converted = convertNewMatchupToOldType(matches);

  return <MatchesList matches={matches} />;
}
