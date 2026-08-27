import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { MarginNote } from "@/components/MarginNote";
import { copy, roles, workItems } from "@/lib/data";
import { DISPLAY, HAIRLINE, LEDGER, MONO, PENCIL } from "@/lib/tokens";

export const metadata: Metadata = { title: copy.resume.title };

const sectionHeading = {
  fontFamily: MONO,
  fontSize: 11.5,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: PENCIL,
  fontWeight: 500,
  margin: "0 0 6px",
  borderBottom: `1px solid ${HAIRLINE}`,
  paddingBottom: 10,
};

const rowBlock = { padding: "18px 0", borderBottom: `1px solid ${HAIRLINE}` };
const rowHead = { display: "flex", gap: 14, justifyContent: "space-between", flexWrap: "wrap" as const, alignItems: "baseline" as const };

export default function ResumePage() {
  return (
    <main>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 148px", gap: 40, alignItems: "start" }} data-row>
        <div>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.02em", margin: 0 }}>
            {copy.resume.title}
          </h1>
          <p style={{ maxWidth: "68ch", color: PENCIL, margin: "16px 0 0" }}>{copy.resume.intro}</p>
          <a
            href={copy.resume.pdfHref}
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-block",
              marginTop: 20,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "#F3F5F4",
              background: LEDGER,
              border: `1px solid ${LEDGER}`,
              borderRadius: 2,
              padding: "11px 20px",
              borderBottom: `1px solid ${LEDGER}`,
            }}
          >
            Download PDF ↓
          </a>
        </div>
        <aside data-margin style={{ borderLeft: `1px solid ${HAIRLINE}`, paddingLeft: 14, paddingTop: 10 }}>
          <MarginNote note={copy.resume.margin} />
        </aside>
      </div>

      <section style={{ marginTop: 48 }}>
        <h2 style={sectionHeading}>Experience</h2>
        {roles.map((r, i) => (
          <div key={i} style={rowBlock}>
            <div style={rowHead}>
              <p style={{ margin: 0, fontWeight: 600 }}>
                {r.role} · {r.org}
              </p>
              <span style={{ fontFamily: MONO, fontSize: 11, color: PENCIL, whiteSpace: "nowrap" }}>{r.dates}</span>
            </div>
            <p style={{ margin: "8px 0 0", maxWidth: "68ch", fontSize: 17 }}>{r.body}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={sectionHeading}>Projects</h2>
        {workItems.map((p) => (
          <div key={p.slug} style={rowBlock}>
            <div style={rowHead}>
              <p style={{ margin: 0, fontWeight: 600 }}>{p.name}</p>
              <Badge label={p.badge} live={p.live} tilt={p.tilt} />
            </div>
            <p style={{ margin: "8px 0 0", maxWidth: "68ch", fontSize: 17 }}>{p.blurb}</p>
            <p style={{ fontFamily: MONO, fontSize: 11, color: PENCIL, margin: "10px 0 0" }}>{p.stack}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={sectionHeading}>{copy.resume.educationHeading}</h2>
        <div style={rowBlock}>
          <p style={{ margin: 0, fontWeight: 600 }}>{copy.resume.education.degree}</p>
          <p style={{ fontFamily: MONO, fontSize: 11, color: PENCIL, margin: "8px 0 0" }}>{copy.resume.education.note}</p>
        </div>
      </section>
    </main>
  );
}
