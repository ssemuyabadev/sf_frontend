import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title:"Ssemuyaba Foundation | Empowering Vulnerable Orphans, Children and Widows",
  description:"Ssemuyaba Foundation provides love, support, education and sustainable opportunities to vulnerable children and widows."
};
export default function RootLayout({children}:{readonly children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}