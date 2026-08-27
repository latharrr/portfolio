import Link from "next/link";
import { HAIRLINE, INK, LEDGER, MONO } from "@/lib/tokens";

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        flexWrap: "wrap",
        padding: "26px 0 18px",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: INK,
          borderBottom: 0,
        }}
      >
        Deepanshu Lathar
      </Link>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 10.5,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: LEDGER,
          border: `1px solid ${LEDGER}`,
          borderRadius: 2,
          padding: "5px 9px",
          transform: "rotate(-0.8deg)",
          whiteSpace: "nowrap",
        }}
      >
        PicaPool · Founder&apos;s Office · Jul &apos;25–Present
      </span>
    </header>
  );
}
