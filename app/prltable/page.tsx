import type { Metadata } from "next";
import Header from "@/components/Header";
import PremierLeagueTable from "@/components/PremierLeagueTable";

export const metadata: Metadata = {
  title: "PRL Table | United Red",
  description: "Live Premier League table with all 20 clubs, points and form.",
};

export default function PRLTablePage() {
  return <><Header/><main><div className="wrap" style={{paddingTop: "32px", paddingBottom: "48px"}}><PremierLeagueTable/></div></main></>;
}
