import PackagesView from "./PackagesView";

export type PubPackage = {
  name: string;
  version: string;
  description: string;
  likes: number;
  points: number;
  maxPoints: number;
  downloads: number;
  platforms: string[];
};

/* Static snapshot — rendered as-is if pub.dev is unreachable at build time. */
const FALLBACK: PubPackage[] = [
  {
    name: "liquid_glass_bottom_nav_native",
    version: "0.2.1",
    description:
      "Native iOS 26 Liquid Glass bottom tab bar (real UITabBarController) with morphing search tab, for Flutter.",
    likes: 1,
    points: 160,
    maxPoints: 160,
    downloads: 87,
    platforms: ["Flutter", "iOS"],
  },
  {
    name: "liquid_glass_bottom_nav_cli",
    version: "0.1.0",
    description:
      "Installs liquid_glass_bottom_nav into a Flutter project and configures the native iOS side it needs to render.",
    likes: 1,
    points: 150,
    maxPoints: 160,
    downloads: 74,
    platforms: ["Dart", "Flutter", "macOS", "Windows", "Linux"],
  },
];

const TAG_LABELS: Record<string, string> = {
  "sdk:dart": "Dart",
  "sdk:flutter": "Flutter",
  "platform:ios": "iOS",
  "platform:android": "Android",
  "platform:web": "Web",
  "platform:macos": "macOS",
  "platform:windows": "Windows",
  "platform:linux": "Linux",
};

type PubInfo = { latest?: { version?: string; pubspec?: { description?: string } } };
type PubScore = {
  likeCount?: number;
  grantedPoints?: number;
  maxPoints?: number;
  downloadCount30Days?: number;
  tags?: string[];
};

function platformsFromTags(tags: string[] | undefined): string[] | null {
  if (!tags?.length) return null;
  const labels = tags.map(t => TAG_LABELS[t]).filter(Boolean);
  return labels.length ? labels : null;
}

/* Live stats, refreshed daily. Any failure falls back to the snapshot above. */
async function fetchPackage(fallback: PubPackage): Promise<PubPackage> {
  const opts = { next: { revalidate: 86400 } };
  try {
    const [infoRes, scoreRes] = await Promise.all([
      fetch(`https://pub.dev/api/packages/${fallback.name}`, opts),
      fetch(`https://pub.dev/api/packages/${fallback.name}/score`, opts),
    ]);
    if (!infoRes.ok || !scoreRes.ok) return fallback;

    const info: PubInfo = await infoRes.json();
    const score: PubScore = await scoreRes.json();

    return {
      name: fallback.name,
      version: info.latest?.version ?? fallback.version,
      description: info.latest?.pubspec?.description ?? fallback.description,
      likes: score.likeCount ?? fallback.likes,
      points: score.grantedPoints ?? fallback.points,
      maxPoints: score.maxPoints ?? fallback.maxPoints,
      downloads: score.downloadCount30Days ?? fallback.downloads,
      platforms: platformsFromTags(score.tags) ?? fallback.platforms,
    };
  } catch {
    return fallback;
  }
}

export default async function Packages() {
  const packages = await Promise.all(FALLBACK.map(fetchPackage));
  return <PackagesView packages={packages} />;
}
