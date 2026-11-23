import Image from "next/image";
import { projects, type Project, type ProjectLayout } from "@/content/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";

/** Grid placement, on the paper-stack wrapper. */
const SPAN: Record<ProjectLayout, string> = {
    featured: "md:col-span-2 lg:row-span-2",
    tall: "lg:row-span-2",
    wide: "md:col-span-2",
    standard: "",
};

const PAD: Record<ProjectLayout, string> = {
    featured: "p-8",
    tall: "p-6",
    wide: "p-6",
    standard: "p-6",
};

const ICON_SIZE: Record<ProjectLayout, { cls: string; px: number }> = {
    featured: { cls: "h-36 w-36", px: 144 },
    tall: { cls: "h-24 w-24", px: 96 },
    wide: { cls: "h-20 w-20", px: 80 },
    standard: { cls: "h-12 w-12", px: 48 },
};

/** Framed panel the icon sits in on the larger cards, so it fills the space on purpose. */
const STAGE: Record<Exclude<ProjectLayout, "standard">, string> = {
    featured: "my-6 min-h-56 flex-1",
    tall: "my-6 min-h-40 flex-1",
    wide: "h-40 w-full sm:h-auto sm:w-44 sm:self-stretch",
};

const TITLE: Record<ProjectLayout, string> = {
    featured: "text-3xl font-bold sm:text-4xl",
    tall: "text-2xl font-bold md:text-3xl",
    wide: "text-2xl font-bold md:text-3xl",
    standard: "text-2xl font-bold",
};

function Tags({ tags }: { tags: string[] }) {
    return (
        <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">Tech stack</p>
            <ul className="flex flex-wrap gap-2">
                {tags.map((t) => (
                    <li
                        key={t}
                        className="fx-tag flex h-8 items-center justify-center bg-gray-400 px-4 font-bold text-white dark:bg-gray-800"
                    >
                        {t}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ViewOnGitHub() {
    return (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold opacity-70">
            View on GitHub <span aria-hidden="true" className="fx-go inline-block transition-transform duration-300">↗</span>
        </span>
    );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
    const num = String(index + 1).padStart(2, "0");
    const big = p.layout === "featured";
    const icon = ICON_SIZE[p.layout];

    const text = (
        <div className="flex flex-1 flex-col">
            <span className="mb-2 text-sm font-bold opacity-40" aria-hidden="true">{num}</span>
            <h2 className={TITLE[p.layout]}>{p.title}</h2>
            <p className={cn("mt-5", big && "text-lg")}>{p.desc}</p>
            {p.more?.map((t) => (
                <p key={t} className={cn("mt-4 opacity-80", big ? "text-base" : "text-sm")}>{t}</p>
            ))}
            <div className="flex-grow" />
        </div>
    );

    const img = (
        <Image
            src={p.icon}
            alt={p.iconAlt}
            width={icon.px}
            height={icon.px}
            className={cn(
                "fx-icon flex-shrink-0 object-contain",
                p.layout !== "standard" && "drop-shadow-lg",
                icon.cls,
                p.iconClassName
            )}
        />
    );

    const stage = p.layout !== "standard" && (
        <div className={cn("fx-stage flex items-center justify-center overflow-hidden border border-(--paper-edge)", STAGE[p.layout])}>
            {img}
        </div>
    );

    return (
        <div className={cn("fx-sheets", index % 2 && "fx-sheets-alt", SPAN[p.layout])}>
        <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("fx-card fx-paper-top flex h-full flex-col border border-(--paper-edge) dark:text-white", PAD[p.layout])}
        >
            {p.layout === "wide" ? (
                <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-1 flex-col">
                        {text}
                        <div className="mt-6"><Tags tags={p.tags} /></div>
                        <ViewOnGitHub />
                    </div>
                    {stage}
                </div>
            ) : p.layout === "featured" || p.layout === "tall" ? (
                <>
                    {text}
                    {stage}
                    <Tags tags={p.tags} />
                    <ViewOnGitHub />
                </>
            ) : (
                <>
                    {text}
                    <div className="mt-6 flex items-end justify-between gap-4">
                        <Tags tags={p.tags} />
                        {img}
                    </div>
                    <ViewOnGitHub />
                </>
            )}
        </a>
        </div>
    );
}

export default function ProjectGrid() {
    return (
        <section className="relative min-h-screen">
            <PageHeader subtitle="AI solvers, systems programming, databases & more">Projects</PageHeader>

            <div className="mx-auto grid max-w-7xl grid-flow-dense auto-rows-[minmax(240px,auto)] grid-cols-1 gap-5 px-6 pb-16 md:grid-cols-2 lg:grid-cols-4">
                {projects.map((p, i) => (
                    <ProjectCard key={p.href} p={p} index={i} />
                ))}
            </div>

            <p className="mt-10 mb-5 flex justify-center font-bold text-gray-400">
                More projects are on the way. Stay tuned!
            </p>
        </section>
    );
}
