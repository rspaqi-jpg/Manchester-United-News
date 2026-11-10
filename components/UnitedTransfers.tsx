"use client";

import { useEffect, useState } from "react";

type TransferNews = { title: string; url: string; source: string; publishedAt: string };
type Feed = { items?: TransferNews[]; checkedAt?: string; error?: string };

const arrivals = [
  ["Carlos Baleba", "Brighton & Hove Albion", "Permanent"],
  ["Andrey Santos", "Chelsea", "Permanent"],
  ["Youri Tielemans", "Aston Villa", "Permanent"],
  ["Tynan Thompson", "Tottenham Hotspur", "Permanent"],
  ["Cristian Orozco", "Fortaleza CEIF", "Permanent"],
  ["Karl Darlow", "Leeds United", "Free transfer"],
  ["Kit Margetson", "Swansea City", "Free transfer"],
];

const departures = [
  ["Casemiro", "Inter Miami", "Free transfer"],
  ["Rasmus Højlund", "Napoli", "Permanent"],
  ["Toby Collyer", "West Bromwich Albion", "Permanent"],
  ["Radek Vítek", "Middlesbrough", "Permanent"],
  ["Tyler Fredricson", "Lausanne-Sport", "Permanent"],
  ["Ethan Williams", "Peterborough United", "Permanent"],
  ["Sonny Aljofree", "Rotherham United", "Free transfer"],
  ["Ethan Ennis", "Stockport County", "Permanent"],
  ["James Bailey", "Stockport County", "Free transfer"],
  ["Gabriele Biancheri", "FC Wacker Innsbruck", "Permanent"],
  ["Louie Bradbury", "Stoke City", "Permanent"],
  ["Louis Jackson", "St Mirren", "Permanent"],
  ["Habeeb Ogunneye", "Arsenal", "Permanent"],
  ["James Scanlon", "Arsenal", "Permanent"],
  ["James Overy", "Sydney FC", "Permanent"],
  ["Tyrell Malacia", "Cincinnati", "Permanent"],
  ["Altay Bayındır", "Celta Vigo", "Loan"],
  ["André Onana", "Trabzonspor", "Loan"],
  ["Sekou Kone", "Lausanne-Sport", "Loan"],
  ["Jacob Devaney", "Hibernian", "Loan"],
  ["Dan Gore", "Luton Town", "Loan"],
  ["Elyh Harrison", "Greenock Morton", "Loan"],
  ["Jack Moorhouse", "Dundee", "Loan"],
  ["Chido Obi", "Willem II", "Loan"],
  ["Ethan Wheatley", "Lincoln City", "Loan"],
  ["Jayce Fitzgerald", "Rotherham United", "Loan"],
  ["Solomon Honor", "Southport", "Loan"],
  ["Finley McAllister", "Radcliffe FC", "Loan"],
  ["Will Murdock", "Hednesford Town", "Youth loan"],
  ["Malachi Sharpe", "Released", "Contract expired"],
  ["Jadon Sancho", "Released", "Contract expired"],
];

export default function UnitedTransfers() {
  const [tab, setTab] = useState<"in" | "out">("in");
  const [feed, setFeed] = useState<Feed | null>(null);
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/transfers", { cache: "no-store" });
        const result = (await response.json()) as Feed;
        if (active) setFeed(result);
      } catch { /* keep confirmed transfer list visible */ }
    };
    load();
    const timer = window.setInterval(load, 600_000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  const rows = tab === "in" ? arrivals : departures;
  return <section className="transfers-section" id="united-transfers">
    <div className="transfer-heading">
      <div><span className="transfer-kicker">OLD TRAFFORD · 2026/27</span><h2>Manchester United Transfers</h2><p>Confirmed moves for the 2026 summer window</p></div>
      <span className="live-pill"><i/> LIVE UPDATES</span>
    </div>
    <div className="transfer-tabs">
      <button className={tab === "in" ? "active" : ""} onClick={() => setTab("in")}>INCOMING <b>{arrivals.length}</b></button>
      <button className={tab === "out" ? "active" : ""} onClick={() => setTab("out")}>OUTGOING <b>{departures.length}</b></button>
    </div>
    <div className="transfer-table-wrap"><table className="transfer-table">
      <thead><tr><th>PLAYER</th><th>{tab === "in" ? "FROM" : "TO"}</th><th>DEAL</th></tr></thead>
      <tbody>{rows.map(([player, club, type]) => <tr key={player}><td><strong>{player}</strong></td><td>{club}</td><td><span className="deal-tag">{type}</span></td></tr>)}</tbody>
    </table></div>
    <div className="transfer-source">Confirmed list: Manchester United official club update · Summer 2026</div>
    <div className="transfer-news">
      <div className="transfer-news-title"><div><span className="transfer-kicker">LATEST REPORTS</span><h3>Transfer news wire</h3></div><span className="feed-refresh">AUTO-REFRESH · 10 MIN</span></div>
      {feed?.items?.length ? <div className="transfer-news-list">{feed.items.slice(0,8).map((item,i) => <a href={item.url} target="_blank" rel="noreferrer" key={item.url} className="transfer-news-item"><span className="news-number">{String(i+1).padStart(2,"0")}</span><span className="news-copy"><strong>{item.title}</strong><small>{item.source}{item.publishedAt ? " · " + new Date(item.publishedAt).toLocaleDateString("en-GB") : ""}</small></span><span className="news-arrow">↗</span></a>)}</div> : <p className="feed-empty">{feed?.error || "Loading latest transfer reports…"}</p>}
      <p className="transfer-disclaimer">News reports may include rumours. Only the confirmed list above represents completed club business.</p>
    </div>
  </section>;
}
