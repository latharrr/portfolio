"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealTag = "div" | "section" | "article";

/**
 * Fades a block in the first time it enters the viewport. Mirrors the
 * prototype's [data-reveal] behaviour: skips the animation entirely under
 * prefers-reduced-motion, and reveals anything already on screen at mount.
 */
export function Reveal({
  as: Tag = "div",
  style,
  dataRow,
  children,
}: {
  as?: RevealTag;
  style?: CSSProperties;
  dataRow?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      // Reduced motion means everything reveals immediately, including
      // content below the fold — an IntersectionObserver wouldn't fire
      // for that until it scrolls into view, so this one-time post-mount
      // reveal is intentional rather than derived state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-row={dataRow ? "" : undefined}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(8px)",
        transition: "opacity 260ms ease-out, transform 260ms ease-out",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
