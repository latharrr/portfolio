# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: internship recruiters and hiring engineers** screening Deepanshu Lathar for Summer 2027 software and AI internships. They arrive from a résumé link, LinkedIn, or GitHub, usually with many candidates open at once. Their job is to decide in seconds whether he is worth a closer look, then either download the résumé or email him. The ones who stay read a project or two to check that the claims hold up.

Other visitors exist (startup founders, freelance clients, campus placement panels) but none of them is the audience design decisions are made for. When their needs conflict with the recruiter's, the recruiter wins.

## Product Purpose

The personal portfolio of Deepanshu Lathar, a B.Tech CSE student at LPU (2024–28) and full-stack + AI engineer, live at https://deepanshulathar.com.

It exists to turn a recruiter's skim into contact. Success is a visitor who can state his name, role, current employer, location, and availability after one screen, and who then downloads the résumé or sends an email.

## Positioning

Every claim on the site can be checked. Each project links to its real repository and to a running deployment where one exists, and carries its true status in plain words ("Live · beta", "Working · pre-release", "Built · demo offline"). Each number traces to a campaign, repository, program, or team. A portfolio that rounds up, hides dead demos, or lists skills with nothing behind them could not copy this without rewriting its content.

The second half of the position is range: he builds the product and also runs growth, attribution, and operations inside early-stage startups, so the work spans engineering and distribution.

## Operating Context

- Entry points: the résumé PDF, LinkedIn profile, GitHub profile, and direct links. `/resume` and `/cv` redirect to the PDF.
- The recruiter's ritual is comparison under time pressure, mostly on a laptop, sometimes on a phone from a LinkedIn link.
- Outbound actions the site supports: download résumé, email, LinkedIn, GitHub, WhatsApp.
- Section order today: home, about, skills, projects, certifications, achievements, open source, experience, writing, contact. Old routes (`/about`, `/work`, `/experience`, `/writing`, `/archive`) redirect to these anchors.

## Capabilities and Constraints

**Binding (confirmed by the owner):**

- **Every claim is traceable.** Real status labels on projects, a source for every number, nothing inflated or invented. Where there is no live demo, the site says so and says why.
- **GitHub data is live.** The open-source section reads the GitHub API (stats, languages, recent pushes, contribution calendar) through `api/github.mjs` and `api/contributions.mjs`. If the API is unreachable, tiles stay blank. Numbers there are never hard-coded.

**Present today, open to change:**

- An interactive terminal that answers questions about Deepanshu through Groq (`api/ask.mjs`). It answers only from a fixed fact sheet, is rate-limited to 15 questions per visitor per day, and is restricted to the site's own origins.
- The main site is one hand-written static `index.html` with no framework, self-hosted Geist fonts, light and dark themes, and three Vercel serverless functions. Deployed on Vercel with `cleanUrls` and security headers set in `vercel.json`.
- Résumé served as `Deepanshu-Lathar-Resume.pdf` at the repo root.
- The home page loads Google Analytics 4 and Microsoft Clarity on the production domain. This is disclosed at `/privacy`, where a visitor can switch it off; it also stays off for browsers sending Global Privacy Control or Do Not Track.
- `/privacy` and the site-wide `404.html` are plain sub-pages styled by `assets/pages.css`.

**Out of scope for this file:**

- `/labs` is Deepanshu Labs, an independent software studio whose first project is a WhatsApp AI receptionist. It has a different audience and its own `labs/PRODUCT.md` and `labs/DESIGN.md`. This PRODUCT.md does not govern it.

**Terminology:** "ProofMart", "Gapl", "College-CLI", "UniConnect" (also shown as "LPU Connect"), "PicaPool", "UniLyf", "Founder's Office". Availability is stated as "Summer 2027 internships".

**Facts that go stale and must be re-checked before reuse:** current roles, availability window, repo count, follower count, project status labels, résumé PDF.

## Brand Commitments

- Name: Deepanshu Lathar. Domain: deepanshulathar.com. Title line: "Full-Stack & AI Engineer".
- Mark: the L logo (`assets/logo.svg`, `favicon.svg`), shared with Deepanshu Labs.
- Voice as written today (observed, not separately confirmed as binding): first person, plain, specific, a little dry. Section headings state a stance ("Receipts, not adjectives.", "Built, deployed, and labeled honestly."). Claims are followed by their proof, not by superlatives.

## Evidence on Hand

- Portrait: `assets/portrait.webp`.
- Product screenshots: `assets/shot-proofmart.webp`, `assets/shot-gapl.webp`; project images `assets/proj-college-cli.webp`, `assets/proj-lpu-connect.webp`.
- Writing thumbnails: `assets/post-campus-gtm.webp`, `post-deadlocks.webp`, `post-retention.webp`, `post-laptop.webp`. The essays themselves live on LinkedIn.
- Live products: proofmart.shop (beta), gapl.vercel.app. College-CLI has source but no npm release yet. UniConnect has source; its demo is offline.
- Stated figures: 48 open-source repos, 30 days of public writing completed, 2 products live, 1,500+ LinkedIn followers, a 6-person team led at PicaPool, 1,000+ launch submissions in 72 hours, 200+ beta users.
- Credentials: Deloitte Australia Data Analytics Job Simulation (Forage, Sep 2025), C Programming Certification (iamneo, Apr 2025), each with a credential ID on the page.
- Experience: PicaPool Founder's Office (Jul 2025 – present), LPU Division of Admissions (Jan 2026 – present), Student Organization Cell, UniLyf, INGLU.

**Absent, and not to be fabricated:** testimonials, recommendations, employer or client logos, press, case-study metrics beyond the figures above, GPA, and any live demo for UniConnect or published package for College-CLI.

## Product Principles

1. **The recruiter's first ten seconds come first.** Name, role, current employer, location, availability, résumé, and email are reachable before any scrolling or interaction.
2. **Proof sits next to the claim.** A skill names where it shipped; a project links its source; a number names where it came from.
3. **Say the real status.** An offline demo or a pending release is stated plainly. Honest labels are the differentiator, so they are never softened.
4. **Live over stale.** Data that can be read live is read live, and shows nothing when it cannot be fetched.
5. **Contact is always one step away.** Depth is there for the reader who wants it and never stands between a convinced recruiter and the résumé or email.

## Accessibility & Inclusion

No standard has been set by the owner. The current site already has a skip link, ARIA labelling on interactive controls, reduced-motion handling, and light and dark themes; future work should not regress these.
