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
    ],
    knowsAbout: [
      "Flutter",
      "Dart",
      "Firebase",
      "GetX",
      "Android Development",
      "iOS Development",
      "Cross-platform Development",
      "REST APIs",
      "MongoDB",
      "IoT",
    ],
  };

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
    </>
  );
}
