export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ujjawal Gandhi",
    url: "https://ujjvalgandhi.online",
    email: "ujjval2804@gmail.com",
    telephone: "+919998760436",
    image: "https://ujjvalgandhi.online/og-image.png",
    jobTitle: "Flutter Developer",
    worksFor: {
      "@type": "Organization",
      name: "Park Universal PVT. LTD",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Anand",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: [
      "https://linkedin.com/in/ujjvalgandhi",
      "https://github.com/UjjvalGandhi",
      "https://pub.dev/packages/liquid_glass_bottom_nav_native",
      "https://pub.dev/packages/liquid_glass_bottom_nav_cli",
    ],
    knowsAbout: [
      "Flutter",
      "Dart",
      "Firebase",
      "GetX",
      "Android Development",
      "iOS Development",
      "Cross-platform Development",
      "Flutter Package Development",
      "Flutter Plugin Development",
      "Open Source Software",
      "REST APIs",
      "MongoDB",
      "IoT",
    ],
  };

  const author = { "@type": "Person", name: "Ujjawal Gandhi", url: "https://ujjvalgandhi.online" };

  const packageSchemas = [
    {
      name: "liquid_glass_bottom_nav_native",
      description:
        "Native iOS 26 Liquid Glass bottom tab bar (real UITabBarController) with morphing search tab, for Flutter.",
      platform: "iOS",
    },
    {
      name: "liquid_glass_bottom_nav_cli",
      description:
        "Installs liquid_glass_bottom_nav into a Flutter project and configures the native iOS side it needs to render.",
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ujjawal Gandhi — Flutter Developer",
    url: "https://ujjvalgandhi.online",
    description:
      "Portfolio of Ujjawal Gandhi, a Flutter developer building cross-platform apps for Android, iOS, Web & Desktop.",
    author: {
      "@type": "Person",
      name: "Ujjawal Gandhi",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {packageSchemas.map(schema => (
        <script
          key={schema.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
