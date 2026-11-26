"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import FlagPair from "@/components/layout/FlagPair";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LangToggle } from "@/components/i18n/LangToggle";
import { useT } from "@/components/i18n/LangProvider";
import { cn } from "@/lib/utils";

/**
 * A strip of paper taped across the full width of the top of the desk. Flags on the left, links
 * in the middle (the current page is marked with a highlighter), language and
 * theme switches on the right. Phones get two rows: flags and switches, then
 * the links. Once the page scrolls, the strip tightens and lifts.
 */
export default function Navbar() {
    const pathname = usePathname();
    const t = useT();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-20">
            <div className={cn("fx-navbar relative w-full", scrolled && "is-scrolled")}>
                <span aria-hidden="true" className="fx-navbar-tape fx-navbar-tape-l" />
                <span aria-hidden="true" className="fx-navbar-tape fx-navbar-tape-r" />

                <div className="grid grid-cols-2 items-center gap-y-2 px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-6 md:px-8">
                    {/* Nationalities */}
                    <div className="justify-self-start">
                        <FlagPair />
                    </div>

                    <nav
                        aria-label="Main"
                        className="col-span-2 row-start-2 border-t border-dashed border-(--paper-edge) pt-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:border-0 sm:pt-0"
                    >
                        <ul className="flex items-center justify-center gap-5 font-mono text-xs font-bold uppercase tracking-wide sm:gap-6 sm:text-base md:gap-10 md:text-xl lg:gap-14 lg:text-2xl dark:text-white">
                            {nav.map(({ href, key }) => {
                                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            aria-current={active ? "page" : undefined}
                                            className={cn("fx-nav-link", active && "is-active")}
                                        >
                                            {t.nav[key]}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-3 justify-self-end sm:col-start-3">
                        <LangToggle />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
