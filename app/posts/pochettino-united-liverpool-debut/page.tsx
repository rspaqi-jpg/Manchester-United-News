import Link from "next/link";
import Header from "@/components/Header";
import Ad from "@/components/Ad";
import { ShareButtons } from "@/components/SocialLinks";
import { pochettinoLiverpoolStory as story } from "@/lib/pochettino-liverpool-story";

export const metadata = {
  title: story.title + " | United Red",
  description: story.excerpt,
  alternates: { canonical: "https://manunitednews.blog/posts/pochettino-united-liverpool-debut" },
  openGraph: { type: "article", title: story.title, description: story.excerpt, url: "https://manunitednews.blog/posts/pochettino-united-liverpool-debut", images: [{ url: "/posts/pochettino-united-liverpool-debut/opengraph-image", width: 1200, height: 630, alt: story.title }] },
  twitter: { card: "summary_large_image", title: story.title, description: story.excerpt, images: ["/posts/pochettino-united-liverpool-debut/opengraph-image"] },
};

export default function PochettinoLiverpoolArticle() {
  return <><Header/><main className="wrap"><article className="article">
    <div className="tag">{story.category}</div>
    <h1>{story.title}</h1>
    <p className="lead">{story.excerpt}</p>
    <div className="date">{new Date(story.created_at).toLocaleDateString("en-GB", {day:"numeric", month:"long", year:"numeric"})}</div>
    <div className="placeholder articleimg">UNITED</div>
    <Ad placement="article-mid" label="IN-ARTICLE ADVERTISEMENT"/>
    <div className="content">{story.content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    <div className="content"><p>Sources: <a href="https://www.reuters.com/sports/soccer/pochettino-thrown-deep-end-united-reign-begins-anfield-2026-11-19/" target="_blank" rel="noreferrer">Reuters</a> · <a href="https://www.manutd.com/en/news/liverpool-v-united-how-to-watch-and-follow-pochettinos-first-game-in-charge" target="_blank" rel="noreferrer">Manchester United – official match preview</a>.</p></div>
    <Ad placement="article-end" label="ADVERTISEMENT"/>
    <ShareButtons title={story.title} url={"https://manunitednews.blog/posts/pochettino-united-liverpool-debut"} />
    <p><Link href="/">← BACK TO LATEST NEWS</Link></p>
  </article></main><footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. All rights reserved. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club. · <a href="https://www.facebook.com/ManUnitedNews.blog/" target="_blank" rel="noopener noreferrer">Facebook</a></span></div></footer></>;
}