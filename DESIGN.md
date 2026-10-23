---
name: Deepanshu Lathar — Pastel Grid
description: A ruled, white editorial grid modelled on eemonroy.com, with lime and sky highlight chips, pastel gradient cards and one playful hero (cards rising out of a box). Used by the portfolio and by Deepanshu Labs.
colors:
  ink: "#1f2328"
  text: "#2b3138"
  muted: "#59636e"
  caption: "#6d6d6d"
  rule: "#e5e5e5"
  paper: "#f6f6f6"
  page: "#ffffff"
  lime: "#e7ff7d"
  lime-deep: "#d6f04f"
  sky: "#afe3ff"
  pink: "#ffb8d9"
  cobalt: "#3556ff"
  ember: "#ff6b2c"
  teal-ink: "#17323a"
  green: "#1f883d"
  link: "#0969da"
  footer-ground: "#f3f9ff"
  footer-link: "#2448b8"
typography:
  serif: "Averia Serif Libre 300/400 (self-hosted, /fonts)"
  sans: "Mona Sans, expanded width, 400–500, upright only (self-hosted, /fonts)"
  mono: "ui-monospace, Menlo, Consolas"
---

# Design System: Deepanshu Lathar — Pastel Grid

Live since 23 October 2026. It replaced the "Line Map" portfolio and the "Open Sign" Labs identity; both are retired. The owner chose eemonroy.com as the reference and asked that Labs match the portfolio.

`styles.css` is the source of truth. Every page carries an inlined copy of it, so after editing it run `python3 tools/inline-css.py`.

## Overview

- White page, ink text, grey secondary text. Colour comes only from highlight chips, pastel cards, small dots and images.
- Everything sits in one ruled column: `min(1666px, 100vw − 106px)` wide (`− 24px` at 900px and below), with 1px `rule` lines on both sides and between bands. The header uses the same rails.
- One moment of play per page at most: the home hero, or the hanging sign on Labs. Everything else is calm.
- No testimonials, logos or invented numbers. The Receipts cards sit where eemonroy has testimonials.

## Colors

- **Ink** `#1f2328` for text and solid buttons. **Text** `#2b3138` for long copy. **Muted** `#59636e` for ledes, captions and metadata.
- **Lime** `#e7ff7d` is the main highlight: headline chips, the Say hi cell, step 1, the sign's word. **Sky** `#afe3ff` is the second chip. **Pink** `#ffb8d9` is used sparingly (step 3, the sign's Busy face).
- **Cobalt** `#3556ff`, **ember** `#ff6b2c` and lime-green `#becf3b` are the sparkle-dot tints and small accents inside drawings.
- **Teal ink** `#17323a` is the stroke colour of every hand-drawn illustration, the sign's border and the chat header.
- **Green** `#1f883d` marks live status ("Live · beta", "Live 24/7").
- Receipts and promise cards are a pale centre with a blurred edge colour: pink, cyan, yellow, periwinkle, mint and lime (`.receipt--1` … `--6`).
- The footer ground is pale sky `#f3f9ff`, with large links in `#2448b8`.

### Named Rules

- **Two chips per headline at most.** One lime, one sky.
- **Colour never carries meaning alone.** Status is always written out in words.

## Typography

- **Averia Serif Libre 300** for headlines, section heads, big numbers, footer links and hero card titles. **400** is body text.
- **Mona Sans (expanded, uppercase, 11–13px, +0.04–0.06em tracking)** for nav, buttons, captions, tags and eyebrows. It is never used for body text. Case-study titles are the one large use (64px, uppercase).
- Scale: hero 62px (desktop stage) or `clamp(22px, (100vw − 42px)/12.4, 40px)` on phones · section head 42px · case and Labs h1 56px · Receipt numbers 54px · body 17px/1.6.

## Layout

- **Bands:** `.band > .band__column`. Section heads are centred: a title flanked by two small icons, plus one muted line below (`.section-head`).
- **Home hero:** a 1664×1180 stage scaled to the column with `tan(atan2(100cqw, 1664px))`, so cards, box and headline never drift or overflow. At 900px and below, the headline flows normally and the art gets its own 860×1160 stage. Card positions are CSS variables on each card (`--d*` desktop, `--m*` mobile).
- **Work grid:** two columns with 32px gutters, a 1.655:1 image, and a 74px caption (name on the left; status and year on the right).
- **Home order:** Hero → Work → The receipts → Sidequests teaser → Footer. Skills and Credentials live on /about.

## Components

- **Buttons:** pill-shaped, uppercase Mona 12.5px. `btn--solid` (ink), `btn--ghost` (white with ink border), `btn--lime`.
- **Header:** logo mark (`favicon.svg`, 34px), then Work · Labs · Sidequests · About in ruled cells, then a lime **Say hi** cell that opens the WhatsApp/email window. On phones the nav is a menu.
- **Hero cards:** pastel gradient SVGs (`art.svg#card-*`) with the title in HTML, in Averia 300 at 14cqh. The drawings keep below y=60 so they never collide with the title.
- **Box:** blue panels and two animated flaps. Cards sit between the back flap and the body (z 0/1/2/3), so they rise out of the box.
- **Sparkles:** 15 small blurred dots in cobalt, ember and lime that drift out of the box and dodge the pointer. A pause control sits under the hero.
- **Receipts / promises:** blurred-edge pastel cards in a 3-column grid (2 on phones).
- **Footer:** a contact strip (Labs pages get their own copy and their own privacy link), then a swaying folder with "Traceable growth", the big links, the credit line and the legal links.

### Labs components

- **Hanging sign:** white card with a teal-ink border, the word on a lime chip and a pink Busy face. It turns over when tapped and leans toward the pointer.
- **Example chat:** lime bubbles from the visitor, white from the bot, a teal-ink header. It plays through once on scroll, with a Replay button.
- **Steps:** numbered circles in lime, sky, pink and periwinkle. **Live chip:** green pill. **Dock:** a fixed lime "Try it on WhatsApp" bar on phones that slides away at the contact strip.

## Motion

- The hero box opens at about 0.25s, the cards rise at about 1.15–1.33s, and everything settles by about 2.4s. Reveals fade up 14px.
- The pause control stops all CSS animation and the sparkle loop. Reduced motion shows the end state with no movement.

## Do's and Don'ts

### Do:
- Keep pages sparse and ruled. Keep one playful element per page.
- Write status in plain words. Link proof next to claims.
- Give a replaced image a new filename: `/assets/` is cached for 7 days.

### Don't:
- Add gradients, shadows or colour outside cards and chips.
- Use one-sided accent stripes, emoji icons or a dark mode the site doesn't have.
- Edit the header, say-hi window or footer anywhere except `index.html`; run `python3 tools/sync-pages.py` afterwards.
