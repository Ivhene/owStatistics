import { MatchFetcher } from "@/components/dashboard/matchPage/MatchFetcher";

export default async function MatchPage(props: { params: Promise<{ matchID: string }> }) {
  const params = await props.params;
  const matchID = params.matchID;

  return <MatchFetcher matchID={parseInt(matchID)} />;
}
