"use client";

import React, { useEffect, useState } from "react";

type Item = {
    id: string;
    label: string; // timeline label
    title: string; // card title
    period: string;
    description: string;
    bullets?: string[];
    skills: string[];
    icon?: string; // image in /public (e.g. "/experience/ist.png"). Empty = placeholder slot.
};

// Oldest -> newest, left to right. Replace the placeholder dates.
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
        // icon: "/experience/ist.png",
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
        // icon: "/experience/ist.png",
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
        // icon: "/experience/neiist.png",
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
        // icon: "/experience/neiist.png",
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
        // icon: "/experience/ftm.png",
        icon: "/5tm.jpeg",
    },
];

export default function ExperiencePage() {
    const [active, setActive] = useState(items.length - 1);
    const item = items[active];

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") setActive((i) => Math.max(0, i - 1));
            if (e.key === "ArrowRight")
                setActive((i) => Math.min(items.length - 1, i + 1));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section className="relative min-h-screen px-4 pb-20 font-mono text-slate-900 dark:text-white">
            <h1 className="mt-24 text-center text-4xl sm:text-5xl md:text-6xl font-bold">
                Experience
            </h1>

            {/* Card */}
            <div
                key={item.id}
                className="mx-auto mt-16 w-full max-w-2xl border border-slate-400 dark:border-slate-500 p-6 sm:px-[23px] sm:py-[22px] animate-[fadeDown_0.4s_ease-out_forwards]"
            >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold">
                        {item.title}
                    </h2>
                    <time className="text-sm text-slate-500 dark:text-gray-400">
                        {item.period}
                    </time>
                </div>

                <p className="mt-6 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-gray-100">
                    {item.description}
                </p>

                {item.bullets && (
                    <ul className="mt-4 space-y-2 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-gray-100">
                        {item.bullets.map((b) => (
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

                <div className="mt-8 flex items-end justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                            <li
                                key={skill}
                                className="bg-slate-200 text-slate-900 dark:bg-[#1e2736] dark:text-white px-3.5 py-1.5 text-sm font-bold"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>

                    {item.icon ? (
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
                    )}
                </div>
            </div>

            {/* Timeline */}
            <div className="mx-auto mt-14 w-full max-w-2xl overflow-x-auto">
                <div className="relative min-w-[520px]">
                    <div className="absolute left-0 right-0 top-[5px] h-px bg-slate-400 dark:bg-slate-500" />

                    <ul
                        className="relative grid"
                        style={{
                            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
                        }}
                    >
                        {items.map((it, i) => {
                            const isActive = i === active;
                            return (
                                <li key={it.id}>
                                    <button
                                        type="button"
                                        onClick={() => setActive(i)}
                                        aria-current={isActive ? "true" : undefined}
                                        className="group flex w-full flex-col items-center gap-3 px-2 focus:outline-none"
                                    >
                                        <span
                                            className={`block h-[11px] w-[11px] transition-colors group-focus-visible:ring-2 group-focus-visible:ring-slate-900 dark:group-focus-visible:ring-white ${
                                                isActive
                                                    ? "bg-slate-900 dark:bg-white"
                                                    : "bg-slate-400 dark:bg-slate-500 group-hover:bg-slate-900 dark:group-hover:bg-white"
                                            }`}
                                        />
                                        <span
                                            className={`text-center text-xs leading-tight uppercase transition-colors ${
                                                isActive
                                                    ? "text-slate-900 dark:text-white font-bold"
                                                    : "text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white"
                                            }`}
                                        >
                                            {it.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}