/* ──────────────────────────────────────────────────────────────
   Single source of truth — mirrors /public/resume.pdf
   Update here and the whole site follows.
   ────────────────────────────────────────────────────────────── */

export const profile = {
  name: "Ujjawal Gandhi",
  first: "UJJAWAL",
  last: "GANDHI",
  role: "Full Stack Developer",
  roles: ["Flutter", "Next.js", "Node.js"],
  location: "Anand, Gujarat, India",
  email: "ujjval2804@gmail.com",
  phone: "+91 99987 60436",
  phoneHref: "tel:+919998760436",
  site: "https://ujjvalgandhi.online",
  siteLabel: "ujjvalgandhi.online",
  linkedin: "https://linkedin.com/in/ujjvalgandhi",
  github: "https://github.com/UjjvalGandhi",

  /* ── Résumé link ──────────────────────────────────────────────
     Cloudflare sits in front of this site, caches .pdf at the edge
     by default, and rewrites Cache-Control to its 4-hour Browser
     Cache TTL. A fixed /resume.pdf URL therefore keeps serving the
     previous file to anyone who already fetched it.

     The ?v= stamp makes each new résumé a new URL, which both the
     browser and the Cloudflare edge treat as a fresh object.

     >>> BUMP THIS DATE WHENEVER public/resume.pdf CHANGES. <<<     */
  resumeUrl: "/resume.pdf?v=2026-11-17",
  summary:
    "Full stack developer with two years of experience building cross-platform apps in Flutter, web apps in Next.js, and REST APIs in Node.js and Express. I ship Android, iOS, web and desktop builds from one Dart codebase with GetX and CI/CD, and deploy APIs on AWS Lambda and Oracle Cloud.",
  summaryTail:
    "I also publish open-source Flutter packages on pub.dev — including a native iOS 26 Liquid Glass tab bar that scores a perfect 160/160.",
};

export const stats = [
  { value: "2+",       label: "Years shipping",     hint: "Flutter · Next.js · Node" },
  { value: "4",        label: "Platforms, 1 codebase", hint: "iOS · Android · Web · Desktop" },
  { value: "160/160",  label: "Pub points",         hint: "Max score on pub.dev" },
  { value: "8.91",     label: "MCA CGPA",           hint: "Charusat University" },
];

export type SkillGroup = {
  key: string;
  title: string;
  accent: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "lang",
    title: "Languages",
    accent: "#22D3EE",
    items: ["Dart", "JavaScript", "TypeScript", "Java", "PHP", "Python", "C / C++", "Embedded C"],
  },
  {
    key: "mobile",
    title: "Mobile & Cross-Platform",
    accent: "#818CF8",
    items: ["Flutter", "GetX", "Dio", "Firebase Cloud Messaging", "Platform channels", "Native iOS (UIKit)", "Android", "Desktop"],
  },
  {
    key: "web",
    title: "Web Frontend",
    accent: "#F472B6",
    items: ["Next.js (React)", "Flutter Web", "pluto_grid dashboards"],
  },
  {
    key: "backend",
    title: "Backend & Database",
    accent: "#A3E635",
    items: ["Node.js", "Express", "Sequelize", "MySQL", "Firebase", "REST APIs", "JWT auth"],
  },
  {
    key: "cloud",
    title: "Cloud & Deployment",
    accent: "#FBBF24",
    items: ["AWS Lambda", "AWS EC2", "Oracle Cloud (OCI)", "CI/CD pipelines", "Cloudflare", "cPanel", "TestFlight"],
  },
  {
    key: "tools",
    title: "Tools & Systems",
    accent: "#2DD4BF",
    items: ["Android Studio", "VS Code", "Xcode", "Git & GitHub", "MongoDB Compass", "Arduino IDE", "NetBeans", "macOS / Windows"],
  },
];

/* Marquee band */
export const marqueeTags = [
  "Flutter", "Dart", "Next.js", "React", "Node.js", "Express", "Sequelize",
  "MySQL", "Firebase", "GetX", "Dio", "AWS Lambda", "Oracle Cloud", "REST APIs",
  "JWT", "CI/CD", "Swift / UIKit", "Platform Channels", "TestFlight",
  "pluto_grid", "Cloudflare", "Embedded C",
];

export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  points: { title: string; body: string }[];
  stack: string[];
};

export const jobs: Job[] = [
  {
    role: "Flutter Developer",
    company: "Park Universal Pvt. Ltd.",
    location: "Anand, Gujarat",
    period: "May 2025 — Present",
    current: true,
    summary:
      "Own a multi-platform ERP product that integrates proprietary software with Tally, the ERP most Indian businesses run on.",
    points: [
      {
        title: "Cross-platform ERP integration",
        body: "Built and deployed web, Android, iOS and desktop from a single Flutter codebase, integrating proprietary software with Tally.",
      },
      {
        title: "Core features",
        body: "Data synchronisation, transaction posting, report generation and real-time data exchange between Tally and the custom application.",
      },
      {
        title: "Server-driven screen architecture",
        body: "Screens render from server configuration, so new forms, fields and report layouts reach users without shipping a new app release.",
      },
      {
        title: "Modular package structure",
        body: "Split shared code into reusable internal Flutter packages for widgets, API clients and models — versioned once, consumed by every platform build.",
      },
      {
        title: "CI/CD and releases",
        body: "Set up and maintain automated build and release pipelines, so each merge produces installable builds for testers instead of manual local builds.",
      },
      {
        title: "Next.js web development",
        body: "Develop and maintain a confidential company web application in Next.js, building new features and UI components.",
      },
    ],
    stack: ["Flutter", "GetX", "Dart", "Tally ERP", "Next.js", "CI/CD", "Desktop"],
  },
  {
    role: "Flutter Developer",
    company: "WebEarl Technologies Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    period: "Nov 2024 — Apr 2025",
    summary:
      "Shipped CricGem, a fantasy cricket platform, to Android and iOS from one Flutter codebase.",
    points: [
      {
        title: "CricGem — fantasy cricket platform",
        body: "Built a platform where users create, manage and join cricket leagues, with real-time data syncing and identical behaviour on Android and iOS from one codebase.",
      },
      {
        title: "Security & engagement",
        body: "Implemented security controls and a clean interface that lifted engagement across both platforms.",
      },
    ],
    stack: ["Flutter", "Dart", "Firebase", "Android", "iOS"],
  },
];

export type Project = {
  num: string;
  name: string;
  tagline: string;
  period?: string;
  badge?: string;
  featured?: boolean;
  body: string;
  backend?: string;
  tags: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    num: "01",
    name: "HP-Prasadam",
    tagline: "Temple festival logistics, at state scale",
    period: "Sep 2025 — Aug 2026",
    badge: "TestFlight",
    featured: true,
    body:
      "A cross-platform logistics platform for iOS, Android and web with role-based experiences for administrators and zone coordinators, built on GetX and Dio. A web admin dashboard built with pluto_grid tracks prasadam quantities and fulfilment percentages per zone, with Firebase Cloud Messaging for targeted push alerts.",
    backend:
      "REST API in Node.js, Express, Sequelize and MySQL, deployed serverlessly on AWS Lambda, with JWT authentication and an English/Gujarati data model.",
    tags: ["Flutter", "GetX", "Dio", "pluto_grid", "Node.js", "AWS Lambda", "MySQL", "FCM"],
    accent: "#22D3EE",
  },
  {
    num: "02",
    name: "Parabhakti",
    tagline: "Meal counts across multiple states, live",
    badge: "TestFlight",
    featured: true,
    body:
      "A Flutter application that centrally tracks temple devotee meal counts for breakfast, lunch and dinner across multiple states, pushing real-time notifications to administrators on every update so coordinators can plan quantities accurately.",
    backend: "Backend API and web frontend deployed to Oracle Cloud Infrastructure (OCI).",
    tags: ["Flutter", "Node.js", "Oracle Cloud", "Real-time", "TestFlight"],
    accent: "#818CF8",
  },
  {
    num: "03",
    name: "AVD Kitchen",
    tagline: "Grocery inventory, same-day visibility",
    body:
      "A Flutter inventory management application that lets administrators record daily grocery inflow category-wise and godown-wise, with Firebase Cloud Messaging wired in so stock movement is tracked and acted on the same day.",
    tags: ["Flutter", "Firebase", "FCM", "Inventory"],
    accent: "#F472B6",
  },
  {
    num: "04",
    name: "Smart Door Lock System",
    tagline: "Fingerprint, RFID and push-button access",
    period: "Jun 2024 — Nov 2024",
    body:
      "A smart door lock with fingerprint, RFID and push-button access, controlled through a Flutter app and implemented in Embedded C on the hardware side.",
    tags: ["Flutter", "Embedded C", "RFID", "IoT"],
    accent: "#FBBF24",
  },
  {
    num: "05",
    name: "Online Course Registration",
    tagline: "Enrolment system on PHP & MySQL",
    period: "Dec 2022 — Jun 2023",
    body:
      "An online course registration system where users register, log in and enrol in free courses, built with PHP and MySQL.",
    tags: ["PHP", "MySQL", "Web"],
    accent: "#A3E635",
  },
];

export const education = [
  {
    degree: "Master of Computer Applications",
    short: "MCA",
    university: "Charusat University",
    year: "2025",
    score: "8.91",
  },
  {
    degree: "Bachelor of Computer Applications",
    short: "BCA",
    university: "Sardar Patel University",
    year: "2023",
    score: "8.52",
  },
];
