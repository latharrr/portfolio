"use client";

import { useState } from "react";
import { HAIRLINE, INK, MONO, PENCIL } from "@/lib/tokens";
import { copy } from "@/lib/data";

const labelStyle = {
  display: "grid",
  gap: 6,
  fontFamily: MONO,
  fontSize: 10.5,
  letterSpacing: "0.13em",
  textTransform: "uppercase" as const,
  color: PENCIL,
};

const fieldStyle = {
  fontFamily: "inherit",
  fontSize: 16,
  color: INK,
  background: "#FFFFFF",
  border: `1px solid ${HAIRLINE}`,
  borderRadius: 2,
  padding: "11px 12px",
};

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        style={{ marginTop: 28, maxWidth: 520, display: "grid", gap: 12 }}
      >
        <label style={labelStyle}>
          Name
          <input type="text" name="name" required style={{ ...fieldStyle, minHeight: 44 }} />
        </label>
        <label style={labelStyle}>
          Email
          <input type="email" name="email" required style={{ ...fieldStyle, minHeight: 44 }} />
        </label>
        <label style={labelStyle}>
          What you&apos;re measuring
          <textarea name="message" rows={4} style={{ ...fieldStyle, resize: "vertical" }} />
        </label>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="submit"
            className="send-button"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              borderRadius: 2,
              padding: "0 20px",
              minHeight: 44,
              cursor: "pointer",
            }}
          >
            Send
          </button>
          <span style={{ fontFamily: MONO, fontSize: 10.5, color: PENCIL }}>
            {sent ? copy.home.sentNote : ""}
          </span>
        </div>
      </form>
      <p style={{ fontFamily: MONO, fontSize: 10.5, lineHeight: 1.6, color: PENCIL, margin: "22px 0 0" }}>
        {copy.home.formFooterNote}
      </p>
    </>
  );
}
