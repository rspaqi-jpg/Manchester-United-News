import type {Metadata} from "next";import "./globals.css";
export const metadata:Metadata={title:"United Red | Manchester United News",description:"Independent Manchester United news, match reaction, transfer coverage and analysis."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}