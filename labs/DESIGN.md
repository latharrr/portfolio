---
name: Deepanshu Labs — Open Sign
description: A shop door for a WhatsApp AI receptionist; dark glass, white lettering, a red sign and one amber push plate.
colors:
  door-glass: "#14181c"
  glass-panel: "#20262c"
  enamel-white: "#ffffff"
  sign-red: "#d6281d"
  push-amber: "#f2b705"
  push-amber-hover: "#e4ab00"
  push-amber-pressed: "#d9a300"
  plate-dark-hover: "#262d34"
  plate-dark-pressed: "#000000"
  ink-secondary: "#4a5057"
  cord-grey: "#9aa0a6"
  nail-grey: "#c3c8cd"
typography:
  sign:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "25cqw"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 108"
  lettering:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.1rem, 8.8vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 104"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  chip:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "normal"
  numeral:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "3.2rem"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "normal"
    fontVariation: "'wdth' 112"
  action-small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "normal"
    fontVariation: "'wdth' 105"
  action:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "normal"
    fontVariation: "'wdth' 105"
rounded:
  chip: "3px"
  mark: "6px"
  plate: "8px"
  card: "14px"
  sign: "4.2cqw"
spacing:
  page-margin: "clamp(20px, 5vw, 64px)"
  section: "clamp(60px, 9vw, 120px)"
  bar-height: "58px"
  row: "20px"
components:
  push-plate:
    backgroundColor: "{colors.push-amber}"
    textColor: "{colors.door-glass}"
    typography: "{typography.action}"
    rounded: "{rounded.plate}"
    padding: "0.7em 1.6em"
    height: "62px"
  push-plate-dark:
    backgroundColor: "{colors.door-glass}"
    textColor: "{colors.enamel-white}"
    typography: "{typography.action}"
    rounded: "{rounded.plate}"
    padding: "0.7em 1.6em"
  sign-open:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.sign-red}"
    typography: "{typography.sign}"
    rounded: "{rounded.card}"
  sign-busy:
    backgroundColor: "{colors.sign-red}"
    textColor: "{colors.enamel-white}"
    typography: "{typography.sign}"
    rounded: "{rounded.card}"
  now-chip:
    backgroundColor: "{colors.push-amber}"
    textColor: "{colors.door-glass}"
    rounded: "{rounded.chip}"
    padding: "0.16em 0.5em 0.1em"
  chat-card:
    backgroundColor: "{colors.door-glass}"
    textColor: "{colors.enamel-white}"
    rounded: "{rounded.card}"
    padding: "20px 18px 16px"
---

# Design System: Deepanshu Labs — Open Sign

## Overview

**Creative North Star: "The Open Sign"**

The page is a shop door. A two-sided sign hangs on it by a cord: one side says the owner is busy with a customer, the other says their WhatsApp is open. That turn of the sign is the whole product in one gesture, and it is the first thing a visitor sees.

Everything else on the door is what a real door carries: lettering in white on dark glass, the hours ruled in rows, and one brass-coloured push plate that is the only way in. Below the door the page moves through plain fields of sign colour: enamel white for how the demo works, sign red for the commitments, amber for the final invitation.

It is built for a business owner on a phone. The push plate stays docked under the thumb, type is large, and nothing needs explaining. It is deliberately unlike the portfolio it lives beside: no map, no route colours, a different typeface.

**Key Characteristics:**
- A hanging two-sided sign, tilted on its cord, as the hero.
- White lettering on dark glass; hours-of-business rows with a rule above.
- One action colour: amber appears on the push plate, the open-now chip and the closing field, and nowhere else.
- Whole sections in glass, white, red or amber.
- One family, Archivo, wide and heavy on the sign and plain for reading.
- One authored motion: the sign turns over once on arrival.

## Colors

The colours of a shop door: dark glass, white enamel, sign red and a brass-amber plate.

### Primary
- **Push Amber** (`push-amber`): the action. The push plate, the open-now chip, text selection, focus rings on glass, and the closing contact field. `push-amber-hover` and `push-amber-pressed` are the plate's darker fills as it is pressed; the dark plate has its own pair, `plate-dark-hover` and `plate-dark-pressed`.

### Secondary
- **Sign Red** (`sign-red`): the sign's border and lettering, the brand mark, step numerals, and the whole "What to expect" field. White text on it holds 4.8:1.

### Neutral
- **Door Glass** (`door-glass`): the hero, bar, footer and chat card ground, and the ink colour on white and amber. `glass-panel` is the assistant's bubble on the chat card.
- **Enamel White** (`enamel-white`): lettering on glass, the open face of the sign, and the ground of the how-it-works section and the privacy page.
- **Secondary Ink** (`ink-secondary`): supporting text on white. On glass, supporting text is white at 80% opacity, not grey.
- **Cord Grey** and **Nail Grey** (`cord-grey`, `nail-grey`): the sign's cord and nail only.

### Named Rules
**The One Plate Rule.** Amber means "press here". It is never used for decoration, headings or icons.

**The Sign Red Rule.** Red belongs to the sign and to whole fields. It is not used for body-size text on white.

## Typography

**Display Font:** Archivo (with Helvetica Neue, Arial), using its width axis
**Body Font:** Archivo

**Character:** Archivo set wide and black reads as cut-vinyl sign lettering; at regular width and weight it is a plain, sturdy text face. One family does both jobs, so the sign and the small print sound like the same shop.

### Hierarchy
- **Sign** (900, width 118, 25% of the sign's own width, 0.9): the one word on the sign, "OPEN", "BUSY" or "404". Sized in container units so it always fits its face.
- **Headline** (900, width 108, clamp(2.2rem, 6vw, 4.25rem), 0.98): one per section, capped near 16ch.
- **Lettering** (800, width 104, clamp(2.1rem, 8.8vw, 3.4rem), 1.02): the white line on the glass under the sign, which is the page's h1. Capped at 11.5em so it breaks into two even lines.
- **Title** (800, 1.375rem, 1.15): steps and commitments.
- **Lede** (400, 1.125rem, 1.55): the paragraph under a headline, capped near 52ch.
- **Body** (400, 1.0625rem, 1.55): running text. The privacy policy is capped at 68ch.
- **Small** (400, 0.9375rem, 1.4): captions, the footer and chat bubbles.
- **Chip** (800, 0.8125rem): the open-now chip only.
- **Numeral** (900, width 112, 3.2rem): the four step numbers.
- **Action** (900, width 105, 1.25rem, 1.1): push-plate labels; 1rem on the small plate in the bar.

### Named Rules
**The Width Rule.** Emphasis comes from Archivo's width and weight together. There is no second typeface and no monospace.

## Layout

Phone first. The hero stacks: the sign on its cord, the lettered line, three hours rows, then the paragraph. The push plate is docked to the bottom of the screen on phones so the action is always reachable; from 900px up the dock goes away and the plate sits in the hero beside the sign, which hangs in the left column.

Below the hero, each section is a full-bleed field with a centred wrap (max 1240px). Content is lists with rules, not cards: four numbered steps (numbered because they are a sequence), five commitments in two columns on desktop, and one dark chat card holding the example conversation.

The privacy page is a reading layout on white: a sticky list of section links at the left on desktop, the policy at 68ch.

## Elevation & Depth

Mostly flat. Two objects have depth because they are objects: the sign casts a soft shadow onto the glass, and the push plate casts a soft shadow that shortens as it is pressed. One soft band of daylight lies across the hero glass, in front of the sign, so the sign reads as hanging behind it.

### Shadow Vocabulary
- **Sign shadow** (`box-shadow: 0 18px 30px -18px rgba(0, 0, 0, 0.8)`): under the hanging sign.
- **Plate at rest** (`box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.6)`): the push plate's cast shadow.
- **Plate pressed** (`box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.6)`, moved down 3px, darker fill): on press; hover is the halfway state.

### Named Rules
**The Two Objects Rule.** Only the sign and the push plate cast shadows. Sections, lists and the chat card stay flat.

## Shapes

Rectangles with modest corners, as cut and printed things have. The sign has a thick border (3% of its width), rounded corners and two punched holes. The push plate is a flat plate with an 8px radius. Rows are divided by straight rules: 2 to 3px above a group, 1px between rows. The cord runs from one nail into both eyelets of the sign.

## Components

### Push plate (primary action)
- **Shape:** flat, 8px radius, at least 62px tall.
- **Primary:** Push Amber with dark lettering and the WhatsApp mark. On the amber and white fields it inverts to a dark plate with white lettering.
- **Hover / Press:** sinks 1px on hover and 3px on press, with a darker fill and a shorter shadow. Focus is a 3px white outline offset 3px (ink on the dark plate).
- **Dock:** on phones the primary plate sits in a solid glass bar with a top rule, fixed to the bottom of the screen and aligned to the page margin. From 900px up a small plate, "Book a demo call", sits in the top bar instead.

### The sign
- **Open face:** white, red border and word, dark small lines.
- **Busy face:** red, white border and lettering.
- **Behaviour:** a button. It turns over once on arrival, from Busy to Open, and again when tapped, then swings and settles on its cord. Cord and sign are one body tilted 2 degrees about the nail. Under reduced motion it simply shows Open.

### Hours rows
- **Style:** a 2px white rule above, 1px rules between; the label at the left in softened white, the value at the right in weight 700.
- **Open-now chip:** amber when the demo line is answering, outlined when it is closed, worked out from the clock. It sits under the label on phones and beside it on desktop, never inside the value.

### Steps and commitments
- **Steps:** a large red numeral, a title and a sentence per row, ruled.
- **Commitments:** title and sentence on the red field, white rules.

### Chat card
- **Style:** dark glass card, 14px radius. Visitor messages are white bubbles at the right; assistant messages are outlined dark bubbles at the left. Always captioned as an example.

### Navigation
- **Style:** a 58px dark bar with the red brand mark; three section links from 900px up, and Privacy at every width. Links underline on hover.

## Do's and Don'ts

### Do:
- **Do** keep amber for the action and the open-now state only.
- **Do** keep the push plate reachable without scrolling on a phone.
- **Do** label any example as an example and any AI as an AI.
- **Do** let a section be one colour edge to edge.
- **Do** size sign lettering from the sign's own width.
- **Do** keep every hours value to one line on a phone.

### Don't:
- **Don't** add cookies, analytics, storage or forms; the privacy policy says there are none.
- **Don't** imitate WhatsApp's own interface colours or wallpaper.
- **Don't** put engineering credentials, repo counts or a project gallery on this page.
- **Don't** animate anything on entry other than the sign.
- **Don't** fake hardware with gradients or hard-edged block shadows; the plate is flat.
- **Don't** borrow the portfolio's route colours, map or typeface.
