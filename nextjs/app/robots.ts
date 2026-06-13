import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: "https://ujjvalgandhi.online/sitemap.xml",
    host: "https://ujjvalgandhi.online",
  };
}
