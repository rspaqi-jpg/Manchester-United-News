"use client";

import { useEffect, useState } from "react";

type Standing = {
  position: number;
  team: string;
  logo: string | null;
  played: number | null;
  won: number | null;
  drawn: number | null;
  lost: number | null;
  goalsFor: number | null;
  goalsAgainst: number | null;
  goalDifference: number | null;
  points: number | null;
  form: string | null;
};

type StandingsResponse = { season?: string; updatedAt?: string; rows?: Standing[]; error?: string };

export default function PremierLeagueTable() {
  const [data, setData] = useState<StandingsResponse | null>(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/standings", { cache: "no-store" });
        const result = (await response.json()) as StandingsResponse;
        if (!response.ok || !result.rows?.length) throw new Error(result.error || "Standings unavailable");
        if (active) {
          setData(result);
          setLastUpdated(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
          setError("");
        }
      } catch {
        if (active) setError("Tabela nuk mund të ngarkohet tani. Provo përsëri pas pak.");
      }
    };
    load();
    const timer = window.setInterval(load, 60_000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  return (
    <section className="league-section" id="premier-league">
      <div className="sectionhead">
        <div><h2>Premier League Table</h2><p>{data?.season || "2026/27 Season"} · Auto-refresh every 60 seconds</p></div>
        <span className="tag">LIVE STANDINGS</span>
      </div>
      <div className="league-table-wrap">
        <table className="league-table">
          <thead><tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr></thead>
          <tbody>
            {data?.rows?.map((team) => (
              <tr key={team.team} className={team.team.toLowerCase().includes("manchester united") ? "man-united-row" : ""}>
                <td>{team.position}</td>
                <td className="league-team">
                  {team.logo ? <img className="league-team-logo" src={team.logo} alt="" loading="lazy" /> : null}
                  {team.team}
                </td>
                <td>{team.played ?? "—"}</td><td>{team.won ?? "—"}</td><td>{team.drawn ?? "—"}</td><td>{team.lost ?? "—"}</td>
                <td>{team.goalsFor ?? "—"}</td><td>{team.goalsAgainst ?? "—"}</td>
                <td>{team.goalDifference === null ? "—" : team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                <td className="league-points">{team.points ?? "—"}</td>
              </tr>
            ))}
            {!data && !error ? <tr><td colSpan={10} className="league-status">Loading live standings…</td></tr> : null}
            {error ? <tr><td colSpan={10} className="league-status">{error}</td></tr> : null}
          </tbody>
        </table>
      </div>
      {lastUpdated ? <p className="league-updated">Last checked: {lastUpdated} · Data refreshes automatically</p> : null}
    </section>
  );
}
