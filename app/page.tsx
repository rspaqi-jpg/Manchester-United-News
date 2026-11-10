import Link from "next/link";
import Header from "@/components/Header";
import Ad from "@/components/Ad";
import {supabase} from "@/lib/supabase";
import {samples,type Post,cleanPost} from "@/lib/posts";

async function loadPosts(){
  if(!supabase)return samples;
  const {data,error}=await supabase.from("posts").select("id,title,excerpt,content,image_url,created_at,category,ad_code,published").eq("published",true).order("created_at",{ascending:false}).limit(30);
  return !error&&data?.length?(data as Post[]).map(cleanPost):samples;
}

function Story({post,index}:{post:Post;index:number}){
  return <Link href={`/posts/${post.id}`} className={`card ${index===0?"feature":""}`}>
    {post.image_url?<img className="thumb" src={post.image_url} alt=""/>:<div className="placeholder"><span>UNITED</span></div>}
    <div className="body"><div className="tag">{post.category||"MANCHESTER UNITED"}</div><h3>{post.title}</h3><p>{post.excerpt}</p><div className="date">{new Date(post.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</div></div>
  </Link>;
}

export default async function Home(){
  const posts=(await loadPosts())
    .map(post=>post.category?.toUpperCase().includes("ANALYSIS")?{...post,category:"NEWS"}:post)
    .sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime());
  return <><Header/><main>
    <section className="masthead"><div className="masthead-inner"><div className="masthead-kicker">THE HOME OF THE REDS</div><h1>MANCHESTER<br/><span>UNITED</span></h1><div className="masthead-sub">NEWS • MATCHES • TRANSFERS • ANALYSIS</div></div></section>
    <div className="wrap"><Ad label="TOP BANNER ADVERTISEMENT"/>
      <div className="home-links"><Link href="/transfers">MANCHESTER UNITED TRANSFERS <span>→</span></Link><Link href="/prltable">PREMIER LEAGUE TOP SIX &amp; LIVE TABLE <span>→</span></Link></div>
      <section id="news"><div className="sectionhead"><div><h2>News</h2><p>All Manchester United stories, match reports and analysis in one newsroom</p></div><span className="tag">RED DEVILS NEWSROOM</span></div><div className="grid">{posts.map((post,i)=><Story key={post.id} post={post} index={i}/>)}</div></section>
    </div></main>
    <footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club.</span></div></footer>
  </>;
}