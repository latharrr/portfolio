import Link from "next/link";
import { Badge } from "@/components/Badge";
import type { WorkItem } from "@/lib/data";
import { DISPLAY, INK, LINK_UNDERLINE, MONO, PENCIL } from "@/lib/tokens";

const linkStyle = {
  borderBottom: 0,
  textDecoration: "underline",
  textDecorationColor: LINK_UNDERLINE,
  textUnderlineOffset: 3,
} as const;

/** The condensed work item shown in the Home page's featured list. */
export function WorkArticle({ item }: { item: WorkItem }) {
  return (
    <>
      <div style={{ display: "flex", gap: 16, alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap" }}>
        <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 25, letterSpacing: "-0.015em", margin: 0 }}>
          {item.name}
        </h3>
        <Badge label={item.badge} live={item.live} tilt={item.tilt} />
      </div>
      <p style={{ margin: "12px 0 0", maxWidth: "68ch", color: INK }}>{item.blurb}</p>
      <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.05em", color: PENCIL, margin: "14px 0 0" }}>
        {item.stack}
      </p>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 14, fontFamily: MONO, fontSize: 11, letterSpacing: "0.04em" }}>
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
    </>
  );
}
