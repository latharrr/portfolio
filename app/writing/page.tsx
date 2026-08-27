import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { copy, essays } from "@/lib/data";
import { DISPLAY, HAIRLINE, INK, MONO, PENCIL } from "@/lib/tokens";

export const metadata: Metadata = { title: copy.writing.title };

export default function WritingPage() {
  return (
    <main>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.02em", margin: 0 }}>
        {copy.writing.title}
      </h1>
      <p style={{ maxWidth: "68ch", color: PENCIL, margin: "16px 0 0" }}>{copy.writing.intro}</p>

      <div style={{ marginTop: 44 }}>
        {essays.map((e, i) => (
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
              padding: "24px 0",
            }}
          >
            <>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>{e.title}</h2>
                <p style={{ margin: "10px 0 0", maxWidth: "68ch", color: INK }}>{e.dek}</p>
                <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: PENCIL, margin: "12px 0 0" }}>
                  {e.meta}
                </p>
              </div>
              <aside data-margin style={{ borderLeft: `1px solid ${HAIRLINE}`, paddingLeft: 14, paddingTop: 6 }}>
                <p style={{ fontFamily: MONO, fontSize: 10.5, lineHeight: 1.5, color: PENCIL, margin: 0 }}>{e.marginNote}</p>
              </aside>
            </>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
