import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const routeFiles = [
  "dist/index.html",
  "dist/about-us/index.html",
  "dist/services/index.html",
  "dist/agency-services/index.html",
  "dist/contact/index.html",
];

const errors = [];
for (const routeFile of routeFiles) {
  const html = await readFile(join(root, routeFile), "utf8");
  const h1Count = (html.match(/<h1[ >]/g) ?? []).length;
  if (h1Count !== 1) errors.push(`${routeFile}: expected one h1, found ${h1Count}`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${routeFile}: missing title`);
  if (!/<meta name="description"/.test(html)) errors.push(`${routeFile}: missing description`);
  if (!/<link rel="canonical"/.test(html)) errors.push(`${routeFile}: missing canonical`);
  if (!/<a class="skip-link" href="#main-content">/.test(html)) {
    errors.push(`${routeFile}: missing skip link`);
  }
}

const contact = await readFile(join(root, "dist/contact/index.html"), "utf8");
for (const field of ["first-name", "last-name", "email", "message"]) {
  if (!contact.includes(`for="${field}"`)) errors.push(`contact: missing label for ${field}`);
}
if (!contact.includes('aria-live="polite"')) errors.push("contact: missing form status region");

const css = await readFile(join(root, "dist/styles.css"), "utf8");
if (!css.includes("prefers-reduced-motion")) errors.push("styles: missing reduced-motion rules");
if (!css.includes(":focus-visible")) errors.push("styles: missing visible focus rules");

const agency = await readFile(join(root, "dist/agency-services/index.html"), "utf8");
for (const fact of ["Healthcare Assistants", "Social Care Workers", "Cavan, Monaghan, Louth &amp; Westmeath", "Compliance passport"]) {
  if (!agency.includes(fact)) errors.push(`agency services: missing ${fact}`);
}
if (!agency.includes("hr@hopefulheartsltd.com") || !agency.includes("+353 83 339 8580")) {
  errors.push("agency services: missing direct agency contact details");
}
if (
  !contact.includes("maps.google.com/maps?hl=en&amp;q=H12%20DX93%2C%20Ireland") ||
  !contact.includes("destination=H12%20DX93%2C%20Ireland") ||
  !contact.includes("Get directions")
) {
  errors.push("contact: missing interactive map or directions link");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Static accessibility and metadata checks passed.");
}
