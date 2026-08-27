import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { MarginNote } from "@/components/MarginNote";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/lib/data";
import { DISPLAY, HAIRLINE, INK, LEDGER, LINK_UNDERLINE, MONO, PENCIL } from "@/lib/tokens";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

function isCaseStudySlug(slug: string): slug is keyof typeof caseStudies {
  return slug in caseStudies;
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) return {};
  const cs = caseStudies[slug];
  return { title: cs.name, description: cs.oneLine };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  if (!isCaseStudySlug(slug)) notFound();
  const cs = caseStudies[slug];

  return (
    <main>
      <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.13em", textTransform: "uppercase", color: PENCIL, margin: 0 }}>
        Case study
      </p>
      <div style={{ display: "flex", gap: 18, alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", marginTop: 12 }}>
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.022em", margin: 0 }}>
          {cs.name}
        </h1>
        <Badge label={cs.badge} live={cs.live} tilt={cs.tilt} />
      </div>
      <p style={{ fontSize: 22, lineHeight: 1.4, margin: "18px 0 0", maxWidth: "50ch", color: INK }}>{cs.oneLine}</p>

      {cs.sections.map((s) => (
        <Reveal
          key={s.num}
          as="section"
          dataRow
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) 148px",
            gap: 40,
            alignItems: "start",
            marginTop: 56,
          }}
        >
          <>
            <div>
              <div style={{ display: "flex", gap: 14, alignItems: "baseline", borderBottom: `1px solid ${HAIRLINE}`, paddingBottom: 10 }}>
                <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 22, color: PENCIL, letterSpacing: "-0.01em" }}>
                  {s.num}
                </span>
                <h2 style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500, margin: 0 }}>
                  {s.title}
                </h2>
              </div>

              {s.paras?.map((para, i) => (
                <p key={i} style={{ margin: "18px 0 0", maxWidth: "68ch" }}>
                  {para}
                </p>
              ))}

              {s.diagram && (
                <div style={{ marginTop: 24, border: `1px solid ${HAIRLINE}`, background: "#FFFFFF", padding: 20 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "stretch", fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {s.diagram.map((node, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ border: `1px solid ${INK}`, padding: "10px 12px", minWidth: 104, color: INK }}>
                          {node.label}
                        </div>
                        {node.arrow && <span style={{ color: PENCIL }}>→</span>}
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: MONO, fontSize: 10.5, lineHeight: 1.6, color: PENCIL, margin: "16px 0 0" }}>
                    {s.diagramNote}
                  </p>
                </div>
              )}

              {s.decisions?.map((d, i) => (
                <div key={i} style={{ marginTop: 22, borderLeft: `2px solid ${LEDGER}`, padding: "2px 0 2px 16px" }}>
                  <h3 style={{ fontSize: 19, fontWeight: 600, margin: 0, letterSpacing: "-0.008em" }}>{d.head}</h3>
                  <p style={{ margin: "8px 0 0", maxWidth: "64ch" }}>{d.body}</p>
                </div>
              ))}

              {s.pending && (
                <div
                  style={{
                    marginTop: 24,
                    border: `1px dashed ${PENCIL}`,
                    padding: "34px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 150,
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: PENCIL, textAlign: "center" }}>
                    {s.pending}
                  </span>
                </div>
              )}
            </div>

            <aside data-margin style={{ borderLeft: `1px solid ${HAIRLINE}`, paddingLeft: 14, paddingTop: 6 }}>
              {s.margin && <MarginNote note={s.margin} />}
            </aside>
          </>
        </Reveal>
      ))}

      <p
        style={{
          marginTop: 56,
          borderTop: `1px solid ${HAIRLINE}`,
          paddingTop: 18,
          fontFamily: MONO,
          fontSize: 11,
        }}
      >
        <Link
          href="/work"
          style={{
            borderBottom: 0,
            textDecoration: "underline",
            textDecorationColor: LINK_UNDERLINE,
            textUnderlineOffset: 3,
          }}
        >
          ← all work
        </Link>
      </p>
    </main>
  );
}
