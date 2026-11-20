const FACEBOOK_PAGE = "https://www.facebook.com/ManUnitedNews.blog/";

export default function SocialLinks() {
  return <a href={FACEBOOK_PAGE} target="_blank" rel="noopener noreferrer" aria-label="Follow Manchester United News on Facebook" className="social-facebook">f <span>Facebook</span></a>;
}

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  return <div className="share-buttons" aria-label="Share this article">
    <a href={facebook} target="_blank" rel="noopener noreferrer">Share on Facebook</a>
    <a href={x} target="_blank" rel="noopener noreferrer">Share on X</a>
  </div>;
}
