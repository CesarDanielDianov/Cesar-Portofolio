import { site } from "@/content/site";
import { dict } from "@/content/i18n";
import { getLang } from "@/lib/i18n-server";

export default async function Footer() {
    const t = dict[await getLang()].footer;
    return (
        <footer className="mt-16 px-8 py-6 text-black md:mt-24 dark:text-white">
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
                <p className="text-sm sm:text-base">
                    © {new Date().getFullYear()} {site.name} — {t.rights}
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
