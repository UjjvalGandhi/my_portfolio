import { MetadataRoute } from "next";

const BASE_URL = "https://ujjvalgandhi.online";

/* Anchors match the section ids rendered in app/page.tsx. */
const SECTIONS: { hash: string; priority: number }[] = [
  { hash: "about",      priority: 0.7 },
  { hash: "stack",      priority: 0.7 },
  { hash: "experience", priority: 0.9 },
  { hash: "work",       priority: 0.9 },
  { hash: "packages",   priority: 0.9 },
  { hash: "education",  priority: 0.6 },
  { hash: "contact",    priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE_URL, lastModified, changeFrequency: "monthly", priority: 1.0 },
    ...SECTIONS.map(s => ({
      url: `${BASE_URL}/#${s.hash}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: s.priority,
    })),
  ];
}
