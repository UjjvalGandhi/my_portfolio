import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const BASE_URL = "https://ujjvalgandhi.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ujjawal Gandhi — Flutter Developer | Android, iOS, Web & Desktop",
    template: "%s | Ujjawal Gandhi",
  },
  description:
    "Ujjawal Gandhi is a Flutter developer based in Anand, Gujarat, India. Building cross-platform apps for Android, iOS, Web & Desktop using Flutter, Dart, Firebase, and GetX.",
  keywords: [
    "Flutter developer",
    "Dart developer",
    "Flutter developer India",
    "Flutter developer Gujarat",
    "cross-platform app developer",
    "Android developer",
    "iOS developer",
    "Firebase Flutter",
    "GetX Flutter",
    "mobile app developer Anand",
    "Ujjawal Gandhi",
    "ujjvalgandhi",
    "Flutter freelancer India",
  ],
  authors: [{ name: "Ujjawal Gandhi", url: BASE_URL }],
  creator: "Ujjawal Gandhi",
  publisher: "Ujjawal Gandhi",
  category: "technology",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Ujjawal Gandhi — Flutter Developer",
    title: "Ujjawal Gandhi — Flutter Developer | Android, iOS, Web & Desktop",
    description:
      "Flutter developer building beautiful cross-platform apps for Android, iOS, Web & Desktop. Based in Anand, Gujarat. Open to full-time & freelance roles.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ujjawal Gandhi — Flutter Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ujjawal Gandhi — Flutter Developer",
    description:
      "Building beautiful cross-platform Flutter apps for Android, iOS, Web & Desktop.",
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

  verification: {
    // Add your Google Search Console verification code here after registering
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
