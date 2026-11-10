type EspnStat = { name?: string; displayValue?: string; value?: number };
type EspnEntry = {
  team?: { id?: string; displayName?: string; name?: string; logos?: { href?: string }[] };
  stats?: EspnStat[];
  note?: { rank?: number; description?: string };
  [key: string]: unknown;
};

function findEntries(value: unknown): EspnEntry[] {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findEntries(item);
      if (found.length) return found;
    }
    return [];
  }
  const obj = value as Record<string, unknown>;
  const standings = obj.standings as Record<string, unknown> | undefined;
  if (standings && Array.isArray(standings.entries)) return standings.entries as EspnEntry[];
  for (const child of Object.values(obj)) {
    const found = findEntries(child);
    if (found.length) return found;
  }
  return [];
}

function stat(entry: EspnEntry, names: string[]) {
  const item = (entry.stats || []).find((s) => names.includes(s.name || ""));
  if (!item) return null;
  if (typeof item.value === "number") return item.value;
  const parsed = Number(item.displayValue);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function GET() {
  try {
    const response = await fetch("https://site.api.espn.com/apis/v2/sports/soccer/eng.1/standings", {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return Response.json({ error: "Standings provider unavailable" }, { status: 502 });
    }
    const data = await response.json();
    const entries = findEntries(data);
    if (!entries.length) {
      return Response.json({ error: "Standings data is temporarily unavailable" }, { status: 502 });
    }

    const rows = entries.map((entry, index) => ({
      position: stat(entry, ["rank", "leagueRank"]) ?? entry.note?.rank ?? index + 1,
      team: entry.team?.displayName || entry.team?.name || "Unknown team",
      logo: entry.team?.logos?.[0]?.href || null,
      played: stat(entry, ["gamesPlayed", "played"]),
      won: stat(entry, ["wins", "won"]),
      drawn: stat(entry, ["ties", "draws", "drawn"]),
      lost: stat(entry, ["losses", "lost"]),
      goalsFor: stat(entry, ["pointsFor", "goalsFor", "goals_scored"]),
      goalsAgainst: stat(entry, ["pointsAgainst", "goalsAgainst", "goals_conceded"]),
      goalDifference: stat(entry, ["pointDifferential", "goalDifference", "goal_difference"]),
      points: stat(entry, ["points"]),
      form: entry.stats?.find((s) => s.name === "currentForm")?.displayValue || null,
    }));

    rows.sort((a, b) => a.position - b.position);
    return Response.json(
      { season: data.season?.displayName || "Premier League", updatedAt: new Date().toISOString(), rows },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" } }
    );
  } catch {
    return Response.json({ error: "Could not load Premier League standings" }, { status: 502 });
  }
}
