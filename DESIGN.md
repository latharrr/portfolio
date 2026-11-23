---
name: Deepanshu Lathar — Violet Proof
description: Credibility-first, type-led site in the La Boite a Slides visual language. Flat violet and navy colour blocks, huge condensed display headlines with one highlighted word, proof repeated in a marquee, stat cards and badges. Used by the portfolio and by Lathar Labs.
colors:
  violet: "#6630FF"
  navy: "#120042"
  navy-2: "#1e0d4b"
  white: "#FFFFFF"
  lime: "#70F74A"
  cyan: "#29DAFF"
  pink: "#FF61F8"
  red: "#D00000"
  lavender: "#F0ECFA"
  muted: "#ACA6BD"
  grey: "#5F5F5F"
  border: "#CECECE"
fonts:
  display: Anton (stand-in for FKScreamer, not licensed)
  body: Inter variable
---

# Design system: Violet Proof

Source of truth for colours, type, components and motion. The tokens live on `:root` in `ui.css`; keep the names.

## Colour

- **Violet `#6630FF`**: loader, primary buttons, hover fills, the highlighted word on light sections.
- **Navy `#120042`**: main dark background, dark buttons, text on light sections. `#1e0d4b` is the raised surface on navy (project tiles, ledger panels).
- **White** and **lavender `#F0ECFA`**: light sections. **Muted `#ACA6BD`** is secondary text on navy; **grey `#5F5F5F`** is body grey on light.
- **Lime `#70F74A`**: one highlight word on dark, live pills, the scroll progress hairline. Cyan is the focus ring. Pink is reserved. Red is form errors only.
- Flat colour blocks only. No gradient backgrounds, no glows.

## Type

- Headlines are Anton, uppercase, line-height .92, very large, short lines. Highlight exactly one word per headline (`.hl` violet on light, `.hl-lime` on dark).
- Body, buttons, labels are Inter. Eyebrows are 14px, 600, uppercase, letter-spacing .12em.

## Components

- **Buttons** (`.btn`): 56px tall, 32px padding, 24px radius. Themes: `--light`, `--dark`, `--primary`, `--ghost`, `--outline`. Hover fills via a mask-position wipe (`--button-hover-y`), never an opacity fade.
- **Header**: fixed, 120px desktop / 88px mobile, logo chip left, menu trigger centre, "Hire me" right (hidden on mobile). The menu is a full-screen violet panel inset 8px, opened with a clip-path wipe.
- **Sections**: `.light`, `.white`, `.violet`, or default navy. `.split` puts the headline left and the lede right.
- **Proof**: marquee (`{{marquee}}`), stat cards (`.stats`), badge cards (`.badges`), tenure/essay rows (`.rows .row.draw`), timeline (`.tl`).
- **Work**: `.proj` tiles with a screenshot, or `.proj--type` tiles with a type-only face when there is no screenshot. Never invent imagery.
- **Case study**: page hero, `.facts` strip, `.shot.drift` hero image, `.duo` text and image, stats, `.next` band.

## Motion

- Ease-out only. UI motion 0.2 to 0.4s, reveals 0.5 to 0.7s. Soft landing curve `cubic-bezier(.13,.93,.13,.93)` for big type.
- Loader under 1 second, first page of a visit only.
- Sections reveal once (`[data-reveal]` with `.rv` children, 100ms stagger). Headlines with `data-split` reveal word by word behind a mask. Images with `.clip` open like a curtain. `.draw` rules draw across.
- Scroll-linked effects use one rAF-throttled `--progress` per section: image drift under 2rem, dealt-image rotation under 15 degrees, the final CTA's violet fill, and `[data-fill]` word fill (colour only, no movement).
- Numbers with `data-count` count up once in 1.2s and land on the exact written figure.
- One continuous animation per screen: the marquee. No parallax on text, no scroll jacking, no tilt.
- Under reduced motion everything is at rest and the marquee and loader are off.

## Rules

- Lead with proof, then pitch. Every number, client and year must be real and traceable. Leave a slot empty rather than invent (the testimonials slot is empty on purpose).
- Edit `src/pages/` and run `python3 tools/build.py`. Never hand-edit generated `.html` files.
