import { site } from "@/content/site";

export default function Footer() {
    return (
        <footer className="px-8 py-6 text-black dark:text-white">
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
                <p className="text-sm sm:text-base">
                    © {new Date().getFullYear()} {site.name} — All rights reserved.
                </p>

                <ul className="flex gap-10">
                    <li>
                        <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="fx-link">
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="fx-link">
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
