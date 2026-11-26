"use client";

import type { CSSProperties } from "react";
import { useLang, useT } from "@/components/i18n/LangProvider";
import { cn } from "@/lib/utils";

/** Navbar switch between Portuguese and English; the current language is highlighted. */
export function LangToggle() {
    const { lang, setLang } = useLang();
    const t = useT();
    const next = lang === "en" ? "pt" : "en";

    return (
        <button
            type="button"
            className="fx-chip gap-0 px-3 font-mono text-sm font-bold uppercase"
            style={{ "--chip-tilt": "-2deg" } as CSSProperties}
            aria-label={t.langToggle}
            title={t.langToggle}
            onClick={() => setLang(next)}
        >
            {(["pt", "en"] as const).map((l, i) => (
                <span key={l} className="flex items-center">
                    {i > 0 && <span aria-hidden="true" className="mx-1.5 opacity-40">/</span>}
                    <span className={cn("transition-opacity", l === lang ? "fx-chip-hl" : "opacity-40")}>{l}</span>
                </span>
            ))}
        </button>
    );
}
