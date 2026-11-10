import Link from "next/link";
import Header from "@/components/Header";

const videos = [
  {
    id: "3HWZyLiDIjI",
    title: "Senne Saves Us Against Roma",
    category: "GOALKEEPER SAVE",
    description: "A huge stop from Senne to keep United in the game.",
  },
  {
    id: "WHpSwS5Thlg",
    title: "Leny Yoro’s Goal-Saving Tackle",
    category: "DEFENDING",
    description: "Yoro times his sliding intervention perfectly to deny Roma.",
  },
  {
    id: "DWvmknN589M",
    title: "Kobbie Just Roma-ing Around",
    category: "SKILLS",
    description: "A sharp piece of close control and confidence from Kobbie Mainoo.",
  },
  {
    id: "-8KMtbCmtYc",
    title: "Cunha Seriously Cooked Against Roma",
    category: "SKILLS",
    description: "Matheus Cunha brings flair and energy in this short highlight.",
  },
  {
    id: "SD6ZPVtQvuY",
    title: "When Bruno Kickstarted the Comeback",
    category: "GOAL",
    description: "Bruno Fernandes leads the fight back with a crucial moment.",
  },
  {
    id: "MvZUcONL9hA",
    title: "A Dream Night for Matheus Cunha",
    category: "CELEBRATION",
    description: "A special moment for Cunha and the Reds.",
  },
  {
    id: "69beQOUE14A",
    title: "Listen to That Noise",
    category: "FANS",
    description: "The Old Trafford atmosphere at full volume.",
  },
  {
    id: "_yC4XiJVEGY",
    title: "Matheus Cunha, Take a Bow",
    category: "GOAL",
    description: "A brilliant finish from Matheus Cunha.",
  },
  {
    id: "yi14m-yibec",
    title: "Our Player of the Match",
    category: "HIGHLIGHT",
    description: "A quick celebration of United’s standout performer.",
  },
  {
    id: "vsYRAL41aVU",
    title: "When United Scored Seven Goals Against Roma",
    category: "CLASSIC MOMENT",
    description: "A reminder of a memorable seven-goal United performance.",
  },
];

export default function VideosPage() {
  return (
    <>
      <Header />
      <main className="wrap">
        <section className="videos-hero">
          <div className="masthead-kicker">UNITED MOMENTS • OFFICIAL CLUB CLIPS</div>
          <h1>UNITED <span>VIDEO ZONE</span></h1>
          <p>Goals, skills, saves and the moments that make being a Red special.</p>
          <div className="video-source">10 SHORT CLIPS • WATCH RIGHT HERE</div>
        </section>
        <div className="video-grid">
          {videos.map((video) => (
            <article className="video-card" key={video.id}>
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?modestbranding=1&rel=0`}
                  title={video.title}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="video-copy">
                <div className="video-meta"><span className="tag">{video.category}</span></div>
                <h2>{video.title}</h2>
                <p>{video.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="video-footnote">
          Video clips are embedded from Manchester United’s official YouTube channel. Playback stays on this page; rights remain with the original owners.
        </div>
        <div className="back-home"><Link href="/">← BACK TO LATEST NEWS</Link></div>
      </main>
      <footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club.</span></div></footer>
    </>
  );
}
