import { cookies, headers } from "next/headers";
import { LANG_COOKIE, resolveLang, type Lang } from "@/lib/i18n";

/** The visitor's language, for Server Components and metadata. */
export async function getLang(): Promise<Lang> {
    const [c, h] = await Promise.all([cookies(), headers()]);
    return resolveLang(c.get(LANG_COOKIE)?.value, h.get("accept-language"));
}
