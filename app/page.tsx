import { ContactForm } from "@/components/ContactForm";
import { HeroUnderline } from "@/components/HeroUnderline";
import { MarginNote } from "@/components/MarginNote";
import { Reveal } from "@/components/Reveal";
import { copy, stats, workItems } from "@/lib/data";
import { DISPLAY, HAIRLINE, MONO, PENCIL } from "@/lib/tokens";
import { WorkArticle } from "@/components/WorkArticle";

const rowGrid = {
  display: "grid",
  gridTemplateColumns: "minmax(0,1fr) 148px",
  gap: 40,
  alignItems: "start",
} as const;

const eyebrowStyle = {
  fontFamily: MONO,
  fontSize: 11.5,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: PENCIL,
  fontWeight: 500,
  margin: "0 0 22px",
};

export default function HomePage() {
  const { home } = copy;

  return (
    <main>
      <section data-row style={{ ...rowGrid }}>
        <div>
          <h1
            data-hero-name
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              fontSize: 66,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            {home.heroName}
          </h1>
          <HeroUnderline />
          <p style={{ fontSize: 27, lineHeight: 1.32, letterSpacing: "-0.012em", margin: "26px 0 0", maxWidth: "20ch" }}>
            {home.heroTagline}
          </p>
          <p style={{ color: "#15171A", margin: "20px 0 0", maxWidth: "68ch" }}>{home.heroSub}</p>
        </div>
        <div />
      </section>

      <Reveal as="section" dataRow style={{ ...rowGrid, marginTop: 64 }}>
        <>
          <div>
            <h2 style={eyebrowStyle}>{home.currentlyHeading}</h2>
            <p style={{ margin: 0, maxWidth: "68ch" }}>{home.currentlyBody}</p>
          </div>
          <aside data-margin style={{ paddingTop: 30, borderLeft: `1px solid ${HAIRLINE}`, paddingLeft: 14 }}>
            <MarginNote note={home.currentlyMargin} />
          </aside>
        </>
      </Reveal>

      <section style={{ marginTop: 64 }}>
        <h2 style={eyebrowStyle}>{home.recordHeading}</h2>
        {stats.map((row, i) => (
          <Reveal
            key={i}
            as="div"
            dataRow
            style={{ ...rowGrid, padding: "20px 0", borderTop: `1px solid ${HAIRLINE}` }}
          >
            <>
              <p style={{ margin: 0, maxWidth: "68ch" }}>{row.claim}</p>
              <aside data-margin style={{ borderLeft: `1px solid ${HAIRLINE}`, paddingLeft: 14 }}>
                <MarginNote note={row.margin} />
              </aside>
            </>
          </Reveal>
        ))}
        <div style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: 14 }}>
          <p style={{ fontFamily: MONO, fontSize: 10.5, lineHeight: 1.6, color: PENCIL, margin: 0, maxWidth: "60ch" }}>
            {home.recordFooterNote}
          </p>
        </div>
      </section>

      <section style={{ marginTop: 72 }}>
        <h2 style={eyebrowStyle}>{home.workHeading}</h2>
        {workItems.slice(0, 3).map((item) => (
          <Reveal key={item.slug} as="article" style={{ borderTop: `1px solid ${HAIRLINE}`, padding: "24px 0" }}>
            <WorkArticle item={item} />
          </Reveal>
        ))}
      </section>

      <Reveal as="section" style={{ marginTop: 80, borderTop: `1px solid ${HAIRLINE}`, paddingTop: 40 }}>
        <>
          <p style={{ fontSize: 24, lineHeight: 1.38, letterSpacing: "-0.01em", margin: 0, maxWidth: "44ch" }}>
            {home.ctaHeading}
          </p>
          <ContactForm />
        </>
      </Reveal>
    </main>
  );
}
