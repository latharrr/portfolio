import type { CSSProperties } from "react";
import { LEDGER, LINK_UNDERLINE, MONO, PENCIL } from "@/lib/tokens";
import type { MarginNote as MarginNoteType } from "@/lib/data";

function Tick() {
  return (
    <svg
      viewBox="0 0 26 22"
      width="20"
      height="17"
      fill="none"
      aria-hidden="true"
      style={{ flex: "none", marginTop: 2 }}
    >
      <path
        d="M2.4 11.2 C5.1 13.4, 7.4 16.4, 9.3 19.6 C12.8 12.9, 17.9 6.1, 24 2.2"
        stroke={LEDGER}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

const linkTextStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  lineHeight: 1.45,
  wordBreak: "break-word",
  borderBottom: 0,
  textDecoration: "underline",
  textDecorationColor: LINK_UNDERLINE,
  textUnderlineOffset: 3,
};

const labelTextStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  lineHeight: 1.45,
  color: LEDGER,
  wordBreak: "break-word",
};

const unverifiedStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: 10.5,
  lineHeight: 1.5,
  color: PENCIL,
  margin: 0,
};

/**
 * A tick in the margin means someone other than me can check the claim.
 * No tick means nobody can, yet — both states render deliberately.
 */
export function MarginNote({ note, style }: { note: MarginNoteType; style?: CSSProperties }) {
  if (note.kind === "unverified") {
    return <p style={{ ...unverifiedStyle, ...style }}>{note.note}</p>;
  }
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "flex-start", ...style }}>
      <Tick />
      {note.href ? (
        <a href={note.href} target="_blank" rel="noopener" style={linkTextStyle}>
          {note.note}
        </a>
      ) : (
        <span style={labelTextStyle}>{note.note}</span>
      )}
    </div>
  );
}
