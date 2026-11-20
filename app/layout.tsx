import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://manunitednews.blog"),
  title: { default: "United Red | Manchester United News", template: "%s | United Red" },
  description: "Independent Manchester United news, match reaction, transfer coverage and analysis.",
  openGraph: {
    type: "website",
    siteName: "United Red",
    url: "https://manunitednews.blog",
    title: "United Red | Manchester United News",
    description: "Independent Manchester United news, match reaction, transfer coverage and analysis.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "United Red — Manchester United News" }],
  },
  twitter: { card: "summary_large_image", title: "United Red | Manchester United News", description: "Independent Manchester United news, match reaction, transfer coverage and analysis." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://bauval.org/14/34a29fe97dbabaa5719ee7bbb24a417d" strategy="afterInteractive" data-cfasync="false" />
      </body>
    </html>
  );
}
