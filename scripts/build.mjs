import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { notFoundPage, pages } from "../src/site.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

await Promise.all([
  cp(join(root, "public"), output, { recursive: true }),
  readFile(join(root, "src", "styles.css"), "utf8").then((content) =>
    writeFile(join(output, "styles.css"), content),
  ),
  readFile(join(root, "src", "client.js"), "utf8").then((content) =>
    writeFile(join(output, "client.js"), content),
  ),
]);

for (const [route, html] of Object.entries(pages)) {
  const destination =
    route === "/"
      ? join(output, "index.html")
      : join(output, route.replace(/^\//, ""), "index.html");

  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

await writeFile(join(output, "404.html"), notFoundPage);

console.log(`Built ${Object.keys(pages).length} routes into ${output}`);
