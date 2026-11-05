"use client";

import React, { useState } from "react";

type Item = {
    id: string;
    label: string; // short label (kept from the horizontal version)
    title: string; // card title
    period: string;
    description: string;
    bullets?: string[];
    skills: string[];
    icon?: string; // image in /public (e.g. "/ist.png"). Empty = placeholder slot.
};

// Oldest -> newest (the page renders newest first, top to bottom).
const items: Item[] = [
    {
        id: "leic",
        label: "LEIC — IST",
        title: "LEIC STUDENT AT IST",
        period: "2024 — Present",
        description:
            "Final-year (3rd year) student of the BSc in Computer Science and Engineering (LEIC) at Instituto Superior Técnico, University of Lisbon. Next step: the MSc in Artificial Intelligence, also at IST.",
        bullets: [
            "Strong foundation in programming, algorithms, data structures, databases and software engineering.",
            "Preparing to specialize in Artificial Intelligence through the MSc at IST.",
        ],
        skills: ["Computer Science", "Algorithms", "Software Engineering", "Artificial Intelligence"],
        icon: "/ist.png",
    },
    {
        id: "mentorado",
        label: "IST-MENTOR",
        title: "MENTOR AT IST",
        period: "2026 — Present",
        description:
            "Mentored new undergraduate and graduate students in the MENTORADO program at Instituto Superior Técnico, facilitating their academic and social integration. Provided guidance on campus resources, courses, and student life, enhancing my ability to communicate clearly and support others through transitions.",
        skills: ["Mentoring", "Communication", "Leadership", "Empathy", "Onboarding"],
        icon: "/nape.png",
    },
    {
        id: "neiist-dev",
        label: "NEIIST — Dev-Team",
        title: "NEIIST DEV-TEAM",
        period: "2026 — Present",
        description:
            "As part of the dev team of NEIIST, the informatics students' nucleus at IST, I developed new features for the NEIIST website and worked on the issues reported by the team and its members.",
        bullets: [
            "Built new features for the NEIIST website.",
            "Resolved issues through pull requests on GitHub, following the team's review process.",
            "Debugged existing code to find and fix the root cause of problems.",
        ],
        skills: ["Web Development", "GitHub", "Pull Requests", "Debugging", "Teamwork"],
        icon: "/neiist.jpeg",
    },
    {
        id: "neiist-hr",
        label: "NEIIST — HR Team",
        title: "NEIIST HR TEAM",
        period: "2026 — Present",
        description:
            "As a member of the HR team of NEIIST, I took part in the recruitment of new members, acting as the link between applicants and the teams they wanted to join.",
        bullets: [
            "Coordinate the recruitment of new members, handling communication with applicants and with each team's representative.",
            "Schedule interviews and keep the recruitment process organized and up to date on the team's Notion workspace.",
        ],
        skills: ["Recruitment", "Communication", "Coordination", "Scheduling", "Organization", "Notion"],
        icon: "/neiist.jpeg",
    },
    {
        id: "ftm",
        label: "Five Thousand Miles",
        title: "FIVE THOUSAND MILES",
        period: "2026 — Present",
        description:
            "As an IT Executive at Five Thousand Miles, I build AI-driven automation for the outbound sales process—from email triage to calendar scheduling—ensuring no lead is missed. I developed an n8n workflow that monitors inboxes, matches replies to campaigns, and uses LLMs to classify intent (interested, questions, not interested, forwarded, auto-reply, ambiguous) while separating decision-makers. I automated simple FAQ responses using approved data, escalated complex cases, and handled opt-outs. Furthermore, I automated Outlook meeting scheduling across time zones, proposing optimal slots, booking video events upon acceptance, and syncing all interactions and next steps with Salesforce while preventing duplicates.",
        skills: ["Process Automation", "Databases", "IT Support", "Problem Solving"],
        icon: "/5tm.jpeg",
    },
];

// Newest first for a vertical timeline.
const ordered = [...items].reverse();

function Logo({ item }: { item: Item }) {
    return item.icon ? (
        <img
            src={item.icon}
            alt={item.title}
            className="h-11 w-11 shrink-0 object-contain"
        />
    ) : (
        <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-dashed border-slate-400 dark:border-slate-500 text-[10px] uppercase text-slate-400 dark:text-slate-500"
        >
            logo
        </div>
    );
}

export default function ExperiencePage() {
    // Newest entry starts open; several can be open at once.
    const [open, setOpen] = useState<Set<string>>(
        () => new Set([ordered[0].id])
    );

    const toggle = (id: string) =>
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    const allOpen = open.size === ordered.length;

    return (
        <section className="relative min-h-screen px-4 pb-20 font-mono text-slate-900 dark:text-white">
            <h1 className="mt-24 text-center text-4xl sm:text-5xl md:text-6xl font-bold">
                Experience
            </h1>

            <div className="mx-auto mt-12 flex w-full max-w-2xl justify-end">
                <button
                    type="button"
                    onClick={() =>
                        setOpen(
                            allOpen
                                ? new Set()
                                : new Set(ordered.map((o) => o.id))
                        )
                    }
                    className="text-xs uppercase text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white"
                >
                    {allOpen ? "[ − collapse all ]" : "[ + expand all ]"}
                </button>
            </div>

            {/* Vertical timeline */}
            <ol className="relative mx-auto mt-4 w-full max-w-2xl">
                {/* line */}
                <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-[5px] top-2 w-px bg-slate-400 dark:bg-slate-500"
                />

                {ordered.map((it) => {
                    const isOpen = open.has(it.id);
                    return (
                        <li key={it.id} className="relative pl-9 pb-8 last:pb-0">
                            {/* square marker */}
                            <span
                                aria-hidden="true"
                                className={`absolute left-0 top-[22px] block h-[11px] w-[11px] transition-colors ${
                                    isOpen
                                        ? "bg-slate-900 dark:bg-white"
                                        : "bg-slate-400 dark:bg-slate-500"
                                }`}
                            />

                            <div className="border border-slate-400 dark:border-slate-500">
                                <button
                                    type="button"
                                    onClick={() => toggle(it.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`panel-${it.id}`}
                                    className="group flex w-full items-center justify-between gap-4 p-4 sm:px-[23px] sm:py-[18px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-900 dark:focus-visible:ring-white"
                                >
                                    <div className="min-w-0">
                                        <time className="block text-xs text-slate-500 dark:text-gray-400">
                                            {it.period}
                                        </time>
                                        <h2 className="mt-1 text-lg sm:text-xl font-bold group-hover:underline underline-offset-4">
                                            {it.title}
                                        </h2>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-4">
                                        <Logo item={it} />
                                        <span
                                            aria-hidden="true"
                                            className="w-3 text-center text-slate-500 dark:text-gray-400"
                                        >
                                            {isOpen ? "−" : "+"}
                                        </span>
                                    </div>
                                </button>

                                {/* collapsible body */}
                                <div
                                    id={`panel-${it.id}`}
                                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="border-t border-slate-400 dark:border-slate-500 p-4 sm:px-[23px] sm:py-[22px]">
                                            <p className="text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-gray-100">
                                                {it.description}
                                            </p>

                                            {it.bullets && (
                                                <ul className="mt-4 space-y-2 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-gray-100">
                                                    {it.bullets.map((b) => (
                                                        <li key={b} className="flex gap-3">
                                                            <span
                                                                aria-hidden="true"
                                                                className="text-slate-400 dark:text-slate-500"
                                                            >
                                                                –
                                                            </span>
                                                            <span>{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <ul className="mt-6 flex flex-wrap gap-2">
                                                {it.skills.map((skill) => (
                                                    <li
                                                        key={skill}
                                                        className="bg-gray-400 text-white dark:bg-gray-800 dark:text-white px-3.5 py-1.5 text-sm font-bold"
                                                    >
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}