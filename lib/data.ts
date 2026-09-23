// Content for "The Margin Ledger" — ported from the Claude Design prototype's
// dc-script (work(), caseStudy(), stats, roles, essays, archive).

export type Link = { href: string; label: string; internal?: boolean };

export type MarginNote =
  | { kind: "verified"; note: string; href?: string }
  | { kind: "unverified"; note: string };

export type WorkItem = {
  slug: string;
  name: string;
  badge: string;
  live: boolean;
  tilt: number;
  problemClass: string;
  blurb: string;
  stack: string;
  links: Link[];
  margin: MarginNote;
};

const TILT = 1.2;

export const workItems: WorkItem[] = [
  {
    slug: "proofmart",
    name: "ProofMart",
    badge: "In development",
    live: false,
    tilt: -TILT,
    problemClass: "Document forensics · evidence provenance",
    blurb:
      "A document forensics API. Every finding pins to a page coordinate against six deterministic markers, every dossier ships Ed25519-signed, and the whole result leaves as evidence a third party can re-check — not a black-box score. Roughly 70% built — not shipped.",
    stack: "Next.js 16 · TypeScript · Supabase · Tesseract.js OCR · pdf-lib · Ed25519 signing",
    links: [
      { href: "/work/proofmart", label: "Case study →", internal: true },
      { href: "https://proofmart.shop", label: "Live ↗" },
      { href: "https://github.com/latharrr/Proofmart.shop", label: "Repo →" },
    ],
    margin: {
      kind: "verified",
      note: "→ github.com/latharrr/ Proofmart.shop",
    },
  },
  {
    slug: "gapl",
    name: "Gapl",
    badge: "Live — no commercial users",
    live: true,
    tilt: TILT,
    problemClass: "Resume intelligence · email-to-conversion attribution",
    blurb:
      "Multi-model AI resume parsing, ATS scoring and a recruiter-verdict simulator, plus edge-based email attribution with 30-day last-touch stamping. Built and deployed. Personal project — no commercial users.",
    stack: "Next.js · TypeScript · Firebase · Razorpay · Resend",
    links: [{ href: "/work/gapl", label: "Case study →", internal: true }],
    margin: {
      kind: "unverified",
      note: "live link withheld until the API stops erroring — a broken flagship link costs more than one fewer project",
    },
  },
  {
    slug: "cli",
    name: "College-CLI",
    badge: "In development",
    live: false,
    tilt: -TILT * 0.8,
    problemClass: "Reproducible dev environments",
    blurb:
      "One command that takes a fresh student laptop to a working dev environment — runtimes, editors, git identity, sane defaults. Badge flips to LIVE the day it is published to npm, not before.",
    stack: "Node.js · commander · inquirer · chalk · ora · execa",
    links: [],
    margin: { kind: "unverified", note: "not on npm yet, so nothing to link" },
  },
  {
    slug: "picapool",
    name: "PicaPool internal systems",
    badge: "In production",
    live: true,
    tilt: TILT * 0.7,
    problemClass:
      "Attribution modelling · internal tooling · ops dashboards",
    blurb:
      "The attribution and internal tooling layer a hyperlocal campus marketplace runs on: event-fingerprinting attribution, an AST-validated read-only AI data-analyst over a 79-table schema, a Telegram RAG bot, CRM and merchant-onboarding tooling. Described by name and problem class only — sanitized, permission to publish detail not yet confirmed.",
    stack: "Next.js · TypeScript · Supabase · n8n · internal only",
    links: [],
    margin: {
      kind: "unverified",
      note: "no public artifact by design — permission not yet confirmed, so no schema shape or internal numbers here",
    },
  },
];

export function getWorkItem(slug: string): WorkItem | undefined {
  return workItems.find((w) => w.slug === slug);
}

export type CaseStudySection = {
  num: string;
  title: string;
  paras?: string[];
  diagram?: { label: string; arrow: boolean }[];
  diagramNote?: string;
  decisions?: { head: string; body: string }[];
  pending?: string;
  margin?: MarginNote;
};

export type CaseStudy = {
  slug: "proofmart" | "gapl";
  name: string;
  badge: string;
  live: boolean;
  tilt: number;
  oneLine: string;
  sections: CaseStudySection[];
};

export const caseStudies: Record<"proofmart" | "gapl", CaseStudy> = {
  proofmart: {
    slug: "proofmart",
    name: "ProofMart",
    badge: workItems[0].badge,
    live: workItems[0].live,
    tilt: workItems[0].tilt,
    oneLine:
      "A verdict nobody can audit is a rumour with a confidence score.",
    sections: [
      {
        num: "01",
        title: "The problem, in the user's words",
        paras: [
          '"The tool told me the invoice was 87% likely to be tampered with. My client asked me where. I could not answer, so I sent the file back and lost the account."',
          "The people checking documents — small lenders, campus admissions desks, freelance verifiers — are not fraud analysts. They cannot defend a number they cannot point at. What they need is not a better score; it is a place on the page to put a finger.",
        ],
        margin: {
          kind: "verified",
          note: "→ github.com/latharrr/ Proofmart.shop",
        },
      },
      {
        num: "02",
        title: "Why the obvious solution fails",
        paras: [
          "The obvious build is a classifier: features in, probability out, threshold at 0.8. It is fast to build and impossible to argue with, which sounds like the same thing but is the opposite. A single probability collapses ten independent signals — font substitution, recompression artifacts, inconsistent object generations, mismatched metadata — into one number that loses the only information the user actually needed: which signal, and where.",
          "It also cannot be re-checked. If the model version changes, last month's verdict silently means something different, and there is no artifact proving what was true at the time of the decision.",
        ],
        margin: {
          kind: "unverified",
          note: "design argument, not a measured claim",
        },
      },
      {
        num: "03",
        title: "Architecture — one diagram",
        paras: [
          "The pipeline is upload → classify → extract → OCR → verify. Verification runs six deterministic markers against the extracted content; each one is a typed finding with a page index, a bounding box, a severity and the raw evidence that produced it. The verdict is derived last, from findings, using fixed, explainable precedence — never a blended probability.",
        ],
        diagram: [
          { label: "Upload", arrow: true },
          { label: "Classify", arrow: true },
          { label: "Extract", arrow: true },
          { label: "OCR", arrow: true },
          { label: "Verify", arrow: true },
          { label: "Signed dossier", arrow: false },
        ],
        diagramNote:
          "Findings are append-only. The dossier is the Ed25519-signed serialisation of the evidence index plus the marker versions that produced it.",
      },
      {
        num: "04",
        title: "Three decisions worth defending",
        decisions: [
          {
            head: "Coordinates are part of the schema, not a nice-to-have",
            body: "A finding without a page index and bounding box fails validation and never reaches the index. That single constraint is what forces every marker to be explainable — a marker that cannot say where is a marker that cannot ship.",
          },
          {
            head: "The dossier is signed and detached from the API response",
            body: "Verdicts travel as an Ed25519-signed artifact, so a third party can verify the result without trusting my server or my uptime. It also makes the record immutable: re-running a newer marker produces a new dossier rather than quietly rewriting the old one.",
          },
          {
            head: "Marker versions are pinned in the output",
            body: "Every dossier carries the exact version of every marker that ran. Model and heuristic drift is real; without pinning, an old verdict becomes unreproducible the first time a threshold is tuned.",
          },
        ],
      },
      {
        num: "05",
        title: "What shipped",
        paras: [
          "~9.2k lines of tested TypeScript across 15 Vitest suites and 4 Playwright end-to-end specs. The upload-through-verify pipeline, all six markers, the evidence index, Ed25519 dossier signing, Supabase Auth with row-level security and rate-limited API keys are working end to end. The public API docs page and the hosted Evidence Rail viewer are not done — which is why the badge reads IN DEVELOPMENT and not SHIPPED.",
        ],
        pending: "Screenshot pending — Evidence Rail view",
        margin: {
          kind: "verified",
          note: "→ github.com/latharrr/ Proofmart.shop",
        },
      },
      {
        num: "06",
        title: "What I'd do differently",
        paras: [
          "I built the markers before the evidence schema and paid for it twice: the first two had to be rewritten once findings became typed records with coordinates. The schema was the product; I treated it as plumbing.",
          "I would also have kept the surface smaller. Six markers with a working viewer would have been a more honest 70% than six markers, a partial API and no viewer.",
        ],
        margin: { kind: "unverified", note: "self-assessment — nothing to link" },
      },
    ],
  },
  gapl: {
    slug: "gapl",
    name: "Gapl",
    badge: workItems[1].badge,
    live: workItems[1].live,
    tilt: workItems[1].tilt,
    oneLine:
      "Two blind spots, one gateway: candidates can't see what the ATS screens for, and outbound can't see which email closed the deal.",
    sections: [
      {
        num: "01",
        title: "The problem, in the user's words",
        paras: [
          '"I keep tuning my resume against a checklist I can\'t verify, and I have no idea which email in the sequence made someone pay." Two separate blind spots, same root cause.',
          "Job seekers optimise resumes against ATS heuristics they can't observe directly. On the business side, a paid conversion arriving days after an email sequence has no reliable link back to the message or channel that produced it. Both problems share the same fix: make the screening machine explain itself, and make the funnel traceable past the same-session window.",
        ],
        margin: {
          kind: "unverified",
          note: "personal project — no commercial users to cite",
        },
      },
      {
        num: "02",
        title: "Why the obvious solution fails",
        paras: [
          "The standard resume tool returns a score out of a hundred, computed once, by one model. That's fragile two ways: a single LLM provider's outage or rate limit takes the whole feature down, and a bare number gives no reviewer-facing reasoning to check it against.",
          "The standard attribution approach is a same-session tracking pixel. It breaks the moment a click and a payment are separated by more than a browser session — which is the normal case for anything that isn't an impulse buy.",
        ],
      },
      {
        num: "03",
        title: "Architecture — one diagram",
        paras: [
          "Resume parsing and ATS scoring run behind a multi-model gateway: Groq's Llama 3.3 70B first, with automatic failover to OpenAI and then Gemini on error or rate limit, so one provider's outage doesn't take scoring offline. Attribution runs separately, on Next.js Edge Middleware — every outbound link is a shortlink on a decoupled subdomain, click telemetry is logged at the edge, and a conversion is stamped to whichever click sits within a 30-day last-touch window.",
        ],
        diagram: [
          { label: "Resume upload", arrow: true },
          { label: "Groq (Llama 3.3 70B)", arrow: true },
          { label: "OpenAI (fallback)", arrow: true },
          { label: "Gemini (fallback)", arrow: true },
          { label: "ATS score + verdict", arrow: false },
        ],
        diagramNote:
          "Each provider call carries the same prompt contract; a failed or rate-limited call falls through to the next provider automatically. Email attribution runs as a separate edge pipeline: shortlink → click telemetry → 30-day last-touch stamp on conversion.",
      },
      {
        num: "04",
        title: "Three decisions worth defending",
        decisions: [
          {
            head: "Failover instead of a single vendor",
            body: "Resume scoring runs behind Groq first, with automatic fallback to OpenAI and then Gemini on error or rate limit. A single provider going down doesn't take the product down, and cost shifts automatically toward whichever provider is actually available.",
          },
          {
            head: "Attribution lives at the edge, not in a pixel",
            body: "Click-through is tracked on Next.js Edge Middleware against a decoupled subdomain, with a 30-day last-touch window instead of a same-session cookie. Conversions that land days after the email they came from still get credited correctly.",
          },
          {
            head: "Billing and refunds were built before the first paying user",
            body: "Razorpay billing is HMAC-verified end to end, with a one-click refund path inside an RBAC admin suite. It was built and tested against the full webhook lifecycle before there was any revenue to protect, so day-one revenue doesn't depend on last-minute payment work.",
          },
        ],
      },
      {
        num: "05",
        title: "What shipped",
        paras: [
          "Built and deployed: multi-model resume parsing and ATS scoring, edge-based attribution with 30-day last-touch stamping, HMAC-verified Razorpay billing, an RBAC admin suite with SPF/DKIM/DMARC health checks and anomaly alerts, and day-1/day-7 retention crons running in production. No commercial users yet, and the public API is intermittently erroring — that's why the live link stays off this page for now.",
        ],
        pending: "Screenshot pending — ATS verdict view",
      },
      {
        num: "06",
        title: "What I'd do differently",
        paras: [
          "I built the billing and admin surface — refunds, RBAC, deliverability health — before the core scoring API was stable enough to demo confidently. Revenue infrastructure for a product with no users yet was the wrong thing to harden first.",
          "I'd also publish the multi-model failover logic and per-provider cost breakdown on its own, separate from the resume-tool pitch — it's the most technically interesting part of Gapl and it's currently buried inside a case study about resumes.",
        ],
        margin: { kind: "unverified", note: "self-assessment — nothing to link" },
      },
    ],
  },
};

export type StatRow = { claim: string; margin: MarginNote };

export const stats: StatRow[] = [
  {
    claim: "15+ internal tools shipped in 8 weeks over a 79-table schema.",
    margin: {
      kind: "unverified",
      note: "internal to PicaPool — no public artifact, so no tick",
    },
  },
  {
    claim: "~9.2k lines of tested TypeScript in a document forensics API.",
    margin: {
      kind: "verified",
      href: "https://github.com/latharrr/Proofmart.shop",
      note: "→ github.com/latharrr/ Proofmart.shop",
    },
  },
  {
    claim: "A 6-person growth team led to a 100+ member launch community.",
    margin: {
      kind: "unverified",
      note: "pre-launch community was private — number is mine, not independently checkable",
    },
  },
];

export type Role = {
  role: string;
  org: string;
  dates: string;
  body: string;
  ownership?: string;
  margin: MarginNote;
};

export const roles: Role[] = [
  {
    role: "Founder's Office",
    org: "PicaPool",
    dates: "Jul '25 – Present",
    body: "Attribution and internal tooling for a hyperlocal campus marketplace: an event-fingerprinting and deduplication system spanning on-ground and digital funnels, an AST-validated read-only AI data-analyst over a 79-table Supabase schema, a Telegram RAG bot on the analytics layer, and n8n automations for prospect enrichment and email warming. Shipped 15+ production internal tools in the first 8 weeks — CRM, WhatsApp API dashboard, campaign attribution, merchant onboarding — so the ops team could run on data instead of spreadsheets.",
    ownership:
      "Built solo, ideation to implementation, AI-assisted throughout; CTO advised on the database layer.",
    margin: {
      kind: "unverified",
      note: "internal systems — sanitized, permission to publish detail not yet confirmed",
    },
  },
  {
    role: "Growth & Marketing Intern",
    org: "UniLyf",
    dates: "Jan '26 – May '26",
    body: "Led a cross-functional team of 6 across growth, content and deployment at a pre-launch campus social platform in the UK. Built a demand-validation framework to capture behavioural signal from beta users. Output: a 100+ member pre-launch community, 200+ beta users profiled, and a signal set that defined the launch feature order.",
    margin: { kind: "unverified", note: "pre-launch, private — numbers are self-reported" },
  },
  {
    role: "HR Coordinator (prev. Event Coordinator)",
    org: "Dept. of Student Organisations, LPU",
    dates: "Mar '25 – [end date pending]",
    body: "Promoted from Event Coordinator to HR Coordinator in four months. Role has since ended.",
    margin: {
      kind: "unverified",
      note: "no outcome documented yet — kept to one line until there is one",
    },
  },
  {
    role: "Part-time Intern",
    org: "LPU Admissions",
    dates: "Jan '26 – Present",
    body: "SEO content for LPU Admissions.",
    margin: { kind: "unverified", note: "ongoing — no metric attached yet" },
  },
  {
    role: "Freelance developer",
    org: "Spraykart LLP · YourProfessional",
    dates: "2023 – 2024",
    body: "Web development and design — Shopify builds, UI/UX and PM engagements.",
    margin: { kind: "unverified", note: "client work, mostly under NDA-by-handshake" },
  },
];

export type Essay = {
  title: string;
  dek: string;
  meta: string;
  marginNote: string;
};

export const essays: Essay[] = [
  {
    title: "A GTM framework for hyperlocal campus marketplaces",
    dek: "Why campus supply is won building by building, and what a launch checklist looks like when your entire market fits inside a two-kilometre radius.",
    meta: "Framework · ported from LinkedIn",
    marginNote: "ported text pending — outline only for now",
  },
  {
    title: "Startup deadlocks are org dysfunction wearing an engineering costume",
    dek: '"We are blocked on the API" is actually two people avoiding one decision. A short taxonomy of the deadlocks I have watched, and where each one actually sits.',
    meta: "Essay · ported from LinkedIn",
    marginNote: "ported text pending",
  },
  {
    title: "D1 / D7 / D30, and what each number is allowed to tell you",
    dek: "A retention framework for products too young for cohorts: which of the three you are permitted to act on at 200 users, and which one is noise.",
    meta: "Framework · ported from LinkedIn",
    marginNote: "ported text pending",
  },
  {
    title: "The laptop-retirement post",
    dek: "On the ASUS ROG G15, a six-month deadline I missed by six weeks, and shipping on hardware you cannot afford to replace.",
    meta: "Personal · ported from LinkedIn",
    marginNote: "ported text pending",
  },
];

export type ArchiveRow = {
  name: string;
  note: string;
  state: string;
  live: boolean;
  tilt: number;
};

export const archive: ArchiveRow[] = [
  {
    name: "ProofMart",
    note: "Document forensics API. ~70% built; upload-to-verify pipeline, six markers and dossier signing working; public API docs and viewer outstanding.",
    state: "In progress",
    live: false,
    tilt: -TILT,
  },
  {
    name: "Gapl",
    note: "Multi-model resume scoring and email attribution. Live, no commercial users. Public API intermittently erroring.",
    state: "Live",
    live: true,
    tilt: TILT,
  },
  {
    name: "College-CLI",
    note: "Dev-environment installer, manifest-registry architecture. Works locally, not yet published to npm.",
    state: "In progress",
    live: false,
    tilt: -TILT * 0.8,
  },
  {
    name: "PicaPool internal tooling",
    note: "Attribution layer and operator dashboards. In production, sanitized here — permission to publish detail not yet confirmed.",
    state: "In production",
    live: true,
    tilt: TILT * 0.7,
  },
  {
    name: "ProofMart Evidence Rail viewer",
    note: "Hosted UI for stepping through findings on the page. Scoped, designed, not built.",
    state: "Scoped",
    live: false,
    tilt: TILT,
  },
  {
    name: "UniLyf demand-validation framework",
    note: "Behavioural signal capture for beta users. Delivered, then retired with the product.",
    state: "Archived",
    live: false,
    tilt: TILT * 0.9,
  },
  {
    name: "FOT Sponsorship DB",
    note: "1,654 sponsorship leads cleaned and re-slotted into a formula-driven tracker for PicaPool.",
    state: "Delivered",
    live: true,
    tilt: -TILT * 0.6,
  },
  {
    name: "PicaPool Brain v2",
    note: "Org-memory platform for PicaPool. Scoped and in progress.",
    state: "In progress",
    live: false,
    tilt: -TILT * 0.9,
  },
  {
    name: "CopyOS v1.0",
    note: "Copywriting OS — 14-section PRD written, build in progress.",
    state: "In progress",
    live: false,
    tilt: TILT * 0.8,
  },
  {
    name: "Laptop group-buy intent form",
    note: "Demand-capture form for a laptop group-buy pool at PicaPool.",
    state: "In progress",
    live: false,
    tilt: -TILT * 0.7,
  },
];

export const navItems: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/archive", label: "Archive" },
  { href: "/labs", label: "Labs" },
];

// Static prose copy, kept here (rather than inline JSX text) so every
// apostrophe and quote in it renders exactly as written in the prototype.
export const copy = {
  home: {
    heroName: "Deepanshu Lathar",
    heroTagline: "I build systems that make growth traceable.",
    heroSub:
      "Full-stack and AI engineer. Attribution infrastructure, document forensics, internal tooling for early-stage startups. Third-year CSE at LPU.",
    currentlyHeading: "Currently",
    currentlyBody:
      "In PicaPool's Founder's Office, building the attribution and internal tooling a campus marketplace runs on. On the side: ProofMart, a document forensics API where every finding pins to a page coordinate.",
    currentlyMargin: {
      kind: "verified",
      href: "https://github.com/latharrr/Proofmart.shop",
      note: "→ github.com/latharrr/ Proofmart.shop",
    } satisfies MarginNote,
    recordHeading: "The record, clause by clause",
    recordFooterNote:
      "A tick in the margin means someone other than me can check the claim. No tick means nobody can, yet. Both states are on purpose.",
    workHeading: "Work",
    ctaHeading:
      "If you're building something where the measurement matters as much as the feature, I'd like to hear about it.",
    sentNote: "Not wired up yet — nothing was sent.",
    formFooterNote:
      "Form endpoint pending · no public email or phone by design · phone is on the PDF resume only",
  },
  work: {
    title: "Work",
    intro:
      "One habit runs through all of it: I build the part of the system that explains itself. Attribution that traces a user back to the campaign. Verdicts that pin to page coordinates. Dashboards that survive being questioned.",
    footerNote:
      "The PicaPool write-up is listed by name and problem class only. Founder sign-off on the detailed version hasn't come through, so the schema shape and the internal numbers are not published here. That's the reason — not a thin section.",
  },
  experience: {
    title: "Experience",
    intro:
      "Ordered by weight, not by date. A role without a number doesn't get more space than its title earns.",
  },
  writing: {
    title: "Writing",
    intro:
      "Ported from LinkedIn with real emphasis markup instead of bold-Unicode, so screen readers and search engines can read it.",
  },
  about: {
    title: "About",
    paragraphs: [
      "I'm Deepanshu Lathar, a third-year Computer Science student at Lovely Professional University and a full-stack engineer working inside early-stage startups.",
      "Since July 2025 I've held the strategic-intern seat in PicaPool's Founder's Office — a hyperlocal group-buying platform for campus communities. Growth there was judged on total downloads with no channel-level attribution, and operations ran manually across a 79-table Supabase schema. I built an event-fingerprinting and deduplication attribution system spanning on-ground and digital funnels, then shipped 15+ production internal tools in eight weeks so the ops team could run on data instead of spreadsheets. Everything from ideation to implementation was mine; our CTO advised on the database layer.",
      "Before that I led a six-person growth team at UniLyf, a pre-launch campus social platform in the UK, and built the demand-validation framework that set their launch feature order.",
      "On my own time I build products. ProofMart is a document forensics and verification API where every finding pins to real page coordinates and every dossier is Ed25519-signed — because a reviewer should be able to audit and defend a verdict, not just trust a number. Gapl is an AI resume-intelligence tool with a multi-model failover gateway.",
      "I write about growth, product and building in public.",
      "What I care about: building useful products, understanding distribution, creating leverage with technology, learning how companies scale, and documenting the process as I go.",
    ],
    closing:
      "Five years ago my family bought me an ASUS ROG G15 — on sale, and still more than they should have spent. They never told me to pick something cheaper. I told them the next one was on me. In January I gave myself six months. I was six weeks late. The G15 retired in August, and it was never once the reason something didn't ship.",
  },
  resume: {
    title: "Resume",
    intro:
      "Inline below, and as a PDF. Every number here matches the site and LinkedIn exactly. Phone number appears on the PDF only.",
    margin: {
      kind: "verified",
      href: "/Deepanshu_Lathar_Resume.pdf",
      note: "↓ Download PDF",
    } satisfies MarginNote,
    pdfHref: "/Deepanshu_Lathar_Resume.pdf",
    educationHeading: "Education",
    education: {
      degree: "B.Tech, Computer Science & Engineering · Lovely Professional University",
      note: "Third year, in progress",
    },
  },
  archive: {
    title: "Archive",
    intro:
      'There is no "N products built" headline anywhere on this site, because a headline number survives about one click. This is the list it would have summarised: in progress, abandoned, and scoped-but-never-started, with the reason.',
    footerNote:
      "This list is deliberately short of thirty rows. It only contains work that actually exists in some state — nothing has been invented to lengthen it. Rows get added as they happen.",
  },
  labs: {
    title: "Deepanshu Labs",
    tagline: "Building software, AI, and digital products.",
    intro:
      "Deepanshu Labs is the name my products ship under. It is one person, not an agency: the same work as the rest of this site, with a company page and an app registration behind it so that products which talk to other platforms have somewhere accountable to live.",
    productsHeading: "Under the Labs name",
    products: [
      {
        name: "LinkedIn post copilot",
        badge: "In development",
        live: false,
        blurb:
          "A drafting and scheduling tool that publishes to LinkedIn through the official API. It writes two drafts from a brief, and nothing is posted until a human has picked a draft and picked a time.",
        links: [{ href: "/labs/privacy-policy", label: "Privacy policy →", internal: true }],
      },
      {
        name: "ProofMart",
        badge: "In development",
        live: false,
        blurb:
          "A document forensics API where every finding pins to a page coordinate and every dossier ships Ed25519-signed.",
        links: [{ href: "/work/proofmart", label: "Case study →", internal: true }],
      },
      {
        name: "Gapl",
        badge: "Live — no commercial users",
        live: true,
        blurb: "AI resume intelligence with a multi-model failover gateway and edge-based email attribution.",
        links: [{ href: "/work/gapl", label: "Case study →", internal: true }],
      },
    ] satisfies { name: string; badge: string; live: boolean; blurb: string; links: Link[] }[],
    links: [
      { href: "https://www.linkedin.com/company/deepanshulabs", label: "LinkedIn page ↗" },
      { href: "/labs/privacy-policy", label: "Privacy policy →", internal: true },
    ] satisfies Link[],
  },
  footer: {
    tagline: "Deepanshu Lathar · Attribution, forensics, internal tooling",
  },
};
