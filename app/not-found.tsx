import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
        <span className="text-green-700 dark:text-green-400">c.dianov@pop-os</span>:
        <span className="text-blue-700 dark:text-blue-400">~</span>$ cd ./this-page
      </p>
      <h1 className="mt-4 text-6xl font-bold sm:text-8xl">404</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">bash: cd: no such file or directory</p>
      <Link
        href="/"
        className="fx-btn mt-10 inline-flex items-center gap-2 border-2 border-gray-900 bg-gray-900 px-6 py-3 font-bold text-white dark:border-white dark:bg-white dark:text-gray-900"
      >
        <span aria-hidden="true">←</span> Back home
      </Link>
    </section>
  );
}
