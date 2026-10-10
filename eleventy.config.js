import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";

const md = markdownIt({ html: true, linkify: true, typographer: true });

// Dates come in as JS Dates (front matter) or "YYYY-MM-DD" strings (JSON data
// written by the CMS). Treat both as calendar days in UTC so they never shift.
function toDate(value) {
  if (value instanceof Date) return value;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(value.slice(0, 10) + "T00:00:00Z");
  }
  return new Date(value);
}

const formats = {
  full: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
  long: { year: "numeric", month: "long", day: "numeric" },
  short: { year: "numeric", month: "short", day: "numeric" },
};

export default function (eleventyConfig) {
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));
  eleventyConfig.addFilter("mdInline", (s) => (s ? md.renderInline(String(s)) : ""));
  eleventyConfig.addFilter("date", (value, style = "long") =>
    new Intl.DateTimeFormat("en-US", { ...formats[style], timeZone: "UTC" }).format(toDate(value))
  );
  eleventyConfig.addFilter("isoDate", (value) => toDate(value).toISOString().slice(0, 10));
  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);

  // Structured data that helps search engines show the site for his name.
  eleventyConfig.addFilter("personSchema", (site, image, url) => {
    const sameAs = [site.facebook, site.instagram].filter(Boolean);
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.title,
      jobTitle: site.tagline,
      url,
      image,
      ...(sameAs.length && { sameAs }),
    };
  });

  eleventyConfig.addCollection("news", (api) =>
    api.getFilteredByGlob("src/news/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("plays", (api) =>
    api.getFilteredByGlob("src/plays/*.md").sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  // Every <img> in the output is resized and converted to modern formats at
  // build time, so photos uploaded through the editor stay fast to load.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "auto"],
    widths: [480, 960, 1600, "auto"],
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async" },
    },
  });

  eleventyConfig.addFilter("featuredPlay", (plays) => plays.find((p) => p.data.featured) || plays[0]);

  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
