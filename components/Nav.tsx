"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LEDGER, MONO, PENCIL } from "@/lib/tokens";
import { navItems } from "@/lib/data";

export function Nav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      data-navrow
      style={{
        display: "flex",
        gap: 22,
        padding: "14px 0 40px",
        fontFamily: MONO,
        fontSize: 11.5,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
      }}
    >
      {navItems.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.indexOf(href) === 0;
        return (
          <Link
            key={href}
            href={href}
            style={{
              borderBottom: `1px solid ${active ? LEDGER : "transparent"}`,
              paddingBottom: 3,
              color: active ? LEDGER : PENCIL,
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
