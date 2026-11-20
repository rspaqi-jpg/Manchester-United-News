import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Ad from "@/components/Ad";
import { ShareButtons } from "@/components/SocialLinks";
import { supabase } from "@/lib/supabase";
import { samples, type Post, cleanPost, isMensSeniorPost } from "@/lib/posts";
import { brunoFernandesStory } from "@/lib/bruno-fernandes-story";
import { pochettinoLiverpoolStory } from "@/lib/pochettino-liverpool-story";
import { pochettinoDroneStory } from "@/lib/pochettino-drone-story";
import { pochettinoPredictedXiStory } from "@/lib/pochettino-predicted-xi-story";
import { pochettinoJanuaryTargetsStory } from "@/lib/pochettino-january-targets-story";

async function getPost(id: string): Promise<Post | undefined> {
  let post: Post | undefined = [...samples, brunoFernandesStory as Post, pochettinoLiverpoolStory as Post, pochettinoDroneStory as Post, pochettinoPredictedXiStory as Post, pochettinoJanuaryTargetsStory as Post].find((item) => item.id === id);
  if (supabase) {
    const { data } = await supabase.from("posts").select("id,title,excerpt,content,image_url,created_at,category,ad_code,youtube_video,published").eq("id", id).eq("published", true).maybeSingle();
    if (data) post = cleanPost(data as Post);
  }
  return post && isMensSeniorPost(post) ? post : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Article not found" };
  const image = post.image_url || `/posts/${id}/opengraph-image`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/posts/${id}` },
    openGraph: { type: "article", url: `https://manunitednews.blog/posts/${id}`, title: post.title, description: post.excerpt, siteName: "United Red", publishedTime: post.created_at, images: [{ url: image, width: 1200, height: 630, alt: post.title }] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [image] },
  };
}

function getYouTubeId(value?: string | null) {
  if (!value) return null;
  const input = value.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("/")[0] || null;
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(url.hostname)) {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/);
      return match?.[1] || null;
    }
  } catch {}
  return null;
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();
  const youtubeId = getYouTubeId(post.youtube_video);
  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);
  const articleUrl = `https://manunitednews.blog/posts/${post.id}`;
  return <><Header/><main className="wrap"><article className="article">
    <div className="tag">{post.category || "MANCHESTER UNITED"}</div>
    <h1>{post.title}</h1><p className="lead">{post.excerpt}</p>
    <div className="date">{new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
    {post.image_url ? <img className="articleimg" src={post.image_url} alt={post.title} /> : <div className="placeholder articleimg">UNITED</div>}
    <div className="content">{paragraphs.map((paragraph, index) => <span key={index}><p>{paragraph}</p>{index === 1 ? <Ad placement="article-mid" label="IN-ARTICLE ADVERTISEMENT" /> : null}</span>)}</div>
    <Ad placement="article-end" label="ADVERTISEMENT" />
    <ShareButtons title={post.title} url={articleUrl}/>
    {youtubeId ? <section className="article-video" aria-label="Article video"><div className="article-video-heading"><span className="tag">WATCH VIDEO</span><h2>Inside the story</h2></div><div className="article-video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`} title={`${post.title} – Manchester United video`} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" sandbox="allow-scripts allow-same-origin allow-presentation" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></section> : null}
    <p><Link href="/">← BACK TO LATEST NEWS</Link></p>
  </article></main><footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. All rights reserved. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club. · <a href="https://www.facebook.com/ManUnitedNews.blog/" target="_blank" rel="noopener noreferrer">Facebook</a></span></div></footer></>;
}
