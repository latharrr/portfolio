---
name: Deepanshu Lathar — Line Map
description: A personal portfolio drawn as a transit map; three route lines, stations that state their real status.
colors:
  map-paper: "#fbfaf5"
  ink: "#1a1a1a"
  ink-secondary: "#4d4b45"
  engineering-blue: "#0a5fb4"
  growth-yellow: "#f5c400"
  writing-magenta: "#c2187a"
  night-ground: "#111318"
  night-ink: "#f3f1ea"
  night-ink-secondary: "#b9b6ac"
  night-engineering-blue: "#5aa9f5"
  night-writing-magenta: "#f0569f"
  night-field-ink: "#050607"
  terminal-ground: "#0d0d0c"
  terminal-text: "#d9d6cc"
  terminal-dim: "#9a978d"
  terminal-warn: "#ff9d7a"
  field-white: "#ffffff"
  on-ink-secondary: "#c9c6bc"
typography:
  display:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "10.4cqw"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  lede:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  figure:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  label:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "normal"
  data:
    fontFamily: "Overpass Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  badge: "2px"
  plate: "3px"
  sign: "4px"
  terminal: "6px"
  lozenge: "99px"
spacing:
  page-margin: "clamp(20px, 5vw, 72px)"
  section: "clamp(72px, 9vw, 132px)"
  section-head: "clamp(40px, 5vw, 72px)"
  bar-height: "60px"
components:
  exit-sign:
    backgroundColor: "{colors.growth-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sign}"
    padding: "0.66em 1em 0.56em 0.66em"
  exit-sign-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.map-paper}"
    rounded: "{rounded.sign}"
    padding: "0.66em 1em 0.56em 0.66em"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sign}"
    padding: "0.72em 1.05em 0.6em"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.map-paper}"
  status-plate:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "0.42em 0.7em 0.3em 0.55em"
  status-plate-live:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.map-paper}"
    rounded: "{rounded.plate}"
  line-lozenge:
    backgroundColor: "{colors.engineering-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.lozenge}"
    padding: "0.42em 0.8em 0.3em"
  station-roundel:
    backgroundColor: "{colors.map-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lozenge}"
    size: "34px"
  terminal:
    backgroundColor: "{colors.terminal-ground}"
    textColor: "#d9d6cc"
    typography: "{typography.data}"
    rounded: "{rounded.terminal}"
---

# Design System: Deepanshu Lathar — Line Map

## Overview

**Creative North Star: "The Line Map"**

The site is a transit diagram of one person's work. Engineering, growth and writing are three route lines. Projects, roles and essays are stations on them, and the place where the lines cross is where he is now. The map is the page's working structure: every station in the hero is a link to its section, and the same drawing vocabulary (line, roundel, dashed track, lettered exit) carries through projects, experience, writing and contact.

The system exists to make status readable at a glance. A solid ring is live. A dashed ring on dashed track is unreleased. A barred ring is an offline demo. The words say the same thing beside the mark, so the drawing never has to be decoded.

It is flat, loud and exact: map paper, ink, and three saturated route colours that take over whole sections. Type is one family, the open Highway Gothic, set heavy. Nothing glows, floats or blurs.

**Key Characteristics:**
- Thick route lines on eight directions only: horizontal, vertical and 45 degrees.
- Ink-ringed station roundels; a double ring with a solid centre marks the interchange and current roles.
- Whole sections drenched in one route colour, alternating with map paper and ink.
- One typeface at heavy weights; monospace only for code, the terminal and credential IDs.
- Status is always a mark plus plain words, never a mark alone.
- Motion is rationed: the hero lines draw once on load; pointing at a station lights its line; the local time flips in once on a split-flap board; the writing line draws across once; the contribution calendar fills in once when its data arrives. Nothing loops.

## Colors

Map paper and ink, plus three route colours that each name a discipline and are never used for anything else.

### Primary
- **Engineering Blue** (`engineering-blue`): the engineering line. Draws the blue route in the hero and the project rail, fills the Skills section edge to edge, and tints the contribution calendar and language bar in steps.

### Secondary
- **Growth Yellow** (`growth-yellow`): the growth line. Draws the yellow route, fills the Experience section, and is the colour of the primary exit sign, text highlights and selection.

### Tertiary
- **Writing Magenta** (`writing-magenta`): the writing line. Draws the magenta route and fills the Writing section.

### Neutral
- **Map Paper** (`map-paper`): the default ground and the fill of every station roundel.
- **Ink** (`ink`): text, rules, roundel rings, the bar's bottom rule, and the ground of the board, the Ask section and Contact.
- **Secondary Ink** (`ink-secondary`): supporting text on paper. On a coloured field, secondary text is the field's own foreground at reduced opacity, never grey.
- **Night set** (`night-ground`, `night-ink`, `night-ink-secondary`, `night-engineering-blue`, `night-writing-magenta`, `night-field-ink`): the dark theme. Paper sections take the night ground and the lines are lightened so they hold contrast. The drenched fields keep their daytime colours.
- **Terminal Ground** (`terminal-ground`): the terminal's own surface inside the ink field. Its transcript uses `terminal-text`, `terminal-dim` for comments and `terminal-warn` for errors.
- **Field White** (`field-white`) and **Secondary on Ink** (`on-ink-secondary`): text on the blue and magenta fields, and supporting text on the ink fields.

### Named Rules
**The Line Colour Rule.** Blue means engineering, yellow means growth, magenta means writing. A route colour is never used as a generic accent, a status colour or decoration.

**The Field Rule.** Colour commits at section scale. A section is paper, ink, or one route colour from edge to edge. Route colours do not appear as small accents scattered over a neutral page.

**The Signage Rule.** Fields do not dim in the dark theme. Only the ground between them changes.

## Typography

**Display Font:** Overpass (with Helvetica Neue, Arial)
**Body Font:** Overpass
**Label/Mono Font:** Overpass Mono, for code and data only

**Character:** Overpass is an open interpretation of Highway Gothic, the road-sign alphabet. Set at 800 it reads as signage: blunt, wide and legible at a distance. Body text is the same family at 400, so the page speaks in one voice.

### Hierarchy
- **Display** (800, 10.4cqw of the hero stage, 0.84): the name in the hero only. Sized from the stage's own width so the map and the name scale together.
- **Headline** (800, clamp(2.25rem, 5vw, 4.5rem), 0.98): one per section, balanced, capped near 17ch.
- **Title** (800, 1.5rem, 1.12): roles, essays, credentials, table group names. Project names run larger at clamp(1.9rem, 3.2vw, 2.9rem).
- **Body** (400, 1.0625rem, 1.55): running text, capped at 60 to 62ch. Emphasis is weight 700, never colour.
- **Lede** (400, 1.125rem, 1.55): the one paragraph under each section headline.
- **Figure** (800, 2rem, 1): the leading number or word in each achievements row, tabular numerals.
- **Label** (800, 0.875rem, 1): status plates, line lozenges, chips. Sentence case.
- **Data** (Overpass Mono 400, 0.9375rem, 1.6): the terminal, inline code and credential IDs.

### Named Rules
**The One Voice Rule.** Hierarchy comes from weight and size inside one family. No second display face, no italics for emphasis, no all-caps labels.

**The Mono Is Data Rule.** Monospace appears only where the content is code, a command or an identifier.

**The Middle Dot Rule.** Overpass's middle dot sits hard against the following letter, so the font's unicode-range leaves it out and the system sans draws it. Keep that exclusion when the font files change.

## Layout

The hero is a single stage of 1440 by 760 units that scales by its own width (container query units), capped so it never exceeds the window height. Text, stations and the SVG lines share that coordinate system, which keeps labels on their stations at every desktop width. Lines run past the stage to the edge of the window.

Below the hero, content sits in a centred wrap (max 1440px) with fluid side margins. Sections are full-bleed fields with generous vertical padding. Inside them, layouts are tables and rails, not card grids: a left rail with stations for projects and roles, a two-column fare table for achievements, a three-column table for skills, a four-stop strip for essays.

Below 1280px the bar's links fold into a menu. Below 1100px the hero stage becomes normal flow: name, role, lede, exits, facts, a small unlabelled map, then the stations as a vertical strip list grouped by line. Below 640px tables collapse to one column and the essay strip turns vertical.

## Elevation & Depth

Flat. Depth is carried by full-colour fields meeting edge to edge and by 2 to 3px ink rules and borders. There are no cards, no glass and no blur.

### Shadow Vocabulary
- **Sign lift** (`box-shadow: 0 6px 14px -6px rgba(0, 0, 0, 0.45)`): appears only under an exit sign on hover, with a 2px rise.

### Named Rules
**The Flat Map Rule.** Surfaces are flat at rest. The single shadow is a response to hover on an exit sign.

## Shapes

Circles and straight lines. Stations are perfect circles with a heavy ring (7 to 8px on a 28 to 34px roundel). Route lines are 10 to 20px thick with rounded joins and travel only on eight directions. Signs and plates have barely softened corners (3 to 4px). Line lozenges are full pills. Images and the terminal take a 3px ink border and a 4 to 6px radius.

## Components

### Exit signs (primary actions)
- **Shape:** sign plate with a lettered square badge (A, B) at the left (4px radius, 3px border).
- **Primary:** Growth Yellow ground, ink text, ink badge. Used for the résumé.
- **Secondary:** ink ground, paper text, paper badge. Used for email.
- **Hover / Focus:** rises 2px with the sign-lift shadow; 3px focus outline offset 3px.

### Outline buttons
- **Style:** transparent ground, 3px border in the current text colour, weight 800.
- **Hover:** fills with ink and inverts; on blue and magenta fields it fills white with ink text.

### Station roundels
- **Normal:** paper fill, ink ring.
- **Interchange / current:** larger, with a solid ink centre.
- **Pre-release:** dashed ring drawn as an SVG circle, on dashed track.
- **Offline:** ring with a diagonal bar.
- **Hover (hero stations):** fills with its line colour and grows slightly; the label underlines.

### Status plates
- **Style:** 2px ink border, mark plus plain words ("Live · beta", "Working · pre-release", "Built · demo offline").
- **Live:** inverted, ink ground with paper text.

### Line lozenges
- **Style:** pill in the line's colour naming the line. White text on blue and magenta, ink text on yellow.

### Rails and strips
- **Project rail:** a 14px blue line down the left with one roundel per project; the segment beside an unreleased project is dashed.
- **Experience rail:** a 10px ink line on the yellow field.
- **Essay strip:** a 14px white line across the magenta field with one roundel per essay.

### Tables
- **Fare table (achievements):** 3px top rule, 1px row rules, a heavy figure, a description, and a category at the right. Tabular numerals.
- **Skills table:** group name, the tools in weight 700, and a sentence on where they ship.

### Navigation
- **Style:** a 60px signage strip on paper with a 3px ink rule beneath. Seven links at weight 600, then a small yellow résumé plate (icon only under 480px). On phones the menu opens with the résumé as its first, yellow row.
- **Active:** weight 800 with a small ink ring before the label, marking the current stop.
- **Mobile:** a bordered menu button opens a full-width list with 50px rows.

### Terminal
- **Style:** near-black panel with a 2px light border on the ink field, Overpass Mono, yellow prompt and caret. No window chrome.
- **Demo:** plays once, labelled as scripted, silent to screen readers while it plays. When the live assistant is unreachable, the four suggested questions get saved answers marked "saved".

### Credentials list
- Two columns of ruled rows: name in weight 800, issuer below in secondary ink, date at the right in tabular numerals.

### Folded rows
- Lesser material (the campus roles) sits behind a summary row with a chevron, so the page stays short.
- **Focus:** the border turns Growth Yellow.

### Hero map draw (motion)
- On load the route lines draw outward from the interchange over about 1.15s with an exponential ease-out, and roundels seat in sequence. It runs once. Under reduced motion, or without JavaScript, the map is simply drawn.

## Do's and Don'ts

### Do:
- **Do** keep each route colour tied to its discipline: blue engineering, yellow growth, magenta writing.
- **Do** pair every status mark with its plain words.
- **Do** draw lines on eight directions only, and give every line a station it serves.
- **Do** let a section be one colour edge to edge.
- **Do** use weight for emphasis and Overpass for everything that is not code or an identifier.
- **Do** theme the browser's own surfaces from the palette: yellow selection, ink scrollbar, 3px focus ring.

### Don't:
- **Don't** put a small label above a heading, or number sections.
- **Don't** use gradient text, glass, blur, or cards with shadows.
- **Don't** add a decorative line that carries no station, or a station mark that states a status the project does not have.
- **Don't** add looping or decorative motion; every animation must explain something or happen once.
- **Don't** hard-code a figure that the page can read live.
