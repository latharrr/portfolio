import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { MarginNote } from "@/components/MarginNote";
import { Reveal } from "@/components/Reveal";
import { copy, workItems } from "@/lib/data";
import { DISPLAY, HAIRLINE, LINK_UNDERLINE, MONO, PENCIL } from "@/lib/tokens";

export const metadata: Metadata = { title: copy.work.title };

const linkStyle = {
  borderBottom: 0,
  textDecoration: "underline",
  textDecorationColor: LINK_UNDERLINE,
  textUnderlineOffset: 3,
} as const;

export default function WorkPage() {
  return (
    <main>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.02em", margin: 0 }}>
        {copy.work.title}
      </h1>
      <p style={{ maxWidth: "68ch", color: PENCIL, margin: "16px 0 0" }}>{copy.work.intro}</p>

      <div style={{ marginTop: 44 }}>
        {workItems.map((item) => (
          <Reveal
            key={item.slug}
            as="article"
            dataRow
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) 148px",
              gap: 40,
              alignItems: "start",
              borderTop: `1px solid ${HAIRLINE}`,
              padding: "26px 0",
            }}
          >
            <>
              <div>
                <div style={{ display: "flex", gap: 16, alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 27, letterSpacing: "-0.015em", margin: 0 }}>
                    {item.name}
                  </h2>
                  <Badge label={item.badge} live={item.live} tilt={item.tilt} />
                </div>
                <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: PENCIL, margin: "14px 0 0" }}>
                  {item.problemClass}
                </p>
                <p style={{ margin: "10px 0 0", maxWidth: "68ch" }}>{item.blurb}</p>
                <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.05em", color: PENCIL, margin: "14px 0 0" }}>
                  {item.stack}
                </p>
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 14, fontFamily: MONO, fontSize: 11 }}>
                  {item.links.map((l) =>
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
              </div>
              <aside data-margin style={{ borderLeft: `1px solid ${HAIRLINE}`, paddingLeft: 14, paddingTop: 4 }}>
                <MarginNote note={item.margin} />
              </aside>
            </>
          </Reveal>
        ))}
      </div>

      <p
        style={{
          fontFamily: MONO,
          fontSize: 11,
          lineHeight: 1.7,
          color: PENCIL,
          margin: "32px 0 0",
          maxWidth: "64ch",
          borderTop: `1px solid ${HAIRLINE}`,
          paddingTop: 18,
        }}
      >
        {copy.work.footerNote}
      </p>
    </main>
  );
}
