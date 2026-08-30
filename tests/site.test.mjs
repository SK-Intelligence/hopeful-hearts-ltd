import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { pages } from "../src/site.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));

test("all required routes are generated", () => {
  assert.deepEqual(Object.keys(pages), ["/", "/about-us/", "/services/", "/agency-services/", "/contact/"]);
});

test("every route has one h1 and unique metadata", () => {
  const titles = new Set();
  for (const [route, html] of Object.entries(pages)) {
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, route);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title, `${route} title`);
    assert.ok(!titles.has(title), `${route} unique title`);
    titles.add(title);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<link rel="canonical"/);
    assert.match(html, /<main id="main-content">/);
  }
});

test("navigation and contact facts remain consistent", () => {
  for (const html of Object.values(pages)) {
    assert.match(html, /href="\/about-us\/"/);
    assert.match(html, /href="\/services\/"/);
    assert.match(html, /href="\/agency-services\/"/);
    assert.match(html, /href="\/contact\/"/);
    assert.match(html, /\+353 87 277 9096/);
    assert.match(html, /info@hopefulheartsltd\.com/);
    assert.match(html, /hopefulheartsscs@gmail\.com/);
    assert.match(html, /hr@hopefulheartsltd\.com/);
    assert.match(html, /21 Lakeview, The Fair Green, Cavan, H12 DX93/);
  }
});

test("agency source content, editorial imagery, location and direct contact actions are present", async () => {
  const agency = pages["/agency-services/"];
  for (const fact of [
    "Healthcare Assistants",
    "Social Care Workers",
    "Cavan, Monaghan, Louth &amp; Westmeath",
    "All-Ireland resident transport",
    "Compliance passport",
    "Three independently verified references",
    "hr@hopefulheartsltd.com",
    "+353 83 339 8580",
  ]) assert.ok(agency.includes(fact), `agency services include ${fact}`);
  assert.ok(!agency.includes("hopeful-hearts-agency-booklet.pdf"));
  assert.match(agency, /care-support-window\.jpg/);
  assert.match(pages["/services/"], /family-connection-dock\.jpg/);

  await readFile(join(root, "public/assets/care-support-window.jpg"));
  await readFile(join(root, "public/assets/family-connection-dock.jpg"));

  const contact = pages["/contact/"];
  assert.match(contact, /maps\.google\.com\/maps\?hl=en&amp;q=H12%20DX93%2C%20Ireland&amp;z=17&amp;output=embed/);
  assert.match(contact, /destination=H12%20DX93%2C%20Ireland/);
  assert.match(contact, /Get directions/);
  for (const html of Object.values(pages)) {
    assert.match(html, /wa\.me\/353872779096/);
    assert.match(html, /aria-label="Chat with Hopeful Hearts on WhatsApp/);
  }
});

test("brand identity stays aligned with the supplied Hopeful Hearts mark", async () => {
  const home = pages["/"];
  assert.match(home, /We all need somebody to believe in us/);
  assert.match(home, /hopeful-hearts-mark\.png/);
  for (const html of Object.values(pages)) {
    assert.match(html, /tusla-logo\.png/);
    assert.match(html, /hopeful-hearts-og-brand\.jpg/);
  }

  await readFile(join(root, "public/assets/hopeful-hearts-mark.png"));
  await readFile(join(root, "public/assets/tusla-logo.png"));
  await readFile(join(root, "public/assets/hopeful-hearts-og-brand.jpg"));

  const css = await readFile(join(root, "src/styles.css"), "utf8");
  for (const token of [
    "--brand-navy: #1f1053",
    "--brand-navy-dark: #140936",
    "--brand-pink: #fe5db2",
    "--brand-pink-strong: #a21d6a",
    "--cream: #faf6f0",
    "--paper: #fffdfb",
  ]) assert.match(css, new RegExp(token));

  for (const retiredColour of ["#285447", "#193c32", "#e8eee9", "#d96f58"]) {
    assert.ok(!css.includes(retiredColour), `retired colour ${retiredColour}`);
  }
});

test("services and FAQs preserve the verified content inventory", () => {
  const home = pages["/"];
  const awardUrl = "https://www.eubusinessnews.com/winners/hopeful-hearts-ltd/";
  assert.match(home, /National recognition for Hopeful Hearts Ltd/);
  assert.match(home, /Best Family Reconciliation &amp; Community Support Service 2026 – Ulster/);
  assert.match(home, new RegExp(`href="${awardUrl}" target="_blank" rel="noopener noreferrer"`));
  assert.match(home, /Family support, agency staffing &amp; resident transport services/);
  assert.ok(!home.includes("Family support &amp; social care in Cavan"));
  assert.ok(home.indexOf("award-recognition") > home.indexOf("partner-section"));
  assert.ok(home.indexOf("award-recognition") < home.indexOf("contact-cta section"));
  assert.match(home, /id="services"/);
  assert.match(home, /What each service involves/);
  assert.match(home, /Agency Staffing &amp; Resident Transport/);
  assert.equal((home.match(/class="home-service-detail(?: |")/g) ?? []).length, 6);
  for (const id of [
    "supervised-family-access",
    "supervised-access-transport",
    "community-outreach",
    "emergency-outreach",
    "other-emergency-support",
    "agency-staffing-transport",
  ]) assert.match(home, new RegExp(`href="#${id}"`));

  const services = pages["/services/"];
  for (const heading of [
    "Supervised Family Access Service",
    "Supervised Access Transport for Children",
    "Community Outreach Support Service",
    "Emergency Outreach Support Service",
    "Other Emergency Support Service",
  ]) assert.match(services, new RegExp(heading));

  const contact = pages["/contact/"];
  assert.equal((contact.match(/data-faq-button/g) ?? []).length, 4);
  assert.match(contact, /What kind of training/);
  assert.match(contact, /How can I make a complaint/);
});

test("built assets include accessibility safeguards", async () => {
  const css = await readFile(join(root, "dist/styles.css"), "utf8");
  const script = await readFile(join(root, "dist/client.js"), "utf8");
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.mobile-menu \{\s+position: absolute;\s+top: 100%;/);
  assert.match(script, /aria-expanded/);
  assert.match(script, /aria-invalid/);
});
