/** Languages the site is written in. English is the fallback. */
export const LANGS = ["en", "pt"] as const;
export type Lang = (typeof LANGS)[number];

/** Cookie that remembers the visitor's choice from the navbar switch. */
export const LANG_COOKIE = "lang";

/** Text that exists in every language. */
export type Text = Record<Lang, string>;

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);

/**
 * The saved choice if there is one; otherwise Portuguese when it is the
 * browser's first preferred language, else English.
 */
export function resolveLang(cookie: string | undefined, acceptLanguage: string | null): Lang {
    if (isLang(cookie)) return cookie;
    return /^\s*pt\b/i.test(acceptLanguage ?? "") ? "pt" : "en";
}

/** BCP 47 tag for <html lang> and date formatting. */
export const LOCALE: Record<Lang, string> = { en: "en", pt: "pt-PT" };
