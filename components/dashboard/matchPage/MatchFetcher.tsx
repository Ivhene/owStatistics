import { findGame, findMapByName } from "@/lib/API";
import { MatchDisplay } from "./MatchDisplay";

interface MatchFetcher {
  matchID: number;
}

export async function MatchFetcher({ matchID }: MatchFetcher) {
  const match = await findGame(matchID);

  if (!match) {
    return <div>Match does not exist or you do not have access to match</div>;
  }

  match.matchups.sort((a, b) => a.order - b.order);

  const map = await findMapByName(match.map);

  // const converted = convertNewMatchupToOldType([match]);

  return <MatchDisplay match={match} map={map} />;
}
