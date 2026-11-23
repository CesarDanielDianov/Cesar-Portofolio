import type { Lang, Text } from "@/lib/i18n";

export type ExperienceItem = {
    id: string;
    title: string;
    period: string;
    /** Still ongoing ("Present"). */
    current: boolean;
    description: string;
    bullets?: string[];
    skills: string[];
    /** Logo in /public. Omit to render a placeholder slot. */
    icon?: string;
};

type Source = {
    id: string;
    title: Text;
    period: Text;
    current: boolean;
    description: Text;
    bullets?: Record<Lang, string[]>;
    skills: Record<Lang, string[]>;
    icon?: string;
};

/** Newest first; the timeline renders top to bottom in this order. */
const items: Source[] = [
    {
        id: "ftm",
        title: { en: "FIVE THOUSAND MILES", pt: "FIVE THOUSAND MILES" },
        period: { en: "October 2026 — Present", pt: "outubro de 2026 — presente" },
        current: true,
        description: {
            en: "As an IT Executive at Five Thousand Miles, I build AI-driven automation for the outbound sales process—from email triage to calendar scheduling—ensuring no lead is missed. I developed an n8n workflow that monitors inboxes, matches replies to campaigns, and uses LLMs to classify intent (interested, questions, not interested, forwarded, auto-reply, ambiguous) while separating decision-makers. I automated simple FAQ responses using approved data, escalated complex cases, and handled opt-outs. Furthermore, I automated Outlook meeting scheduling across time zones, proposing optimal slots, booking video events upon acceptance, and syncing all interactions and next steps with Salesforce while preventing duplicates.",
            pt: "Como IT Executive na Five Thousand Miles, desenvolvo automação com IA para o processo de vendas outbound — da triagem de emails ao agendamento de reuniões — para que nenhuma lead fique esquecida. Desenvolvi um workflow em n8n que monitoriza caixas de correio, associa as respostas às campanhas e usa LLMs para classificar a intenção (interessado, dúvidas, não interessado, reencaminhado, resposta automática, ambíguo), distinguindo os decisores. Automatizei as respostas a perguntas frequentes simples com base em dados aprovados, encaminhei os casos complexos e tratei os pedidos de remoção. Além disso, automatizei o agendamento de reuniões no Outlook entre fusos horários, propondo os melhores horários, marcando videochamadas após a aceitação e sincronizando todas as interações e próximos passos com o Salesforce, sem criar duplicados.",
        },
        skills: {
            en: ["Process Automation", "Databases", "IT Support", "Problem Solving"],
            pt: ["Automação de Processos", "Bases de Dados", "Suporte Informático", "Resolução de Problemas"],
        },
        icon: "/5tm.jpeg",
    },
    {
        id: "neiist-dev",
        title: { en: "NEIIST DEV-TEAM", pt: "NEIIST DEV-TEAM" },
        period: { en: "September 2026 — Present", pt: "setembro de 2026 — presente" },
        current: true,
        description: {
            en: "As part of the dev team of NEIIST, the informatics students' nucleus at IST, I developed new features for the NEIIST website and worked on the issues reported by the team and its members. Built new features for the NEIIST website. Resolved issues through pull requests on GitHub, following the team's review process. Debugged existing code to find and fix the root cause of problems.",
            pt: "Como parte da equipa de desenvolvimento do NEIIST, o núcleo de estudantes de informática do IST, desenvolvi novas funcionalidades para o site do NEIIST e trabalhei nos problemas reportados pela equipa e pelos seus membros. Resolvi problemas através de pull requests no GitHub, seguindo o processo de revisão da equipa. Fiz debugging de código existente para encontrar e corrigir a causa dos problemas.",
        },
        skills: {
            en: ["Web Development", "GitHub", "Pull Requests", "Debugging", "Teamwork"],
            pt: ["Desenvolvimento Web", "GitHub", "Pull Requests", "Debugging", "Trabalho em Equipa"],
        },
        icon: "/neiist.jpeg",
    },
    {
        id: "neiist-hr",
        title: { en: "NEIIST HR-TEAM", pt: "NEIIST HR-TEAM" },
        period: { en: "September 2026 — Present", pt: "setembro de 2026 — presente" },
        current: true,
        description: {
            en: "As a member of the HR team of NEIIST, I took part in the recruitment of new members, acting as the link between applicants and the teams they wanted to join. Coordinate the recruitment of new members, handling communication with applicants and with each team's representative. Schedule interviews and keep the recruitment process organized and up to date on the team's Notion workspace.",
            pt: "Como membro da equipa de RH do NEIIST, participei no recrutamento de novos membros, fazendo a ponte entre os candidatos e as equipas a que se queriam juntar. Coordeno o recrutamento de novos membros, tratando da comunicação com os candidatos e com o representante de cada equipa. Agendo entrevistas e mantenho o processo de recrutamento organizado e atualizado no Notion da equipa.",
        },
        skills: {
            en: ["Recruitment", "Communication", "Coordination", "Scheduling", "Organization", "Notion"],
            pt: ["Recrutamento", "Comunicação", "Coordenação", "Agendamento", "Organização", "Notion"],
        },
        icon: "/neiist.jpeg",
    },
    {
        id: "mentorado",
        title: { en: "MENTOR", pt: "MENTOR" },
        period: { en: "July 2026 — Present", pt: "julho de 2026 — presente" },
        current: true,
        description: {
            en: "Mentored new undergraduate and graduate students in the MENTORADO program at Instituto Superior Técnico, facilitating their academic and social integration. Provided guidance on campus resources, courses, and student life, enhancing my ability to communicate clearly and support others through transitions.",
            pt: "Mentor de novos estudantes de licenciatura e mestrado no programa MENTORADO do Instituto Superior Técnico, facilitando a sua integração académica e social. Dei orientação sobre os recursos do campus, as unidades curriculares e a vida académica, o que reforçou a minha capacidade de comunicar com clareza e de apoiar outras pessoas em fases de transição.",
        },
        skills: {
            en: ["Mentoring", "Communication", "Leadership", "Empathy", "Onboarding"],
            pt: ["Mentoria", "Comunicação", "Liderança", "Empatia", "Integração"],
        },
        icon: "/nape.png",
    },
    {
        id: "leic",
        title: { en: "LEIC STUDENT", pt: "ESTUDANTE LEIC" },
        period: { en: "September 2024 — July 2027", pt: "setembro de 2024 — julho de 2027" },
        current: false,
        description: {
            en: "Final-year (3rd year) student of the BSc in Computer Science and Engineering (LEIC) at Instituto Superior Técnico, University of Lisbon. Strong foundation in programming, algorithms, data structures, databases and software engineering. Preparing to specialize in Artificial Intelligence through the MSc at IST.",
            pt: "Finalista (3.º ano) da Licenciatura em Engenharia Informática e de Computadores (LEIC) no Instituto Superior Técnico, Universidade de Lisboa. Base sólida em programação, algoritmos, estruturas de dados, bases de dados e engenharia de software. A preparar a especialização em Inteligência Artificial através do Mestrado no IST.",
        },
        skills: {
            en: ["Computer Science", "Algorithms", "Software Engineering", "Artificial Intelligence", "System Architecture", "Databases", "Computer Networks", "Distributed Systems"],
            pt: ["Ciência de Computadores", "Algoritmos", "Engenharia de Software", "Inteligência Artificial", "Arquitetura de Sistemas", "Bases de Dados", "Redes de Computadores", "Sistemas Distribuídos"],
        },
        icon: "/ist.png",
    },
];

/** The timeline in one language. */
export function getExperience(lang: Lang): ExperienceItem[] {
    return items.map((it) => ({
        id: it.id,
        title: it.title[lang],
        period: it.period[lang],
        current: it.current,
        description: it.description[lang],
        bullets: it.bullets?.[lang],
        skills: it.skills[lang],
        icon: it.icon,
    }));
}
