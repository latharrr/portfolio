import type { CSSProperties } from "react";
import { LEDGER, MONO, STAMP } from "@/lib/tokens";

export function badgeStyle(live: boolean, tilt: number): CSSProperties {
  const color = live ? LEDGER : STAMP;
  return {
    fontFamily: MONO,
    fontSize: 10,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    border: `1px solid ${color}`,
    color,
    borderRadius: 2,
    padding: "5px 9px",
    display: "inline-block",
    transform: `rotate(${tilt}deg)`,
  };
}

export function Badge({ label, live, tilt }: { label: string; live: boolean; tilt: number }) {
  return <span style={badgeStyle(live, tilt)}>{label}</span>;
}
