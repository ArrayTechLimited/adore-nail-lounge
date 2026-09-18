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

export const metadata: Metadata = {
  title: `${salon.name} — Nail salon on North Lamar, Austin`,
  description:
    "A quiet nail lounge on North Lamar. Meticulous gel, natural-nail care and pedicures that take their time. 4400 N Lamar Blvd, Ste 103, Austin TX.",
  openGraph: {
    title: `${salon.name} — Nails you'll adore looking at`,
    description:
      "A quiet nail lounge on North Lamar, Austin. Meticulous gel, natural-nail care and pedicures that take their time.",
    type: "website",
    locale: "en_US",
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
