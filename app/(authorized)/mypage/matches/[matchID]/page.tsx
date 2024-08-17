import { MatchFetcher } from "@/components/dashboard/matchPage/MatchFetcher";

export default function MatchPage({ params }: { params: { matchID: string } }) {
  const matchID = params.matchID;

  return <MatchFetcher matchID={parseInt(matchID)} />;
}
