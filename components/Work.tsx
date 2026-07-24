import Link from "next/link";

export default function work(){
    return(
        <section className="relative min-h-screen">
            <p className="mt-30 text-center text-5xl font-bold opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                Projects
            </p>
            
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mt-20 mb-20 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">

                <Link href="https://github.com/CesarDanielDianov/PACMAN-SERVER"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        MULTI CLIENT PACMAN GAME
                    </h2>
                    <p className="mt-7">A C implementation of the Pacman Game ,built on a server-client achitecture</p>
                    <p className="mt-9">•Linux • C•</p>

                </Link>

                <Link href="https://github.com/CesarDanielDianov/LibraryManager"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        LIBRARY MANAGMENT SYSTEM
                    </h2>
                    <p className="mt-7">A text based  Library Managment system written in java</p>
                    <p className="mt-9 ">•Java•</p>

                </Link>

                <Link href="https://github.com/CesarDanielDianov/C-sar-s-Portofolio"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        PORTOFOLIO
                    </h2>
                    <p className="mt-7">A modern portfolio developed with Next.js and Tailwind CSS to showcase my work and technical background.</p>
                    <p className="mt-9">•Next.js • React • TypeScript • Tailwind CSS•</p>

                </Link>  

                <Link href="https://github.com/CesarDanielDianov/VACCINE-MANAGER"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        VACCINE MANAGMENT SYSTEM
                    </h2>
                    <p className="mt-7">A text based vaccine managment system implemneted in C.</p>
                    <p className="mt-9">•C•</p>

                </Link>                   

                <Link href="https://github.com/CesarDanielDianov/SlitherLink-AI-Solver"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        SLITHERLINK AI SOLVER
                    </h2>
                    <p className="mt-7">AI-powered solver for SlitherLink puzzles using custom algorithms to calculate optimal solutions.</p>
                    <p className="mt-9">•Python • AI Algorithms•</p>

                </Link>                   

            </div>

        </section>
    );
}