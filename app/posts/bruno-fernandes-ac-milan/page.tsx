import Link from "next/link";
import Header from "@/components/Header";
import Ad from "@/components/Ad";
import { brunoFernandesStory as story } from "@/lib/bruno-fernandes-story";

export const metadata = {
  title: story.title + " | United Red",
  description: story.excerpt,
};

export default function BrunoFernandesArticle() {
  return <><Header/><main className="wrap"><article className="article">
    <div className="tag">{story.category}</div>
    <h1>{story.title}</h1>
    <p className="lead">{story.excerpt}</p>
    <div className="date">{new Date(story.created_at).toLocaleDateString("en-GB", {day:"numeric", month:"long", year:"numeric"})}</div>
    <div className="placeholder articleimg">UNITED</div>
    <Ad label="IN-ARTICLE ADVERTISEMENT"/>
    <div className="content">{story.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    <div className="content"><p>Read the original reports: <a href="https://www.skysports.com/football/news/13611749/bruno-fernandes-transfer-news-manchester-united-captain-rejects-second-contract-offer" target="_blank" rel="noreferrer">Sky Sports</a> · <a href="https://tribuna.com/en/news/2026-11-18-ac-milan-keeping-close-eye-on-bruno-fernandes-as-man-united-contract-talks-stall/" target="_blank" rel="noreferrer">Tribuna</a> · <a href="https://utdreport.co.uk/2026/11/18/bruno-fernandes-already-knows-where-he-wants-to-move-after-leaving-united-as-two-clubs-make-enquiries/amp/" target="_blank" rel="noreferrer">UtdReport</a> · <a href="https://milanreports.com/2026/11/19/milan-another-modric-fernandes/" target="_blank" rel="noreferrer">MilanReports</a>.</p></div>
    <p><Link href="/">← BACK TO LATEST NEWS</Link></p>
  </article></main><footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. All rights reserved. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club.</span></div></footer></>;
}