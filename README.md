# deepanshulathar.com

Source of my portfolio site: [deepanshulathar.com](https://deepanshulathar.com). It is written for someone skimming many candidates at once, so name, role, availability, résumé and email are on the first screen, and every project states its real status.

[Live site](https://deepanshulathar.com) | [Résumé (PDF)](Deepanshu-Lathar-Resume.pdf) | [GitHub](https://github.com/latharrr)

| At a glance | |
|---|---|
| **What it is** | Hand-written static site: home, about, three project pages, writing and open-source page, plus a separate Labs section |
| **Stack** | HTML, CSS and a little vanilla JavaScript. No framework, no bundler. Two Vercel serverless functions |
| **Hosting** | Vercel, clean URLs, redirects in `vercel.json` |
| **Fonts** | Self-hosted (Averia Serif Libre, Mona Sans) |
| **Data** | GitHub numbers on the open-source page come live from the GitHub API and show nothing when it is unreachable |

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, selected work, proof points, sidequests teaser |
| `/about` | Bio, experience, skills, credentials |
| `/proofmart`, `/gapl`, `/lputv` | One page per project with status, screenshots and links to the source |
| `/sidequests` | Writing and an open-source ledger fed by live GitHub data |
| `/labs` | Deepanshu Labs, an independent studio page with its own design notes |
| `/resume`, `/cv` | Redirect to the PDF |
| `/privacy`, `/support` | Privacy notice and support contact |

## How it is built

- **Plain files.** Each page is one `.html` file. `styles.css` is the source of truth and is copied, lightly minified, into a `<style>` block in every page so first paint does not wait for a stylesheet request.
- **Shared header and footer** live in `index.html` and are copied into the other pages by a script.
- **Live GitHub data.** `api/github.mjs` and `api/contributions.mjs` are serverless functions the browser calls when the open-source section nears the viewport (`oss.js`). Nothing there is hard-coded.
- **Analytics load late.** Google Analytics and Microsoft Clarity start only after the first scroll, tap, key press or pointer move, can be switched off at `/privacy`, and stay off for browsers sending Global Privacy Control.
- **Design system.** [DESIGN.md](DESIGN.md) records colours, type and components; [PRODUCT.md](PRODUCT.md) records the audience and the rule that every claim must be traceable.

## Run it locally

No install step.

```bash
node tools/serve.js . 8811      # http://localhost:8811, with Vercel-style clean URLs and a 404 page
```

After editing shared parts:

```bash
python3 tools/sync-pages.py     # copy header, say-hi window and footer from index.html into every page
python3 tools/inline-css.py     # copy styles.css into each page's <style> block
```

## Repo layout

```
*.html            pages (index, about, gapl, proofmart, lputv, sidequests, privacy, support, 404)
styles.css        design source, inlined into pages by tools/inline-css.py
site.js, oss.js   interactions and the open-source section
api/              GitHub stats and contribution calendar functions
assets/, fonts/   images (WebP with 800 px variants) and self-hosted fonts
labs/             Deepanshu Labs pages
tools/            local server and page generators
design/           design system notes and the share-image source
```

## Notes

- Content is checked by hand against the résumé; there is no automated test suite or CI for this repo.
- Facts such as role, availability and project status change over time and are updated in the pages themselves.

## Author

Deepanshu Lathar - [@latharrr](https://github.com/latharrr)
