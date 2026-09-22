import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import MotionRoot from "@/components/MotionRoot";
import { salon } from "@/content/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

/**
 * Absolute URLs for Open Graph. Vercel supplies the deployment host, so link
 * previews work on every preview URL as well as production; set SITE_URL once a
 * custom domain is attached.
 */
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

/**
 * This is a pitch demo standing in for a real salon's web presence, so it stays
 * out of search results until the client signs off. Flip by setting
 * ALLOW_INDEXING=true in the Vercel project's environment variables.
 */
const allowIndexing = process.env.ALLOW_INDEXING === "true";

const description =
  "A quiet nail lounge on North Lamar. Meticulous gel, natural-nail care and pedicures that take their time. 4400 N Lamar Blvd, Ste 103, Austin TX.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${salon.name} — Nail salon on North Lamar, Austin`,
  description,
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    title: `${salon.name} — Nails you'll adore looking at`,
    description,
    siteName: salon.name,
    type: "website",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${salon.name} — Nails you'll adore looking at`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#3a211d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
      <body>
        <MotionRoot />
        {children}
      </body>
    </html>
  );
}
