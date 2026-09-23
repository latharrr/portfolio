import type { Metadata } from "next";
import { DISPLAY, HAIRLINE, MONO, PENCIL } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Deepanshu Labs Privacy Policy",
  description:
    "How Deepanshu Labs apps, including its LinkedIn integration, collect, use and protect your data.",
  alternates: { canonical: "https://deepanshulathar.com/labs/privacy-policy" },
};

const EFFECTIVE = "23 September 2026";
const CONTACT = "deepanshulathar@gmail.com";

// `paragraphs` render before `items`, `after` renders below them.
type Section = { heading: string; paragraphs?: string[]; items?: string[]; after?: string[] };

const sections: Section[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Deepanshu Labs is an independent software studio run by Deepanshu Lathar in India. It builds software, AI and digital products, including applications that connect to LinkedIn. This policy covers those applications and this website.",
    ],
  },
  {
    heading: "What we collect",
    paragraphs: [
      "When you connect your LinkedIn account through Sign In with LinkedIn, LinkedIn shares only what you approve on its consent screen. For our apps that is:",
    ],
    items: [
      "Your LinkedIn member ID, name and profile photo (the openid and profile permissions).",
      "An OAuth access token that lets the app publish posts on your behalf (the w_member_social permission). We never see or store your LinkedIn password.",
      "The post text and images you create, edit or schedule through the app, and the URL of a post once it is published.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: ["We use this data only:"],
    items: [
      "To publish the posts you have reviewed and approved, at the time you choose.",
      "To identify your account as the author of those posts.",
      "To show you the status of your drafts and scheduled posts.",
    ],
    after: [
      "We do not read your connections, messages or feed. We do not sell or rent your data, use it for advertising, or share it with data brokers.",
    ],
  },
  {
    heading: "Where it is stored",
    paragraphs: [
      "Data is stored in a Supabase (PostgreSQL) database hosted in the Mumbai (ap-south-1) region, with row-level security enabled and access limited to server-side credentials. Access tokens are never logged or displayed.",
    ],
  },
  {
    heading: "Service providers",
    paragraphs: ["We rely on a small number of providers to run the apps:"],
    items: [
      "LinkedIn, to authenticate you and publish posts.",
      "Supabase, for database and file storage.",
      "Vercel, to host this website.",
      "AI model providers, to help draft post text and images from the prompts you give. Your LinkedIn token and profile data are not sent to them.",
    ],
  },
  {
    heading: "Retention and deletion",
    paragraphs: [
      "We keep your data only while your account is connected. LinkedIn access tokens expire after about 60 days unless you re-authorise. You can revoke access at any time from LinkedIn under Settings → Data privacy → Permitted services. To have your stored data deleted, email us and we will remove it within 30 days.",
    ],
  },
  {
    heading: "This website",
    paragraphs: [
      "deepanshulathar.com uses Google Analytics and Microsoft Clarity to understand how visitors use the site. These tools set cookies and collect usage data such as pages viewed, device type and approximate location. If you send a message through the contact form, we use it only to reply to you.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask to access, correct or delete your personal data, or withdraw your consent, at any time, including under India's Digital Personal Data Protection Act, 2023. Email us and we will respond within 30 days.",
    ],
  },
  {
    heading: "Children",
    paragraphs: ["Our apps are not intended for anyone under 18, and we do not knowingly collect their data."],
  },
  {
    heading: "Changes",
    paragraphs: [
      "If this policy changes, we will update this page and the effective date below. Significant changes will be communicated to connected users.",
    ],
  },
];

const h2Style = {
  fontFamily: DISPLAY,
  fontWeight: 600,
  fontSize: 22,
  letterSpacing: "-0.01em",
  margin: "40px 0 0",
} as const;

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: "68ch" }}>
      <p
        style={{
          fontFamily: MONO,
          fontSize: 10.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: PENCIL,
          margin: 0,
        }}
      >
        Deepanshu Labs · Effective {EFFECTIVE}
      </p>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.02em", margin: "12px 0 0" }}>
        Privacy Policy
      </h1>
      <p style={{ margin: "26px 0 0" }}>
        This policy explains what data Deepanshu Labs collects when you use our apps, including our LinkedIn
        integration, and how we use and protect it.
      </p>
      {sections.map((s) => (
        <section key={s.heading}>
          <h2 style={h2Style}>{s.heading}</h2>
          {s.paragraphs?.map((p) => (
            <p key={p} style={{ margin: "14px 0 0" }}>
              {p}
            </p>
          ))}
          {s.items && (
            <ul style={{ margin: "14px 0 0", paddingLeft: 22 }}>
              {s.items.map((item) => (
                <li key={item} style={{ marginTop: 6 }}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {s.after?.map((p) => (
            <p key={p} style={{ margin: "14px 0 0" }}>
              {p}
            </p>
          ))}
        </section>
      ))}
      <p style={{ margin: "40px 0 0", borderTop: `1px solid ${HAIRLINE}`, paddingTop: 26 }}>
        Questions or requests: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>
    </main>
  );
}
