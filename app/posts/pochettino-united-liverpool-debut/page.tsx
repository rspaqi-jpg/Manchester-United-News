import Link from "next/link";
import Header from "@/components/Header";
import Ad from "@/components/Ad";
import { pochettinoLiverpoolStory as story } from "@/lib/pochettino-liverpool-story";

export const metadata = {
  title: story.title + " | United Red",
  description: story.excerpt,
};

export default function PochettinoLiverpoolArticle() {
  return <><Header/><main className="wrap"><article className="article">
    <div className="tag">{story.category}</div>
    <h1>{story.title}</h1>
    <p className="lead">{story.excerpt}</p>
    <div className="date">{new Date(story.created_at).toLocaleDateString("en-GB", {day:"numeric", month:"long", year:"numeric"})}</div>
    <div className="placeholder articleimg">UNITED</div>
    <Ad label="IN-ARTICLE ADVERTISEMENT"/>
    <div className="content">{story.content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    <div className="content"><p>Sources: <a href="https://www.reuters.com/sports/soccer/pochettino-thrown-deep-end-united-reign-begins-anfield-2026-11-19/" target="_blank" rel="noreferrer">Reuters</a> · <a href="https://www.manutd.com/en/news/liverpool-v-united-how-to-watch-and-follow-pochettinos-first-game-in-charge" target="_blank" rel="noreferrer">Manchester United – official match preview</a>.</p></div>
    <p><Link href="/">← BACK TO LATEST NEWS</Link></p>
  </article></main><footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. All rights reserved. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club.</span></div></footer></>;
}