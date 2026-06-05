import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import {
  renderDocs,
  renderExecutionLane,
  renderOverview,
  renderPromptLibrary,
  renderVerification
} from "../src/services/render";

const siteDir = join(process.cwd(), "site");

mkdirSync(siteDir, { recursive: true });

const routes = [
  { path: "index.html", content: renderOverview() },
  { path: "prompt-library/index.html", content: renderPromptLibrary() },
  { path: "execution-lane/index.html", content: renderExecutionLane() },
  { path: "verification/index.html", content: renderVerification() },
  { path: "docs/index.html", content: renderDocs() }
];

for (const route of routes) {
  const output = join(siteDir, route.path);
  mkdirSync(join(output, ".."), { recursive: true });
  writeFileSync(output, route.content, "utf8");
}

writeFileSync(
  join(siteDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: http://promptops.kineticgain.com/sitemap.xml\n`,
  "utf8"
);

writeFileSync(
  join(siteDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>http://promptops.kineticgain.com/</loc></url>\n  <url><loc>http://promptops.kineticgain.com/prompt-library/</loc></url>\n  <url><loc>http://promptops.kineticgain.com/execution-lane/</loc></url>\n  <url><loc>http://promptops.kineticgain.com/verification/</loc></url>\n  <url><loc>http://promptops.kineticgain.com/docs/</loc></url>\n</urlset>\n`,
  "utf8"
);
