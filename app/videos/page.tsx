import Link from "next/link";
import Header from "@/components/Header";

const videos = [
  {
    id: "v8mdzP9B2-E",
    title: "Inside Training: Pre-season in Dublin",
    category: "TRAINING",
    description: "The Reds work through shooting, dribbling and small-sided drills ahead of the 2026 pre-season fixture against Leeds.",
    date: "12 August 2026",
  },
  {
    id: "VkgYeKF4qrg",
    title: "Getting Ready For Hull! | Inside Training",
    category: "TRAINING",
    description: "A look at the squad preparing for the 2026/27 Premier League opener.",
    date: "20 August 2026",
  },
  {
    id: "3eHvNt5d8qs",
    title: "All the Goals: 2026 Pre-season",
    category: "GOALS",
    description: "Manchester United's official compilation of goals from the 2026 pre-season tour across Europe.",
    date: "17 August 2026",
  },
];

export default function VideosPage() {
  return (
    <>
      <Header />
      <main className="wrap">
        <section className="videos-hero">
          <div className="masthead-kicker">OFFICIAL CLUB FOOTAGE</div>
          <h1>UNITED <span>VIDEO ZONE</span></h1>
          <p>Training ground access, goals and moments from the Reds in 2026.</p>
          <div className="video-source">SELECTED FROM THE VERIFIED MANCHESTER UNITED YOUTUBE CHANNEL</div>
        </section>
        <div className="video-grid">
          {videos.map((video) => (
            <article className="video-card" key={video.id}>
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="video-copy">
                <div className="video-meta"><span className="tag">{video.category}</span><span>{video.date}</span></div>
                <h2>{video.title}</h2>
                <p>{video.description}</p>
                <a className="youtube-link" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">WATCH ON YOUTUBE ↗</a>
              </div>
            </article>
          ))}
        </div>
        <div className="video-footnote">
          Videos are embedded from Manchester United’s verified YouTube channel. All video rights remain with the club and their respective owners.
          <a href="https://www.youtube.com/@manutd" target="_blank" rel="noreferrer"> Visit the official channel ↗</a>
        </div>
        <div className="back-home"><Link href="/">← BACK TO LATEST NEWS</Link></div>
      </main>
      <footer className="footer"><div className="wrap footrow"><span>© {new Date().getFullYear()} United Red. Independent Manchester United coverage.</span><span>Not affiliated with Manchester United Football Club.</span></div></footer>
    </>
  );
}
