import { findGame } from "@/lib/API";
import { MatchDisplay } from "./MatchDisplay";

interface MatchFetcher {
  matchID: number;
}

export async function MatchFetcher({ matchID }: MatchFetcher) {
  const match = await findGame(matchID);

  if (!match) {
    return <div>Match does not exist or you do not have access to match</div>;
  }

  return <MatchDisplay match={match} />;
}
