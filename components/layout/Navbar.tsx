"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import FlagPair from "@/components/layout/FlagPair";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 z-20 w-full bg-white/90 shadow-lg shadow-gray-300/60 backdrop-blur-sm dark:bg-gray-800/90 dark:shadow-gray-950/60">
            <div className="relative flex items-center justify-center px-4 py-4">
                {/* Nationalities */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 sm:left-6 md:left-10">
                    <FlagPair />
                </div>

                <nav aria-label="Main">
                    <ul className="flex items-center gap-4 text-xs font-bold uppercase sm:gap-6 sm:text-sm md:gap-10 md:text-lg lg:gap-20 lg:text-xl dark:text-white">
                        {nav.map(({ href, label }) => {
                            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        aria-current={active ? "page" : undefined}
                                        className={cn("fx-link", active && "is-active")}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-6 md:right-10">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
