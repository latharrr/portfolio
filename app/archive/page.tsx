import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { archive, copy } from "@/lib/data";
import { DISPLAY, HAIRLINE, MONO, PENCIL } from "@/lib/tokens";

export const metadata: Metadata = { title: copy.archive.title };

export default function ArchivePage() {
  return (
    <main>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.02em", margin: 0 }}>
        {copy.archive.title}
      </h1>
      <p style={{ maxWidth: "68ch", color: PENCIL, margin: "16px 0 0" }}>{copy.archive.intro}</p>

      <div style={{ marginTop: 40, borderTop: `1px solid ${HAIRLINE}` }}>
        {archive.map((a, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) auto",
              gap: 16,
              alignItems: "baseline",
              padding: "14px 0",
              borderBottom: `1px solid ${HAIRLINE}`,
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>{a.name}</p>
              <p style={{ fontFamily: MONO, fontSize: 10.5, lineHeight: 1.5, color: PENCIL, margin: "5px 0 0" }}>
                {a.note}
              </p>
            </div>
            <Badge label={a.state} live={a.live} tilt={a.tilt} />
          </div>
        ))}
      </div>

      <p style={{ fontFamily: MONO, fontSize: 11, lineHeight: 1.7, color: PENCIL, margin: "26px 0 0", maxWidth: "64ch" }}>
        {copy.archive.footerNote}
      </p>
    </main>
  );
}
