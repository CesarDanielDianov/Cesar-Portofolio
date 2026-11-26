"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getExperience, type ExperienceItem } from "@/content/experience";
import { useLang, useT } from "@/components/i18n/LangProvider";
import { PageHeader } from "@/components/ui/PageHeader";
import { playToggle } from "@/lib/sound";

/** Reveals its element (slide + fade) the first time it scrolls into view. */
function useReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setShown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return { ref, shown };
}

function RevealItem({ index, children }: { index: number; children: ReactNode }) {
    const { ref, shown } = useReveal<HTMLLIElement>();
    return (
        <li
            ref={ref}
            className={`fx-reveal relative pb-12 last:pb-0 ${shown ? "is-shown" : ""}`}
            style={{ transitionDelay: `${index * 110}ms` }}
        >
            {children}
        </li>
    );
}

function Logo({ item }: { item: ExperienceItem }) {
    return item.icon ? (
        <Image
            src={item.icon}
            alt=""
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 border border-(--paper-edge) bg-white object-contain p-1 sm:h-16 sm:w-16"
        />
    ) : (
        <div
            aria-hidden="true"
            className="flex h-14 w-14 shrink-0 sm:h-16 sm:w-16 items-center justify-center border border-dashed border-(--paper-edge) text-[10px] uppercase text-slate-400 dark:text-slate-500"
        >
            logo
        </div>
    );
}


export default function ExperienceTimeline() {
    const { lang } = useLang();
    const t = useT().experience;
    const experience = getExperience(lang);
    // Newest entry starts open; several can be open at once.
    const [open, setOpen] = useState<Set<string>>(() => new Set([experience[0].id]));
    const allOpen = open.size === experience.length;

    const toggle = (id: string) => {
        playToggle(!open.has(id));
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleAll = () => {
        playToggle(!allOpen);
        setOpen(allOpen ? new Set() : new Set(experience.map((e) => e.id)));
    };

    return (
        <section className="relative min-h-screen px-6 pb-20 font-mono text-slate-900 dark:text-white">
            <PageHeader subtitle={t.subtitle} className="mb-0 md:mb-0">{t.title}</PageHeader>

            <div className="mx-auto mt-12 flex w-full max-w-[924px] justify-end">
                <button
                    type="button"
                    data-sound="own"
                    onClick={toggleAll}
                    className="text-xs uppercase text-slate-500 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:hover:text-white dark:focus-visible:ring-white"
                >
                    {allOpen ? t.collapseAll : t.expandAll}
                </button>
            </div>

            <ol className="relative mx-auto mt-4 w-full max-w-[924px]">
                {experience.map((it, idx) => {
                    const isOpen = open.has(it.id);
                    return (
                        <RevealItem key={it.id} index={idx}>
                            <div className={`fx-sheets ${idx % 2 ? "fx-sheets-alt" : ""}`}>
                            <div className="fx-card fx-paper-top border border-(--paper-edge)">
                                <button
                                    type="button"
                                    data-sound="own"
                                    onClick={() => toggle(it.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`panel-${it.id}`}
                                    className="group flex w-full items-center justify-between gap-4 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-900 sm:px-[23px] sm:py-[18px] dark:focus-visible:ring-white"
                                >
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-500 dark:text-gray-400">{it.period}</p>
                                        <h2 className="mt-1.5 text-lg font-bold underline-offset-4 group-hover:underline sm:text-2xl">
                                            <span aria-hidden="true" className="mr-2 text-slate-400 dark:text-slate-500">
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            {it.title}
                                        </h2>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-4">
                                        <Logo item={it} />
                                        <span aria-hidden="true" className="w-3 text-center text-slate-500 dark:text-gray-400">
                                            {isOpen ? "−" : "+"}
                                        </span>
                                    </div>
                                </button>

                                <div
                                    id={`panel-${it.id}`}
                                    inert={!isOpen}
                                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="border-t border-(--paper-edge) p-4 sm:px-[23px] sm:py-[22px]">
                                            <p className="text-base leading-relaxed text-slate-700 dark:text-gray-100">
                                                {it.description}
                                            </p>

                                            {it.bullets && (
                                                <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-700 dark:text-gray-100">
                                                    {it.bullets.map((b) => (
                                                        <li key={b} className="flex gap-3">
                                                            <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">–</span>
                                                            <span>{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.skills}>
                                                {it.skills.map((skill, k) => (
                                                    <li
                                                        key={skill}
                                                        style={{ animationDelay: `${120 + k * 45}ms` }}
                                                        className={`${isOpen ? "fx-pop" : "opacity-0"} border border-(--paper-edge) bg-slate-900/[0.04] px-3 py-1 text-sm font-bold text-slate-700 dark:bg-white/[0.06] dark:text-gray-100`}
                                                    >
                                                        <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">#</span>
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </RevealItem>
                    );
                })}
            </ol>
        </section>
    );
}
