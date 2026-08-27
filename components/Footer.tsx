import Link from "next/link";
import { HAIRLINE, MONO, PENCIL, LINK_UNDERLINE } from "@/lib/tokens";
import { copy } from "@/lib/data";

const linkStyle = {
  borderBottom: 0,
  textDecoration: "underline",
  textDecorationColor: LINK_UNDERLINE,
  textUnderlineOffset: 3,
} as const;

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 96,
        borderTop: `1px solid ${HAIRLINE}`,
        paddingTop: 20,
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
        justifyContent: "space-between",
        fontFamily: MONO,
        fontSize: 10.5,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: PENCIL,
      }}
    >
      <span>{copy.footer.tagline}</span>
      <span style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <a href="https://github.com/latharrr" target="_blank" rel="noopener" style={linkStyle}>
          GitHub
        </a>
        <a href="https://linkedin.com/in/deepanshulathar" target="_blank" rel="noopener" style={linkStyle}>
          LinkedIn
        </a>
        <Link href="/archive" style={linkStyle}>
          Archive
        </Link>
      </span>
    </footer>
  );
}
