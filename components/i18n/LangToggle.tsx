"use client";

import { Button } from "@/components/ui/button";
import { useLang, useT } from "@/components/i18n/LangProvider";
import { cn } from "@/lib/utils";

/** Navbar switch between Portuguese and English; the current language is the bold one. */
export function LangToggle() {
    const { lang, setLang } = useLang();
    const t = useT();
    const next = lang === "en" ? "pt" : "en";

    return (
        <Button
            variant="outline"
            size="icon"
            className="h-10 w-auto gap-0 rounded-full px-3 font-mono text-xs"
            aria-label={t.langToggle}
            title={t.langToggle}
            onClick={() => setLang(next)}
        >
            {(["pt", "en"] as const).map((l, i) => (
                <span key={l} className="flex items-center">
                    {i > 0 && <span aria-hidden="true" className="mx-1 opacity-30">/</span>}
                    <span className={cn("uppercase transition-opacity", l === lang ? "font-bold" : "opacity-40")}>{l}</span>
                </span>
            ))}
        </Button>
    );
}
