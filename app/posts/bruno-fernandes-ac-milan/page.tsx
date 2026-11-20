import Link from "next/link";
import Header from "@/components/Header";
import Ad from "@/components/Ad";
import { ShareButtons } from "@/components/SocialLinks";
import { brunoFernandesStory as story } from "@/lib/bruno-fernandes-story";

export const metadata = {
  title: story.title + " | United Red",
  description: story.excerpt,
  alternates: { canonical: "https://manunitednews.blog/posts/bruno-fernandes-ac-milan" },
  openGraph: { type: "article", title: story.title, description: story.excerpt, url: "https://manunitednews.blog/posts/bruno-fernandes-ac-milan", images: [{ url: "/posts/bruno-fernandes-ac-milan/opengraph-image", width: 1200, height: 630, alt: story.title }] },
  twitter: { card: "summary_large_image", title: story.title, description: story.excerpt, images: ["/posts/bruno-fernandes-ac-milan/opengraph-image"] },
};

export default function BrunoFernandesArticle() {
  return <><Header/><main className="wrap"><article className="article">
    <div className="tag">{story.category}</div>
    <h1>{story.title}</h1>
    <p className="lead">{story.excerpt}</p>
    <div className="date">{new Date(story.created_at).toLocaleDateString("en-GB", {day:"numeric", month:"long", year:"numeric"})}</div>
    <div className="placeholder articleimg">UNITED</div>
    <Ad label="IN-ARTICLE ADVERTISEMENT"/>
    <div className="content">{story.content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    <div className="content"><p>Read the original reports: <a href="https://www.skysports.com/football/news/13611749/bruno-fernandes-transfer-news-manchester-united-captain-rejects-second-contract-offer" target="_blank" rel="noreferrer">Sky Sports</a> · <a href="https://tribuna.com/en/news/2026-11-18-ac-milan-keeping-close-eye-on-bruno-fernandes-as-man-united-contract-talks-stall/" target="_blank" rel="noreferrer">Tribuna</a> · <a href="https://utdreport.co.uk/2026/11/18/bruno-fernandes-already-knows-where-he-wants-to-move-after-leaving-united-as-two-clubs-make-enquiries/amp/" target="_blank" rel="noreferrer">UtdReport</a> · <a href="https://milanreports.com/2026/11/19/milan-another-modric-fernandes/" target="_blank" rel="noreferrer">MilanReports</a>.</p></div>
    <ShareButtons title={story.title} url={"https://manunitednews.blog/posts/bruno-fernandes-ac-milan"} />
    <p><Link href="/">← BACK TO LATEST NEWS</Link></p>
  </article></main><footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. All rights reserved. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club. · <a href="https://www.facebook.com/ManUnitedNews.blog/" target="_blank" rel="noopener noreferrer">Facebook</a></span></div></footer></>;
}