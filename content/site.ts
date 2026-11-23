/**
 * Site-wide identity, links and navigation. Single source of truth for the UI.
 * Translated text (title, description, tagline, nav labels) lives in content/i18n.ts.
 */
export const site = {
    name: "César Dianov",
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

/** `key` picks the label from the dictionary's `nav` section. */
export const nav = [
    { href: "/", key: "home" },
    { href: "/experience", key: "experience" },
    { href: "/projects", key: "projects" },
    { href: "/cv", key: "cv" },
] as const;
