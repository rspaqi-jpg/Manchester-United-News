import type { Metadata } from "next";
import Header from "@/components/Header";
import PremierLeagueTable from "@/components/PremierLeagueTable";

export const metadata: Metadata = {
  title: "Premier League Table | United Red",
  description: "Live Premier League standings, results form and points table.",
};

export default function PremierLeaguePage() {
  return <><Header/><main><div className="wrap" style={{paddingTop: "32px", paddingBottom: "48px"}}><PremierLeagueTable/></div></main></>;
}
