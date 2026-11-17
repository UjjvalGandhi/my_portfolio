import { profile, jobs, education, skillGroups } from "@/lib/data";

const BASE = "https://ujjvalgandhi.online";

export default function JsonLd() {
  const author = { "@type": "Person", name: profile.name, url: BASE };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: BASE,
    email: profile.email,
    telephone: "+919998760436",
    image: `${BASE}/og-image.png`,
    jobTitle: "Full Stack Developer",
    description: profile.summary,
    worksFor: {
      "@type": "Organization",
      name: jobs[0].company,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Anand",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Anand",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    alumniOf: education.map(e => ({
      "@type": "CollegeOrUniversity",
      name: e.university,
    })),
    hasCredential: education.map(e => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: e.degree,
      recognizedBy: { "@type": "CollegeOrUniversity", name: e.university },
    })),
    sameAs: [
      profile.linkedin,
      profile.github,
      "https://pub.dev/packages/liquid_glass_bottom_nav_native",
      "https://pub.dev/packages/liquid_glass_bottom_nav_cli",
    ],
    knowsAbout: Array.from(new Set(skillGroups.flatMap(g => g.items))),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Full Stack Developer`,
    url: BASE,
    description: profile.summary,
    author,
    inLanguage: "en",
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@type": "Person", name: profile.name, url: BASE },
    url: BASE,
  };

  const packageSchemas = [
    {
      name: "liquid_glass_bottom_nav_native",
      description:
        "Native iOS 26 Liquid Glass bottom tab bar for Flutter, backed by a real UITabBarController with a morphing search tab. Scores 160/160 pub points.",
      platform: "iOS",
    },
    {
      name: "liquid_glass_bottom_nav_cli",
      description:
        "Companion command-line tool that installs liquid_glass_bottom_nav into a Flutter project and configures the native iOS side it needs to render.",
      platform: "Cross-platform",
    },
  ].map(pkg => ({
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: pkg.name,
    description: pkg.description,
    url: `https://pub.dev/packages/${pkg.name}`,
    codeRepository: "https://github.com/UjjvalGandhi/liquid_glass_bottom_nav",
    programmingLanguage: ["Dart", "Swift"],
    runtimePlatform: "Flutter",
    targetProduct: pkg.platform,
    license: "https://opensource.org/licenses/MIT",
    author,
  }));

  const schemas = [personSchema, websiteSchema, profilePageSchema, ...packageSchemas];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
