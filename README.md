# Protocol Simulation — official website

A complete, dependency-free static website. No React/Vite compilation, npm installation, server, database or paid hosting is required. HTML files are directly editable. The shared styling and functionality live in `assets/site.css` and `assets/site.js`.

## Deploy on GitHub Pages

1. Back up or commit your old project. Keep the existing `.git` directory if using Git locally. Remove obsolete website files (old `src/`, `node_modules/`, `public/`, Vite configuration, package manifests, etc.) only after backup. Do not remove your `.git` or a needed `CNAME`.
2. Extract the contents of this archive into the actual GitHub Pages publishing folder, with `index.html` directly in that folder. Do not nest the extracted site inside another folder.
3. In the correct GitHub repository, check Settings > Pages > Build and deployment. Choose **Deploy from a branch**, then `main` and `/(root)` (or the folder you actually publish from). Commit/push.
4. The uploaded ZIP's Git remote pointed at `MasoodSaamer/Website_for_GameApps`, whereas the public Google Play developer page points at `protocolsimulation.github.io` and app privacy links point at `protocolsimulation.github.io/ProtocolGamesWebsite/privacy-policy.html`. Verify which repository you are updating. Deploying the ZIP to the older remote alone may not change the public Google Play-linked website.
5. To preserve the domain-wide advertising authorization, ensure `https://protocolsimulation.github.io/app-ads.txt` is accessible at the domain root. The file is copied byte-for-byte from the supplied project. Confirm its seller IDs against your ad network dashboards. Keep the published privacy URL accessible; the ZIP includes both `privacy-policy.html` and `ProtocolGamesWebsite/privacy-policy.html` for root-site compatibility.

Preview locally: open `index.html`, or run `python -m http.server 8000` from the extracted folder and open `http://localhost:8000/`.

## Content and images

- Nine featured games with Google Play links, including current title spellings, official screenshot URLs, and public download thresholds checked 2026-11-25. The combined thresholds total 6.25 million, displayed conservatively as 6M+. They are not unique players or private analytics.
- `assets/catalogue.json` is the editorial reference for titles, descriptions, screenshots and dates. To edit the displayed site, edit the corresponding HTML pages; the JSON is a reference, not a runtime dependency.
- Official screenshots are embedded from Google Play's `play-lh.googleusercontent.com` CDN (two per featured game). The supplied old `src` images/videos are not used. The CDN was accessible to web research, but binary image downloads were blocked in the build environment. The site falls back to a new local vector graphic if a screenshot cannot load. For fully self-hosted artwork, run `python tools/localize_images.py` from your computer with internet access. The optional script downloads official images and rewrites the corresponding HTML and JSON paths automatically. Failed downloads keep their original remote links. This is not required to deploy the site. No third-party stock art or fabricated gameplay screenshots are used.
- The public publisher profile lists eight visible titles, with Corolla also confirmed through its direct current store page. The old project has other titles; Revo Hilux and German Car Simulator returned older cached listings but were not in the current profile; Honda Civic, Sports India and Japan listings could not be currently confirmed. They are excluded from the featured catalogue until availability is verified. This is not a claim that they have been permanently removed.
- News uses public listing update dates rather than fictional announcements. Blog entries are new general player guides.
- The original project used EmailJS. This version intentionally opens a prefilled email draft instead, using the public support address. It does not falsely report an email as sent. No EmailJS secrets or identifiers are carried into the package.
- The newer, live September 20, 2025 app privacy policy is retained rather than the older August 19, 2024 React copy. A separate website disclosure and a data request contact page were added. Review the actual app SDKs, data safety declarations, account deletion mechanisms, retention practices and applicable legal requirements before publishing; this is not a legal compliance audit.
- Existing YouTube and Instagram URLs are carried from your source, not independently authenticated. New brand mark and fallback are simple original vector artwork, not official store icons.

## Structure

- `index.html` — homepage
- `games/index.html` — searchable/filterable/sortable game catalogue
- `games/<slug>/index.html` — individual game pages and image gallery
- `news/`, `blog/`, `about/`, `support/` — content pages
- `privacy-policy.html`, `privacy-policy/`, `data-deletion.html` — legal/support routes
- `published-games/`, `contact-us/`, `ProtocolGamesWebsite/` — compatibility URLs
- `404.html`, `.nojekyll`, `app-ads.txt`, `googled01904a46673d979.html`

No old source images, Git history or node_modules are included. Never overwrite your `.git` folder.
