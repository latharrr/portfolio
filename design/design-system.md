# design-system.md — tokens and rules

## Colour
| token | light | dark | use |
|---|---|---|---|
| --bg | #ffffff | #000000 | page canvas |
| --ink | #0a0a0a | #fafafa | headings, primary text, solid buttons |
| --ink-2 | #3f3f3f | #d4d4d4 | body copy |
| --muted | #5f5f5f | #a3a3a3 | secondary text (≥ 4.5:1) |
| --line | rgba(0,0,0,.12) | rgba(255,255,255,.16) | hairlines |
| --line-2 | rgba(0,0,0,.06) | rgba(255,255,255,.08) | faint dividers |
| --mark | #ffe53d | #ffe53d | highlighter only (background behind black text) |
Only `--mark` may carry hue. No gradients. No coloured shadows. Status dots are ink, not green.

## Highlighter
`<mark>` = yellow marker swipe behind the text (text stays black in both themes). Max 3 per screen. Allowed on: availability, a headline key phrase, a decisive number, "Live" status. Never on links, buttons, headings in full, or decoration.

## Type — one bold family (user direction: "one bold font, big fonts")
- Display + text: **Geist** only. Name and section titles in Geist 800, tight tracking (-0.045em to -0.06em), line-height ≤ 0.95. Sub-heads Geist 700. Body Geist 400, 17–18px / 1.6.
- Data/labels: Geist Mono 400, 12–13px, sentence case (no all-caps).
- No serif, no italics for emphasis — emphasis is weight or the yellow marker.
- Max 4 sizes per screen. Hero name ≥ 6× body (clamp up to ~160px). Section titles ≥ 3× body.
- Assets: assets/fonts/geist-latin.woff2 (variable 300–900), assets/fonts/geist-mono-latin.woff2. Instrument Serif files are to be removed.

## Space & grid
- Container 1200px, 12-col grid, gutters 24px; content aligns to 3 macro columns at desktop.
- Section padding 128px desktop / 88px mobile. Paragraph max-width 640px.
- Separation by 1px hairlines (`--line`) and whitespace. Radius: 0–6px only (images 4px, buttons 6px).

## Components
- Buttons: solid ink (primary), 1px outline (secondary), underlined text link (tertiary). No gradients, no glow.
- Lists/cards: rows divided by hairlines, not boxed cards. Receipts (achievements) may use paper-white with a zigzag edge and hairline — no drop shadow beyond 1 soft shadow.
- Terminal: the only dark object on a light page; keep it.
- 3D: one monochrome L mark in the hero (three.js), lazy-loaded after first paint, removed under reduced motion / small screens / low power.

## Motion
Ease: cubic-bezier(.22,1,.36,1). Reveal 600–800ms, translate ≤ 16px. No bouncy or looping decoration except the 3D mark and the status blink.
