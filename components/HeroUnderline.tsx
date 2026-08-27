import { INK } from "@/lib/tokens";

export function HeroUnderline() {
  return (
    <svg
      viewBox="0 0 420 18"
      width="420"
      height="18"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", maxWidth: "100%", margin: "8px 0 0 -2px" }}
    >
      <path
        data-hero-stroke
        d="M3 12 C64 4.5, 148 3, 218 7.5 C276 11, 338 14, 415 5"
        stroke={INK}
        strokeWidth={1.7}
        strokeLinecap="round"
        style={{
          strokeDasharray: "420",
          strokeDashoffset: "420",
          animation: "drawStroke 900ms cubic-bezier(.22,.7,.24,1) 260ms forwards",
        }}
      />
    </svg>
  );
}
