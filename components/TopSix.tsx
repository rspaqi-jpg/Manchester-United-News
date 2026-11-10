"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
type Team={position:number;team:string;logo:string|null;played:number|null;goalDifference:number|null;points:number|null};
type Data={rows?:Team[]};
export default function TopSix(){
 const [teams,setTeams]=useState<Team[]>([]);const [updated,setUpdated]=useState("");
 useEffect(()=>{let active=true;const load=async()=>{try{const r=await fetch("/api/standings",{cache:"no-store"});if(!r.ok)throw new Error();const d=await r.json() as Data;if(active&&d.rows){setTeams(d.rows.slice(0,6));setUpdated(new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}));}}catch{}};load();const timer=window.setInterval(load,60000);return()=>{active=false;window.clearInterval(timer)}},[]);
 return <section className="top-six"><div className="top-six-heading"><div><span className="top-six-kicker">ENGLAND · PREMIER LEAGUE</span><h2>Top 6 Teams</h2><p>Race for the top of the table</p></div><Link href="/prltable">PRL TABLE <span>→</span></Link></div><div className="top-six-grid">{teams.length?teams.map(t=><div className={"top-six-card "+(t.team.toLowerCase().includes("manchester united")?"top-six-united":"")} key={t.team}><b className="top-six-rank">{t.position}</b>{t.logo?<img src={t.logo} alt="" loading="lazy"/>:<span className="top-six-fallback">{t.team.slice(0,1)}</span>}<strong>{t.team}</strong><span className="top-six-points">{t.points??"—"} <small>PTS</small></span><span className="top-six-played">{t.played??"—"} MP</span></div>):<div className="top-six-loading">Loading live top six…</div>}</div><div className="top-six-foot"><span><i/> LIVE STANDINGS</span><span>Updated {updated||"—"} · refreshes every minute</span></div></section>;
}
