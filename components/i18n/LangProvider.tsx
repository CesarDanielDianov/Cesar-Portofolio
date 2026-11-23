"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    useTransition,
    type AnimationEvent,
    type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, LOCALE, type Lang } from "@/lib/i18n";
import { dict } from "@/content/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx | null>(null);

/** Greeting written on the curtain, in the language being switched to. */
const CURTAIN: Record<Lang, { word: string; name: string }> = {
    pt: { word: "Olá!", name: "português" },
    en: { word: "Hello!", name: "english" },
};

/** Shortest time the curtain stays up, so the greeting has time to be written. */
const MIN_COVER_MS = 750;
/** Never hold the curtain longer than this, even if the refresh is slow. */
const MAX_COVER_MS = 4000;

type Curtain = { to: Lang; phase: "in" | "hold" | "out"; since: number };

/**
 * Holds the current language for Client Components. Switching saves the choice
 * in a cookie and refreshes the route, so Server Components (footer, projects,
 * CV, page titles) re-render in the new language too.
 *
 * The switch hides behind a curtain: a sheet of lined paper slides across with
 * a greeting in the new language, the text changes underneath, and the sheet
 * slides away once the refreshed page has arrived. Reduced motion switches
 * straight away.
 */
export function LangProvider({ initial, children }: { initial: Lang; children: ReactNode }) {
    const router = useRouter();
    const [lang, setState] = useState(initial);
    const [curtain, setCurtain] = useState<Curtain | null>(null);
    const [refreshing, startTransition] = useTransition();

    const apply = useCallback(
        (l: Lang) => {
            document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
            document.documentElement.lang = LOCALE[l];
            setState(l);
            startTransition(() => router.refresh());
        },
        [router]
    );

    const setLang = useCallback(
        (l: Lang) => {
            if (l === lang || curtain) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply(l);
            setCurtain({ to: l, phase: "in", since: performance.now() });
        },
        [lang, curtain, apply]
    );

    // Covered: lift the curtain once the refresh is done and the greeting is written.
    useEffect(() => {
        if (curtain?.phase !== "hold") return;
        const elapsed = performance.now() - curtain.since;
        const wait = refreshing ? MAX_COVER_MS - elapsed : MIN_COVER_MS - elapsed;
        const t = window.setTimeout(() => setCurtain((c) => c && { ...c, phase: "out" }), Math.max(0, wait));
        return () => window.clearTimeout(t);
    }, [curtain, refreshing]);

    const onCurtainEnd = (e: AnimationEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget || !curtain) return;
        if (curtain.phase === "in") {
            apply(curtain.to);
            setCurtain({ ...curtain, phase: "hold" });
        } else if (curtain.phase === "out") {
            setCurtain(null);
        }
    };

    const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
    return (
        <LangContext.Provider value={value}>
            {children}
            {curtain && (
                <div
                    aria-hidden="true"
                    onAnimationEnd={onCurtainEnd}
                    className={`fx-lang-curtain fx-paper-top fx-lined is-${curtain.phase}`}
                >
                    <div className="text-center">
                        <p className="fx-lang-word font-hand text-7xl font-bold text-blue-950 sm:text-8xl dark:text-blue-100">
                            {CURTAIN[curtain.to].word}
                        </p>
                        <p className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-gray-400">
                            {curtain.to} · {CURTAIN[curtain.to].name}
                        </p>
                    </div>
                </div>
            )}
        </LangContext.Provider>
    );
}

export function useLang() {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
    return ctx;
}

/** UI strings in the current language. */
export function useT() {
    return dict[useLang().lang];
}
