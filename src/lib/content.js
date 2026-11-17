/**
 * Single source of truth for every piece of copy / data on the site.
 * Edit `src/data/portfolio.json` — components never hard-code content.
 */
import data from "@/data/portfolio.json";

export const site = data.site;
export const socials = data.socials;
export const navigation = data.navigation;
export const footer = data.footer;

/** Returns the data object for a page (e.g. "home"). */
export function getPage(name) {
  const page = data.pages[name];
  if (!page) throw new Error(`Unknown page "${name}" in portfolio.json`);
  return page;
}

export default data;
