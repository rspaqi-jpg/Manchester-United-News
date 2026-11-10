function decode(value: string) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}
export async function GET() {
  try {
    const url = "https://news.google.com/rss/search?q=Manchester+United+(transfer+OR+signing+OR+loan)+when:30d&hl=en-GB&gl=GB&ceid=GB:en";
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 600 } });
    if (!response.ok) throw new Error("RSS unavailable");
    const xml = await response.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 12).map((match) => {
      const block = match[1];
      const read = (tag: string) => decode(block.match(new RegExp("<" + tag + ">([\\s\\S]*?)<\/" + tag + ">"))?.[1] || "");
      const rawLink = read("link");
      const source = read("source");
      const date = read("pubDate");
      return { title: read("title"), url: rawLink, source, publishedAt: date };
    }).filter((item) => item.title && item.url);
    return Response.json({ items, checkedAt: new Date().toISOString() }, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" }
    });
  } catch {
    return Response.json({ items: [], checkedAt: new Date().toISOString(), error: "Live transfer news is temporarily unavailable" }, { status: 200 });
  }
}
