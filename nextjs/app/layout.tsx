import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Ujjawal Gandhi — Flutter Developer",
  description: "Flutter developer building beautiful cross-platform apps for Android, iOS, Web & Desktop. Based in Anand, Gujarat.",
  keywords: ["Flutter", "Dart", "Mobile Developer", "Cross-platform", "Firebase", "GetX"],
  authors: [{ name: "Ujjawal Gandhi" }],
  openGraph: {
    title: "Ujjawal Gandhi — Flutter Developer",
    description: "Building beautiful cross-platform apps for Android, iOS, Web & Desktop.",
    url: "https://ujjvalgandhi.online",
    siteName: "Ujjawal Gandhi Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
