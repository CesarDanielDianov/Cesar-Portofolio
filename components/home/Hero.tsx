import Link from "next/link";
import Terminal from "@/components/home/Terminal";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl content-center items-center gap-12 px-6 pt-35 pb-16 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div>
          <h1 className="mb-6 text-center text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl lg:text-left lg:text-8xl animate-[fadeDown_1.6s_ease-out_forwards]">
            <span className="block">César</span>
            <span className="fx-outline">Dianov</span>
            <span aria-hidden="true" className="fx-caret fx-caret-lg" />
          </h1>

          <p className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-xl border-2 border-gray-500 px-5 py-2 text-sm font-bold text-gray-600 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] dark:text-white sm:text-base md:text-lg lg:mx-0">
            {site.tagline}
            <span className="relative flex h-3 w-3">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-3 w-3 rounded-full bg-green-500" />
            </span>
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-left text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:mx-0 animate-[fadeIn_1.6s_ease-out_forwards]">
            Computer Engineering student at IST, IT Executive at Five Thousand Miles, Dev-Team & HR member at NEIIST. Passionate about software engineering, AI, and technology.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards] lg:justify-start">
            <Link
              href="/projects"
              className="fx-btn group inline-flex items-center gap-2 border-2 border-gray-900 bg-gray-900 px-6 py-3 font-bold text-white dark:border-white dark:bg-white dark:text-gray-900"
            >
              View projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/cv"
              className="fx-btn group inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-bold dark:border-white"
            >
              Read my CV
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards] lg:justify-end">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
