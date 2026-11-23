import { site } from "@/content/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { dict } from "@/content/i18n";
import { getLang } from "@/lib/i18n-server";

/**
 * The CV "prints" on arrival: the PDF sheet feeds out of a printer slot in a
 * few stepped pulls (CSS only, see .fx-printer in globals.css), then rests on
 * a small paper stack. Reduced motion shows it in place straight away.
 */
export default async function CvViewer() {
    const t = dict[await getLang()].cv;
    return (
        <section className="relative min-h-screen px-4">
            <PageHeader subtitle={t.subtitle} className="mb-0 md:mb-0">{t.title}</PageHeader>

            <div className="mt-10 flex flex-wrap justify-center gap-4 opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
                <a
                    href={site.cv.href}
                    download={site.cv.downloadName}
                    className="fx-btn group inline-flex items-center gap-2 border-2 border-gray-900 bg-gray-900 px-6 py-3 font-bold text-white dark:border-white dark:bg-white dark:text-gray-900"
                >
                    {t.download}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </a>
                <a
                    href={site.cv.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fx-btn group inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-bold dark:border-white"
                >
                    {t.newTab}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
            </div>

            <div className="fx-printer mx-auto mt-12 mb-20 w-full md:w-4/5 lg:w-3/4">
                {/* Printer slot with a status light */}
                <div aria-hidden="true" className="fx-printer-slot">
                    <span className="fx-printer-led" />
                </div>

                {/* Everything above the slot is clipped, so the sheet appears to come out of it */}
                <div className="fx-paper-window">
                    <div className="fx-paper">
                        <iframe
                            src={site.cv.href}
                            title={t.frameTitle(site.name)}
                            className="block h-[75vh] w-full bg-white md:h-screen"
                        />
                    </div>
                </div>
            </div>

            <p className="-mt-12 mb-16 text-center text-sm text-gray-500 dark:text-gray-400">
                {t.notShowing}{" "}
                <a href={site.cv.href} download={site.cv.downloadName} className="font-bold underline decoration-dotted">
                    {t.downloadInstead}
                </a>
            </p>
        </section>
    );
}
