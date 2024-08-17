import { findAllGames } from "@/lib/API";
import { MatchesList } from "./MatchesList";

export async function MatchesListFetcher() {
  const matches = await findAllGames();

  return <MatchesList matches={matches} />;
}
