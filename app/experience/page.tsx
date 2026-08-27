import type { Metadata } from "next";
import { MarginNote } from "@/components/MarginNote";
import { Reveal } from "@/components/Reveal";
import { copy, roles } from "@/lib/data";
import { DISPLAY, HAIRLINE, INK, MONO, PENCIL } from "@/lib/tokens";

export const metadata: Metadata = { title: copy.experience.title };

export default function ExperiencePage() {
  return (
    <main>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.02em", margin: 0 }}>
        {copy.experience.title}
      </h1>
      <p style={{ maxWidth: "68ch", color: PENCIL, margin: "16px 0 0" }}>{copy.experience.intro}</p>

      <div style={{ marginTop: 44 }}>
        {roles.map((r, i) => (
          <Reveal
            key={i}
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
                  <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>{r.role}</h2>
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: PENCIL, whiteSpace: "nowrap" }}>
                    {r.dates}
                  </span>
                </div>
                <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: INK, margin: "10px 0 0" }}>
                  {r.org}
                </p>
                <p style={{ margin: "14px 0 0", maxWidth: "68ch" }}>{r.body}</p>
                {r.ownership && (
                  <p style={{ margin: "14px 0 0", maxWidth: "68ch", color: INK, borderLeft: `2px solid ${HAIRLINE}`, paddingLeft: 14 }}>
                    {r.ownership}
                  </p>
                )}
              </div>
              <aside data-margin style={{ borderLeft: `1px solid ${HAIRLINE}`, paddingLeft: 14, paddingTop: 6 }}>
                <MarginNote note={r.margin} />
              </aside>
            </>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
