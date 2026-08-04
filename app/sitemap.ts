import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devcanvas-ai.vercel.app";

  return [
    {
      url: baseUrl,
      priority: 1,
    },

    {
      url: `${baseUrl}/dashboard`,
      priority: 0.9,
    },

    {
      url: `${baseUrl}/tools/json-explain`,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/tools/regex-generator`,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/tools/markdown-generator`,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/tools/readme-generator`,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/tools/git-commit-generator`,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/tools/color-palette-generator`,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/tools/fake-data-generator`,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/tools/api-mock-generator`,
      priority: 0.8,
    },
  ];
}