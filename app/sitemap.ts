import type { MetadataRoute } from "next";

const BASE_URL = "https://deepanshulathar.dev";

const routes = [
  "",
  "/work",
  "/work/proofmart",
  "/work/gapl",
  "/experience",
  "/writing",
  "/about",
  "/resume",
  "/archive",
  "/labs",
  "/labs/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.7,
  }));
}
