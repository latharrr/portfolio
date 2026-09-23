import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Logo } from "@/components/Logo";
import { copy, type Link as LinkItem } from "@/lib/data";
import { DISPLAY, HAIRLINE, LINK_UNDERLINE, MONO, PENCIL } from "@/lib/tokens";

export const metadata: Metadata = {
  title: copy.labs.title,
  description: `${copy.labs.title} — ${copy.labs.tagline}`,
};

const linkStyle = {
  borderBottom: 0,
  textDecoration: "underline",
  textDecorationColor: LINK_UNDERLINE,
  textUnderlineOffset: 3,
} as const;

function Links({ links }: { links: LinkItem[] }) {
  return (
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 14, fontFamily: MONO, fontSize: 11 }}>
      {links.map((l) =>
        l.internal ? (
          <Link key={l.href} href={l.href} style={linkStyle}>
            {l.label}
          </Link>
        ) : (
          <a key={l.href} href={l.href} target="_blank" rel="noopener" style={linkStyle}>
            {l.label}
          </a>
        )
      )}
    </div>
  );
}

export default function LabsPage() {
  const { labs } = copy;
  return (
    <main>
      <div style={{ marginBottom: 28 }}>
        <Logo size={64} title={`${labs.title} logo`} />
      </div>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.02em", margin: 0 }}>
        {labs.title}
      </h1>
      <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: PENCIL, margin: "14px 0 0" }}>
        {labs.tagline}
      </p>
      <p style={{ maxWidth: "68ch", margin: "22px 0 0" }}>{labs.intro}</p>
      <Links links={labs.links} />

      <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 27, letterSpacing: "-0.015em", margin: "56px 0 0" }}>
        {labs.productsHeading}
      </h2>
      <div style={{ marginTop: 20 }}>
        {labs.products.map((p, i) => (
          <article key={p.name} style={{ borderTop: `1px solid ${HAIRLINE}`, padding: "24px 0" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, letterSpacing: "-0.01em", margin: 0 }}>
                {p.name}
              </h3>
              <Badge label={p.badge} live={p.live} tilt={i % 2 ? 1.2 : -1.2} />
            </div>
            <p style={{ margin: "10px 0 0", maxWidth: "68ch" }}>{p.blurb}</p>
            <Links links={p.links} />
          </article>
        ))}
      </div>
    </main>
  );
}
