"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const LEGACY_KEY = "ec2fb650d44e0df1fbf5ae621aac6f30";
const NEW_KEY = "3500e6eb11594dfedcea01914ebe0a1f";

declare global {
  interface Window {
    atOptions?: { key: string; format: string; height: number; width: number; params: Record<string, never> };
  }
}

export default function Ad({ placement, label = "ADVERTISEMENT" }: { placement: "article-mid" | "article-end"; label?: string; code?: string | null }) {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (placement !== "article-end") return;
    const slot = slotRef.current;
    if (!slot) return;

    // The new 300x250 Adsterra unit has its own key and script endpoint.
    window.atOptions = { key: NEW_KEY, format: "iframe", height: 250, width: 300, params: {} };
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://bauval.org/22/${NEW_KEY}`;
    script.dataset.adsterraKey = NEW_KEY;
    slot.appendChild(script);

    return () => {
      script.remove();
      slot.replaceChildren();
    };
  }, [placement]);

  return (
    <aside className="ad native-banner-ad" aria-label={label} style={{ minHeight: 280, margin: "28px auto", textAlign: "center" }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: "#9298a3", marginBottom: 8 }}>{label}</div>
      {placement === "article-mid" ? (
        <>
          <Script src={`https://bauval.org/21/${LEGACY_KEY}`} strategy="afterInteractive" data-cfasync="false" />
          <div id={`container-${LEGACY_KEY}`} style={{ minHeight: 250, maxWidth: "100%", margin: "0 auto" }} />
        </>
      ) : (
        <div ref={slotRef} style={{ width: 300, minHeight: 250, maxWidth: "100%", margin: "0 auto" }} />
      )}
    </aside>
  );
}
