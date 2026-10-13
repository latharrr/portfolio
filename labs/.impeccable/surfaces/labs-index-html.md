---
version: 1
slug: "labs-index-html"
primary_target: "labs/index.html"
related_targets: ["labs/privacy/index.html","labs/404.html"]
---

# Surface brief: Deepanshu Labs (labs/index.html, with labs/privacy and labs/404)

Scope: the customer-facing labs site under `/labs`. Visitor mode: Persuade for the home page, Read for the privacy policy.

Audience and job: owners of small businesses that answer customers on WhatsApp, on a phone between customers; find out fast whether an AI can answer their customers, by trying it.
Action: tap "Try it on WhatsApp" and message the demo line.
Proof on hand: the live demo line, an example conversation labelled as an example, the four demo steps, five commitments.
Constraints: no cookies, analytics or forms; privacy policy carried word for word; must look unlike the portfolio; no invented prices, customers or statistics.
Confirmed by owner: rebuild as static pages in this repo; audience widened from UK trades to any small business; the engineer's About and work sections removed entirely; direction "Open Sign" picked from the decision page.
## Changes and open points for the owner

Copy changed for the wider audience:
- Title and meta description: "for UK trades" became "for small businesses"; "rate card" became "prices".
- Hero paragraph: "An AI receptionist for plumbers, electricians and builders. While you're on a job, it replies to your customers in seconds" became "While you're with a customer, it replies to the next one in seconds"; "your rate card in pounds" became "your prices".
- What to expect: "your rate card in pounds" became "your prices".
- Example chat: "for my plumbing firm" became "for my salon".
- New wording on the sign: "Your WhatsApp is OPEN, answered in seconds" and "Sorry, we're BUSY with a customer"; on the not-found page, "Sorry, we're CLOSED on this page".
- The old headline "Your WhatsApp, answered in seconds." is no longer a heading; its words are on the sign. The h1 is now "An AI receptionist for your business."
- On phones the hours values are shortened to "08:00 to 23:30 IST", "A real Google Meet link" and "Your services and prices"; the full wording shows on desktop and in the How section.

Removed or added without being asked:
- Nav items About and Work are gone with their sections; "What to expect" and "Privacy" were added to the bar.
- The chat example lost its timestamps, the "DL" avatar and the "LIVE" flag.
- The 01 to 05 numerals on What to expect are gone (they were not a sequence).
- GitHub left the "reach me directly" list; it is still in the footer.

Open points only the owner can settle:
- "Message me on WhatsApp" opens the same number as the AI demo line (+91 99996 02901). Carried from the old page.
- The privacy policy still says "Links to WhatsApp, LinkedIn, GitHub and the projects shown". No projects are shown now. Changing it needs the owner's wording and a new effective date.
- Unknown URLs under /labs get Vercel's default not-found page, because the repo has no root 404.html. /labs/404 exists and is reachable directly.
- Whether to name a country now that the audience is any small business.

## Owner changes on 2026-10-13 (after launch)

- Deepanshu Labs is the studio; the receptionist is one project under it. `/labs` is now the studio home with a project shelf, and the receptionist moved to `/labs/whatsapp-receptionist`. The direction contract below describes the receptionist page; the studio home uses the same door with a fixed "Come in, we're OPEN" sign.
- Demo line is live 24/7; the hours, booking and setup rows and the open-now clock are gone. The hero shows one row, "Demo line: Live 24/7".
- The example chat is colourful, in WhatsApp's own look, at the owner's request.
- "Message me on WhatsApp" now opens Deepanshu's own number (+91 82210 16809), taken from the portfolio's contact link, not the demo line.
- Privacy policy updated and re-dated 13 October 2026: the "projects shown" phrase is gone and it now points to the site policy at `/privacy`.
- Unknown URLs under /labs now reach the labs not-found page through the new site-wide 404.html.
- Still open: whether to name a country.

## Direction contract

THESIS: A shop door. The sign on it flips from "busy with a customer" to "open", because that is what the product does for a business's WhatsApp. Refuses the product-page default of a headline beside a phone mock-up with feature cards beneath.

OWN-WORLD: Dark door glass #14181c with white vinyl lettering, a hanging two-sided sign in sign red #d6281d and white, and an amber push plate #f2b705 for the one action. Hours-of-business lettering as ruled rows. Whole sections in glass, enamel white, sign red or amber. One family, Archivo, set wide and heavy on the sign and plain for reading.

STORY: The visitor recognises their own door sign, understands the receptionist keeps WhatsApp open while they work, sees exactly how the demo runs, and taps through to try it.

FIRST VIEWPORT: On a phone: the brand and a privacy link at the top; a large sign hanging from a cord, tilted a few degrees, reading "Your WhatsApp is OPEN, answered in seconds"; under it one lettered line, "An AI receptionist for your business."; three hours-style rows (demo line, booking, setup); and the amber push plate "Try it on WhatsApp" docked at the bottom of the screen. On a desktop the sign hangs at the left and the lettering, rows and push plate sit at the right.

SIGNATURE INTERACTION AND MOTION: On load the sign turns over once, from "Sorry, we're BUSY with a customer" to OPEN, and settles on its cord. Tapping the sign turns it again. The demo-line row states whether the line is answering at this minute, from the clock. Nothing else animates.

FORM: Open Sign, candidate 1 of the ordered list, chosen by the owner as the pick. Seed key 8b176492.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
