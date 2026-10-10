import { readFile } from "node:fs/promises";

// The site's public address, used for canonical links, share previews and the sitemap.
// On Netlify, URL is the primary address: the netlify.app address now, and the custom
// domain automatically once one is added (after the next deploy). Local builds fall
// back to the address in site.json.
export default async function () {
  if (process.env.URL) return process.env.URL;
  const site = JSON.parse(await readFile(new URL("./site.json", import.meta.url), "utf8"));
  return site.url || "http://localhost:8080";
}
