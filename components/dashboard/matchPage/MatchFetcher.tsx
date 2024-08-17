import { findGame } from "@/lib/API";

interface MatchFetcher {
  matchID: number;
}

export async function MatchFetcher({ matchID }: MatchFetcher) {
  const match = await findGame(matchID);

  console.log(match);

  if (!match) {
    return <div>Match does not exist or you do not have access to match</div>;
  }

  return <div>TEMP</div>;
}
