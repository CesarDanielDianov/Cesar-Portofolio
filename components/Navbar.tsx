import Link from "next/link";
import { ThemeToggle } from "@/app/theme-toggle";

export default function Navbar() {
  return (
    <nav
      className="
      fixed top-0 z-20 w-full
      bg-white/80 dark:bg-gray-800/80
      backdrop-blur-md
      shadow-2xl shadow-gray-300 dark:shadow-gray-900"
    >
      <div className="relative flex items-center justify-center py-4 px-4">

        <div
          className="
          flex items-center
          gap-4 sm:gap-6 md:gap-10 lg:gap-20
          text-xs sm:text-sm md:text-lg lg:text-xl
          font-bold
          dark:text-white"
        >
          <Link href="/" className="hover:text-cyan-500 transition-colors">
            HOME
          </Link>

          <Link href="/work" className="hover:text-cyan-500 transition-colors">
            PROJECTS
          </Link>

          <Link href="/cv" className="hover:text-cyan-500 transition-colors">
            CV
          </Link>

          <Link href="/contacts" className="hover:text-cyan-500 transition-colors">
            CONTACTS
          </Link>
        </div>

        <div className="absolute right-4 sm:right-6 md:right-10 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
}