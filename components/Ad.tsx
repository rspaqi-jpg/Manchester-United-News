"use client";

import { useEffect, useRef } from "react";

const AD_KEY = "3500e6eb11594dfedcea01914ebe0a1f";
const AD_SRC = `https://bauval.org/22/${AD_KEY}`;

declare global {
  interface Window { atOptions?: { key: string; format: string; height: number; width: number; params: Record<string, never> } }
}

export default function Ad({ label = "ADVERTISEMENT" }: { label?: string; code?: string | null }) {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    // Adsterra's supplied Native Banner tag expects this global configuration.
    window.atOptions = { key: AD_KEY, format: "iframe", height: 250, width: 300, params: {} };
    const script = document.createElement("script");
    script.async = true;
    script.src = AD_SRC;
    script.dataset.adsterraNativeBanner = AD_KEY;
    slot.appendChild(script);

    return () => {
      script.remove();
      slot.replaceChildren();
    };
  }, []);

  return (
    <aside className="ad native-banner-ad" aria-label={label} style={{ minHeight: 280, margin: "28px auto", textAlign: "center" }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: "#9298a3", marginBottom: 8 }}>{label}</div>
      <div ref={slotRef} style={{ width: 300, minHeight: 250, maxWidth: "100%", margin: "0 auto" }} />
    </aside>
  );
}
