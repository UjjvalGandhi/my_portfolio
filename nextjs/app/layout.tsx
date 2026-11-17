import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL = "https://ujjvalgandhi.online";

const TITLE = "Ujjawal Gandhi — Full Stack Developer | Flutter, Next.js & Node.js";
const DESCRIPTION =
  "Ujjawal Gandhi is a full stack developer in Anand, Gujarat, India. Cross-platform apps in Flutter, web apps in Next.js, and REST APIs in Node.js & Express deployed on AWS Lambda and Oracle Cloud. Author of open-source Flutter packages on pub.dev.";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: "%s | Ujjawal Gandhi",
  },
  description: DESCRIPTION,
  keywords: [
    "Full stack developer",
    "Full stack developer India",
    "Flutter developer",
    "Next.js developer",
    "Node.js developer",
    "React developer India",
    "Dart developer",
    "cross-platform app developer",
    "Android developer",
    "iOS developer",
    "AWS Lambda Node.js",
    "Oracle Cloud developer",
    "Express Sequelize MySQL",
    "Firebase Flutter",
    "GetX Flutter",
    "Flutter developer Gujarat",
    "developer Anand Gujarat",
    "Ujjawal Gandhi",
    "ujjvalgandhi",
    "Flutter package author",
    "pub.dev packages",
    "liquid_glass_bottom_nav_native",
    "liquid_glass_bottom_nav_cli",
    "Liquid Glass Flutter",
    "iOS 26 tab bar Flutter",
  ],
  authors: [{ name: "Ujjawal Gandhi", url: BASE_URL }],
  creator: "Ujjawal Gandhi",
  publisher: "Ujjawal Gandhi",
  category: "technology",

  alternates: { canonical: BASE_URL },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Ujjawal Gandhi — Full Stack Developer",
    title: TITLE,
    description:
      "Full stack developer building cross-platform apps in Flutter, web apps in Next.js, and REST APIs in Node.js on AWS Lambda & Oracle Cloud. Open to full-time and freelance work.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ujjawal Gandhi — Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ujjawal Gandhi — Full Stack Developer",
    description:
      "Flutter, Next.js and Node.js. One codebase to iOS, Android, Web and Desktop — APIs on AWS Lambda and Oracle Cloud.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
