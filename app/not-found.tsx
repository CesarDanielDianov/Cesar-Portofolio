import type { Metadata } from "next";
import Link from "next/link";
import { dict } from "@/content/i18n";
import { getLang } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: dict[await getLang()].notFound.title };
}

export default async function NotFound() {
  const t = dict[await getLang()].notFound;
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-36 text-center sm:pt-24">
      <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
        <span className="text-green-700 dark:text-green-400">c.dianov@pop-os</span>:
        <span className="text-blue-700 dark:text-blue-400">~</span>$ cd ./this-page
      </p>
      <h1 className="mt-4 text-6xl font-bold sm:text-8xl">404</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{t.error}</p>
      <Link
        href="/"
        className="fx-btn mt-10 inline-flex items-center gap-2 border-2 border-gray-900 bg-gray-900 px-6 py-3 font-bold text-white dark:border-white dark:bg-white dark:text-gray-900"
      >
        <span aria-hidden="true">←</span> {t.back}
      </Link>
    </section>
  );
}
