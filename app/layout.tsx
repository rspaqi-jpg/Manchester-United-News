import type {Metadata} from "next";
import Script from "next/script";
import "./globals.css";

export const metadata:Metadata={
  title:"United Red | Manchester United News",
  description:"Independent Manchester United news, match reaction, transfer coverage and analysis."
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://bauval.org/14/34a29fe97dbabaa5719ee7bbb24a417d"
          strategy="afterInteractive"
          data-cfasync="false"
        />
      </body>
    </html>
  );
}