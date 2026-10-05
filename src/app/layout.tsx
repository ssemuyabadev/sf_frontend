import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SiteChrome from "../components/SiteChrome";
import ScrollToTop from "../components/ScrollToTop";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ssemuyaba Foundation | Empowering Vulnerable Orphans, Children and Widows",
  description:
    "Ssemuyaba Foundation provides love, support, education and sustainable opportunities to vulnerable children and widows.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <SiteChrome>{children}</SiteChrome>
        <ScrollToTop />
      </body>
    </html>
  );
}
