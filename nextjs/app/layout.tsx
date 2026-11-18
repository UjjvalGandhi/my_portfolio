import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Self-hosted rather than next/font/google.

   next/font/google downloads from fonts.googleapis.com at BUILD time. When
   one of those requests fails, Turbopack surfaces it as a confusing
   "Module not found: @vercel/turbopack-next/internal/font/google/font"
   rather than a network error, and the build fails. It is intermittent, it
   hit roughly one build in three here, and Vercel builds cold every time —
   so it was a coin flip on every deploy.

   These are the same families as variable fonts, latin subset, so builds
   are now deterministic and offline-capable. 132 KB for all three, less
   than the static instances Google was serving for the weights in use.
   See app/fonts/README.md for provenance and re-download steps. */

const inter = localFont({
  src: "./fonts/inter-latin-var.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const interTight = localFont({
  src: "./fonts/inter-tight-latin-var.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-var.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  /* Arial metrics would be wrong for a monospace face, so the automatic
     fallback adjustment is off and a mono stack is given instead. */
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
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
      /* The inline script below sets data-anim before React hydrates, which
         React 19 would otherwise report as a mismatch. */
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint. Marks the document animatable only when
            JS is live and motion is allowed, so CSS can pre-hide split words
            without ever hiding them from a reader who has JS off. The timer
            clears the flag if the animation layer never reports ready, so a
            script failure degrades to plain visible text. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches){" +
              "var d=document.documentElement;d.dataset.anim='on';" +
              "setTimeout(function(){if(!window.__animReady){delete d.dataset.anim;d.querySelectorAll('[data-word]').forEach(function(w){w.style.opacity=''});}},2500);}}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
