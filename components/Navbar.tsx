import Link from "next/link";
import { ThemeToggle } from "@/app/theme-toggle";
 
export default function Navbar() {
  return (
    <nav className="fixed top-0  w-full z-20 bg-white/80 flex justify-center py-6 shadow-2xl shadow-gray-300">

      

      <div className="flex justify-center text-xl font-bold text-black gap-25">

        <Link href="/" className="text-black hover:text-cyan-500 transition-colors duration-300">HOME</Link>

        <Link href="/work " className="text-black hover:text-cyan-500 transition-colors duration-300">PROJECTS</Link>

        <Link href="/cv" className="text-black hover:text-cyan-500 transition-colors duration-300">CV</Link>

        <Link href="/contacts" className="text-black hover:text-cyan-500 transition-colors duration-300">CONTACTS</Link>

      </div>

      <div className="absolute right-20 top-1/2 -translate-y-1/2">
        <ThemeToggle />
      </div>      
      
    </nav>
  );
}