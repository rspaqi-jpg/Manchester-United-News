import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { samples, type Post } from "@/lib/posts";
import { brunoFernandesStory } from "@/lib/bruno-fernandes-story";
import { pochettinoLiverpoolStory } from "@/lib/pochettino-liverpool-story";

const baseUrl = "https://manunitednews.blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPosts = [...samples, brunoFernandesStory as Post, pochettinoLiverpoolStory as Post];
  let posts = staticPosts;
  if (supabase) {
    const { data } = await supabase.from("posts").select("id,created_at,published").eq("published", true).order("created_at", { ascending: false }).limit(1000);
    if (data?.length) posts = [...staticPosts, ...(data as Pick<Post, "id" | "created_at" | "published">[]).map((p) => ({ ...p, title: "", excerpt: "", content: "", image_url: null, category: null, ad_code: null })) as Post[]];
  }
  const unique = new Map(posts.filter((p) => p.published).map((p) => [p.id, p]));
  const articleUrls = [...unique.values()].map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: new Date(post.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${baseUrl}/transfers`, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/prltable`, changeFrequency: "daily", priority: 0.6 },
    { url: `${baseUrl}/videos`, changeFrequency: "weekly", priority: 0.6 },
    ...articleUrls,
  ];
}
