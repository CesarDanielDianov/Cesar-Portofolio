export type ExperienceItem = {
    id: string;
    title: string;
    period: string;
    description: string;
    bullets?: string[];
    skills: string[];
    /** Logo in /public. Omit to render a placeholder slot. */
    icon?: string;
};

/** Newest first; the timeline renders top to bottom in this order. */
export const experience: ExperienceItem[] = [
    {
        id: "ftm",
        title: "FIVE THOUSAND MILES",
        period: "October 2026 — Present",
        description:
            "As an IT Executive at Five Thousand Miles, I build AI-driven automation for the outbound sales process—from email triage to calendar scheduling—ensuring no lead is missed. I developed an n8n workflow that monitors inboxes, matches replies to campaigns, and uses LLMs to classify intent (interested, questions, not interested, forwarded, auto-reply, ambiguous) while separating decision-makers. I automated simple FAQ responses using approved data, escalated complex cases, and handled opt-outs. Furthermore, I automated Outlook meeting scheduling across time zones, proposing optimal slots, booking video events upon acceptance, and syncing all interactions and next steps with Salesforce while preventing duplicates.",
        skills: ["Process Automation", "Databases", "IT Support", "Problem Solving"],
        icon: "/5tm.jpeg",
    },
    {
        id: "neiist-dev",
        title: "NEIIST DEV-TEAM",
        period: "September 2026 — Present",
        description:
            "As part of the dev team of NEIIST, the informatics students' nucleus at IST, I developed new features for the NEIIST website and worked on the issues reported by the team and its members. Built new features for the NEIIST website. Resolved issues through pull requests on GitHub, following the team's review process. Debugged existing code to find and fix the root cause of problems.",
        skills: ["Web Development", "GitHub", "Pull Requests", "Debugging", "Teamwork"],
        icon: "/neiist.jpeg",
    },
    {
        id: "neiist-hr",
        title: "NEIIST HR-TEAM",
        period: "September 2026 — Present",
        description:
            "As a member of the HR team of NEIIST, I took part in the recruitment of new members, acting as the link between applicants and the teams they wanted to join. Coordinate the recruitment of new members, handling communication with applicants and with each team's representative. Schedule interviews and keep the recruitment process organized and up to date on the team's Notion workspace.",
        skills: ["Recruitment", "Communication", "Coordination", "Scheduling", "Organization", "Notion"],
        icon: "/neiist.jpeg",
    },
    {
        id: "mentorado",
        title: "MENTOR",
        period: "July 2026 — Present",
        description:
            "Mentored new undergraduate and graduate students in the MENTORADO program at Instituto Superior Técnico, facilitating their academic and social integration. Provided guidance on campus resources, courses, and student life, enhancing my ability to communicate clearly and support others through transitions.",
        skills: ["Mentoring", "Communication", "Leadership", "Empathy", "Onboarding"],
        icon: "/nape.png",
    },
    {
        id: "leic",
        title: "LEIC STUDENT",
        period: "September 2024 — July 2027",
        description:
            "Final-year (3rd year) student of the BSc in Computer Science and Engineering (LEIC) at Instituto Superior Técnico, University of Lisbon. Strong foundation in programming, algorithms, data structures, databases and software engineering. Preparing to specialize in Artificial Intelligence through the MSc at IST.",
        skills: ["Computer Science", "Algorithms", "Software Engineering", "Artificial Intelligence", "System Architecture", "Databases", "Computer Networks", "Distributed Systems"],
        icon: "/ist.png",
    },
];
