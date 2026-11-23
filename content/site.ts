/** Site-wide identity, links and navigation. Single source of truth for the UI. */
export const site = {
    name: "César Dianov",
    title: "César Dianov | Portfolio",
    description:
        "Computer Science and Engineering student at Instituto Superior Técnico. Software engineering, AI and automation.",
    tagline: "Computer Engineering Student @ IST",
    location: "Oeiras, Portugal",
    cv: {
        href: "/cesar-dianov-cv.pdf",
        downloadName: "Cesar-Dianov-CV.pdf",
    },
    links: {
        github: "https://github.com/CesarDanielDianov",
        linkedin: "https://www.linkedin.com/in/c%C3%A9sar-dianov-91b3993a0/",
    },
} as const;

export const nav = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/cv", label: "CV" },
] as const;
