import { ImageResponse } from "next/og";
import { samples, type Post } from "@/lib/posts";
import { brunoFernandesStory } from "@/lib/bruno-fernandes-story";
import { pochettinoLiverpoolStory } from "@/lib/pochettino-liverpool-story";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";
export const alt = "Manchester United News — United Red";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let post: Post | undefined = [...samples, brunoFernandesStory as Post, pochettinoLiverpoolStory as Post].find((item) => item.id === id);
  if (supabase) {
    const { data } = await supabase.from("posts").select("id,title,excerpt,content,image_url,created_at,category,ad_code,published").eq("id", id).eq("published", true).maybeSingle();
    if (data) post = data as Post;
  }
  const title = post?.title || "Manchester United News";
  const excerpt = post?.excerpt || "The latest Manchester United news, match coverage and transfer updates.";
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #190b10 0%, #101216 65%, #310d19 100%)", color: "white", fontFamily: "Arial" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#ff526b", fontSize: 26, fontWeight: 900, letterSpacing: 5 }}><div style={{ border: "3px solid #c8102e", borderRadius: 12, padding: "12px 18px", color: "white" }}>MU</div> UNITED RED</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}><div style={{ color: "#ff6379", fontSize: 20, fontWeight: 800, letterSpacing: 4 }}>{post?.category || "MANCHESTER UNITED NEWS"}</div><div style={{ fontSize: title.length > 75 ? 48 : 58, lineHeight: 1.12, fontWeight: 900 }}>{title}</div><div style={{ color: "#c5c8cf", fontSize: 25, lineHeight: 1.35 }}>{excerpt.slice(0, 150)}</div></div>
    <div style={{ display: "flex", justifyContent: "space-between", color: "#a6aab3", fontSize: 22 }}><span>INDEPENDENT MANCHESTER UNITED COVERAGE</span><span>manunitednews.blog</span></div>
  </div>, size);
}
