# deepanshulathar.com

Source of my portfolio site: [deepanshulathar.com](https://deepanshulathar.com). It is written for someone skimming many candidates at once: the home page carries the name, role, a Summer 2027 internship availability line, the résumé link and contact options, and each project page states a status label.

[Live site](https://deepanshulathar.com) | [Résumé (PDF)](Deepanshu-Lathar-Resume.pdf) | [GitHub](https://github.com/latharrr)

| At a glance | |
|---|---|
| **What it is** | Static site: home, work (filterable), expertise, about, contact, three project pages, sidequests, plus a Lathar Labs section |
| **Stack** | HTML, one stylesheet (`ui.css`), one script (`ui.js`). No framework, no bundler. Two Vercel serverless functions |
| **Design** | Violet and navy flat colour blocks, Anton display type, Inter body, motion that reveals once on scroll. See [DESIGN.md](DESIGN.md) |
| **Hosting** | Vercel, clean URLs, redirects in `vercel.json` |
| **Fonts** | Self-hosted Anton and Inter (latin subsets) in `fonts/` |
| **Data** | GitHub numbers on the open-source ledger come live from the GitHub API and show nothing when it is unreachable |

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, proof marquee, stats, expertise, selected work, tenure, long-form, FAQ |
| `/work` | Every project, filterable by type and sector |
| `/expertise` | AI systems, attribution, internal tools and products, each with proof |
| `/about` | Story, timeline, skills, credentials |
| `/contact` | Brief form that opens WhatsApp or email with the brief filled in; nothing is stored |
| `/proofmart`, `/gapl`, `/lputv` | One case study per project |
| `/sidequests` | Writing and the live open-source ledger |
| `/labs`, `/labs/whatsapp-receptionist`, `/labs/privacy` | Lathar Labs |
| `/privacy`, `/support` | Privacy policy and support |
| `/resume`, `/cv` | Redirect to the PDF |

## How it is built

- **Pages are generated.** Page bodies live in `src/pages/*.html`, each starting with a short front-matter comment (output file, path, title, description). `tools/build.py` wraps them in the shared head, header, menu and footer and writes the HTML files in the site root. Edit `src/`, then rebuild. Never hand-edit the generated `.html` files.
- **Shared parts.** `{{marquee}}`, `{{cta}}`, `{{faq}}` and `{{arrow}}` in a page body are filled in by the build. The FAQ text lives in `src/faq.json` and also becomes FAQPage schema.
- **Motion.** `ui.js` handles the loader (first page of a visit only), menu, marquee, reveal-once sections, word-by-word headline reveals, scroll-linked word fill, count-ups, the `--progress` scroll variable, the accordion, work filters and the contact form. Everything is at rest under reduced motion.
- **Live GitHub data.** `api/github.mjs` and `api/contributions.mjs` are serverless functions the browser calls when the ledger nears the viewport (`oss.js`). Nothing there is hard-coded.
- **Analytics load late.** Google Analytics and Microsoft Clarity run on the home page only, start after the first scroll, tap, key press or pointer move, can be switched off at `/privacy`, and stay off for browsers sending Global Privacy Control or Do Not Track.

## Run it locally

No install step.

```bash
python3 tools/build.py          # regenerate every page from src/
node tools/serve.js . 8811      # http://localhost:8811, with Vercel-style clean URLs and a 404 page
```

## Repo layout

```
src/pages/        page bodies (source of truth)
src/faq.json      FAQ questions and answers
*.html, labs/     generated pages, do not edit by hand
ui.css, ui.js     shared design and behaviour
oss.js            the open-source ledger
api/              GitHub stats and contribution calendar functions
assets/, fonts/   images (WebP with 800 px variants) and self-hosted fonts
tools/            build script and local server
design/           share-image source (design/og-image.html renders assets/og-portrait.png)
```

## Notes

- Business-brand references use **Lathar Labs**. The personal name Deepanshu Lathar, contact details, routes and existing service/policy scope are unchanged. This rename does not represent Meta approval or launch a multi-client service.

- Content is checked by hand against the résumé; there is no automated test suite or CI for this repo.
- Facts such as role, availability and project status change over time and are updated in the pages themselves.

## Author

Deepanshu Lathar - [@latharrr](https://github.com/latharrr)
