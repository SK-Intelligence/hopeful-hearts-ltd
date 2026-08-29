# Hopeful Hearts website

A production-oriented, dependency-free rebuild of the Hopeful Hearts Ltd website. The site preserves the organisation's verified family-support pages, incorporates the agency staffing and resident transport information supplied by the organisation, and provides accessible contact interactions.

## Run locally

```bash
npm run dev
```

Open <http://127.0.0.1:4173>.

## Commands

- `npm run dev` — build and serve the site locally
- `npm run build` — generate the production site in `dist/`
- `npm test` — build and run content, metadata and accessibility regression tests
- `npm run lint` — run static accessibility and metadata checks

No package installation is required. Node.js 22 or later is the only runtime dependency.

## Brand palette

The interface derives its core colours from the supplied Hopeful Hearts mark:

- Navy `#1F1053` and dark navy `#140936` for structure and primary actions
- Pink `#FE5DB2` and accessible strong pink `#A21D6A` for brand accents, active states and focus
- Ink `#292130` and muted text `#665B6B`
- Warm cream `#FAF6F0` and paper `#FFFDFB`
- Border `#DDD3E1`, soft tint `#F8EAF3` and tint border `#E6CFDF`

The complete token set is defined at the top of `src/styles.css`.

### Optional browser QA

The browser suite captures Home, About, Services and Contact at 1440px, 768px and 390px, then tests the mobile menu, FAQ accordion, contact validation, horizontal overflow and browser console:

```bash
python3 -m pip install playwright
python3 tests/browser_test.py
```

The script uses an installed Google Chrome when available and writes screenshots to `outputs/screenshots/`.

## Structure

- `src/site.mjs` — shared header, footer, CTA, service, FAQ and page templates
- `src/styles.css` — design tokens, responsive layouts and interaction styling
- `src/client.js` — mobile navigation, FAQ accordion and form validation
- `public/` — locally stored brand and editorial image assets, plus crawl metadata
- `scripts/` — dependency-free build, server and validation tooling
- `tests/` — regression coverage for routes, content and accessibility safeguards

## Contact form integration

The live site's submission endpoint could not be verified. This local build validates all fields and clearly tells users that their message has not been transmitted. Before production launch, connect the form to an approved secure endpoint and add the organisation's required privacy/data-handling text.
