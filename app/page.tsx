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

const premierLeague = [
  ["Arsenal",10,9,0,1,15,5,10,27],
  ["Brighton",10,7,1,2,26,7,19,22],
  ["Manchester City",10,7,0,3,21,13,8,21],
  ["Liverpool",10,5,3,2,14,10,4,18],
  ["Chelsea",10,5,1,4,19,16,3,16],
  ["Everton",10,4,4,2,12,10,2,16],
  ["Bournemouth",10,4,3,3,16,14,2,15],
  ["Brentford",10,3,5,2,16,11,5,14],
  ["Leeds United",10,3,5,2,10,8,2,14],
  ["Aston Villa",10,3,4,3,14,17,-3,13],
  ["Tottenham",10,3,3,4,10,11,-1,12],
  ["Newcastle United",10,3,3,4,13,16,-3,12],
  ["Hull City",10,2,5,3,11,11,0,11],
  ["Ipswich Town",10,3,2,5,15,20,-5,11],
  ["Fulham",10,2,4,4,10,12,-2,10],
  ["Nottingham Forest",10,2,3,5,9,13,-4,9],
  ["Coventry City",10,3,0,7,10,19,-9,9],
  ["Manchester United",10,1,5,4,14,19,-5,8],
  ["Sunderland",10,2,2,6,8,17,-9,8],
  ["Crystal Palace",10,2,1,7,10,24,-14,7],
] as const;

function PremierLeagueTable(){
  return <section className="league-section" id="premier-league">
    <div className="sectionhead"><div><h2>Premier League Table</h2><p>2026/27 Season · Updated 10 November 2026</p></div><span className="tag">ENGLAND</span></div>
    <div className="league-table-wrap"><table className="league-table">
      <thead><tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr></thead>
      <tbody>{premierLeague.map((team,index)=><tr key={team[0]} className={team[0]==="Manchester United"?"man-united-row":""}>
        <td>{index+1}</td><td className="league-team">{team[0]}</td><td>{team[1]}</td><td>{team[2]}</td><td>{team[3]}</td><td>{team[4]}</td><td>{team[5]}</td><td>{team[6]}</td><td>{team[7]>0?"+":""}{team[7]}</td><td className="league-points">{team[8]}</td>
      </tr>)}</tbody>
    </table></div>
  </section>;
}

export default async function Home(){
  const posts=await loadPosts();
  return <><Header/><main>
    <section className="masthead"><div className="masthead-inner"><div className="masthead-kicker">THE HOME OF THE REDS</div><h1>MANCHESTER<br/><span>UNITED</span></h1><div className="masthead-sub">NEWS • MATCHES • TRANSFERS • ANALYSIS</div></div></section>
    <div className="wrap"><Ad label="TOP BANNER ADVERTISEMENT"/>
      <section className="video-promo"><div><div className="masthead-kicker">OFFICIAL CLUB FOOTAGE</div><h2>UNITED VIDEO ZONE</h2><p>Watch 2026 training sessions, goals and moments from the Reds — embedded from the club’s verified YouTube channel.</p></div><Link href="/videos" className="video-cta">WATCH VIDEOS ↗</Link></section>
      <PremierLeagueTable/>
      <section id="news"><div className="sectionhead"><div><h2>Latest stories</h2><p>Fresh updates from around Old Trafford</p></div><span className="tag">RED DEVILS NEWSROOM</span></div><div className="grid">{posts.map((post,i)=><Story key={post.id} post={post} index={i}/>)}</div></section>
      <div id="analysis"><Ad label="IN-FEED ADVERTISEMENT"/></div>
    </div></main>
    <footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club.</span></div></footer>
  </>;
}