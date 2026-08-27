import type { Metadata } from "next";
import { copy } from "@/lib/data";
import { DISPLAY, HAIRLINE } from "@/lib/tokens";

export const metadata: Metadata = { title: copy.about.title };

export default function AboutPage() {
  return (
    <main style={{ maxWidth: "68ch" }}>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: "-0.02em", margin: 0 }}>
        {copy.about.title}
      </h1>
      {copy.about.paragraphs.map((p, i) => (
        <p key={i} style={{ margin: i === 0 ? "26px 0 0" : "20px 0 0" }}>
          {p}
        </p>
      ))}
      <p style={{ margin: "34px 0 0", borderTop: `1px solid ${HAIRLINE}`, paddingTop: 26 }}>{copy.about.closing}</p>
    </main>
  );
}
