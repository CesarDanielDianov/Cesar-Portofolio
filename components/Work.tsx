import Link from "next/link";

export default function work(){
    return(
        <section className="relative min-h-screen">
            <p className=" mt-30 text-center text-6xl font-bold opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                Projects 📁
            </p>
            
            <div className="grid grid-cols-2 gap-6   max-w-4xl mx-auto mt-20 mb-20 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">

                <Link href="https://github.com/CesarDanielDianov/PACMAN-SERVER"
                    className="block h-60 rounded-3xl border-4 border-cyan-500  
                    bg-gradient-to-br from-cyan-100 to-white  dark:from-cyan-900 dark:to-black dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        MULTI CLIENT PACMAN GAME
                    </h2>
                    
                    <p className="mt-7">A C implementation of the Pacman Game ,built on a server-client achitecture</p>
                    <div className="flex justify-between">
                        <div className="flex">
                            <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-16 ">Linux </p>
                            <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-8 ">C </p>
                        </div>
                        <img
                            src="/pacman.png"
                            alt="pac"
                            className=" mt-9 w-10 h-10"
                        />
                    </div>
                </Link>

                <Link href="https://github.com/CesarDanielDianov/LibraryManager"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-cyan-900 dark:to-black dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        LIBRARY MANAGMENT SYSTEM
                    </h2>
                    <p className="mt-7">A text based  Library Managment system written in java</p>

                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-16 ">Java </p>
                        <img
                            src="/library.webp"
                            alt="lib"
                            className=" mt-9 w-10 h-10 "                   
                        />
                    </div>
                </Link>

                <Link href="https://github.com/CesarDanielDianov/C-sar-s-Portofolio"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-cyan-900 dark:to-black dark:text-white 
                    p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        PORTOFOLIO
                    </h2>
                    <p className="mt-7">A modern portfolio developed with Next.js and Tailwind CSS to showcase my work and technical background.</p>
                    

                    <div className="flex justify-between">
                        <div className="flex ">
                            <p className="flex items-center justify-center mt-6 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Next.js </p>
                            <p className="flex items-center justify-center mt-6 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-16 ">React </p>
                            <p className="flex items-center justify-center mt-6 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-27 ">TypeScript </p>
                            <p className="flex items-center justify-center mt-6 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-14 "> CSS </p>

                            <img
                            src="/porrt.png"
                            alt="lib"
                            className=" mt-4 ml-17 w-10 h-10 rotate-6"                   
                            />
                        </div>


                    </div>

                </Link>  

                <Link href="https://github.com/CesarDanielDianov/VACCINE-MANAGER"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-cyan-900 dark:to-black dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        VACCINE MANAGMENT SYSTEM
                    </h2>
                    <p className="mt-7">A text based vaccine managment system implemneted in C.</p>

                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-13 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-8 ">C </p>
                        <img
                        src="/vacc.png"
                        alt="lv"
                        className=" mt-8 ml-17 w-13 h-13 "                   
                        />                        
                    </div>

                </Link>                   

                <Link href="https://github.com/CesarDanielDianov/SlitherLink-AI-Solver"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-cyan-900 dark:to-black dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        SLITHERLINK AI SOLVER
                    </h2>
                    <p className="mt-7">AI-powered solver for SlitherLink puzzles using custom algorithms to calculate optimal solutions.</p>
                    <div className="flex">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Python </p>
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-33 ">AI Algorithms </p>
                        
                        <img
                        src="/robot.png"
                        alt="rb"
                        className=" mt-9 ml-37 w-13 h-13 "                   
                        />                               
                    </div>
                </Link>   


                <Link href="https://github.com/CesarDanielDianov/Star-Battle-Game-Solver"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-cyan-900 dark:to-black dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        STAR BATTLE GAME SOLVER
                    </h2>
                    <p className="mt-7">A Prolog Implementation of a Script wich the main focuse is to algorithmically solve Star Battle.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Prolog </p>
                    
                        <img
                        src="/puzz.png"
                        alt="p"
                        className=" mt-8 ml-37 w-13 h-13 "                   
                        />                      
                    </div>
                </Link>   

                <Link href="https://github.com/CesarDanielDianov/Protein-Chain-Energy-Maximizer"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-cyan-900 dark:to-black dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        PROTEIN-CHAIN-ENERGY-MAXIMIZER
                    </h2>
                    <p className="mt-7">A Protein Chain Energy Maximizer algorithm written in C++ for my Analysis and Synthesis of Algorithms.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-5 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">C++ </p>
                    
                        <img
                        src="/opt.jpg"
                        alt="opt"
                        className=" mt-3 ml-37 w-13 h-13 "                   
                        />                      
                    </div>
                </Link>   


                <Link href="https://github.com/CesarDanielDianov/DAG-Path-Counter-Truck-Routing"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-cyan-900 dark:to-black dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        DAG-PATH-COUNTER-TRUCK-ROUTING
                    </h2>
                    <p className="mt-7">A C++ DAG Path Counter & Truck Routing algorithm for my Anaysis and Synthesis for Algorithms.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-5 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">C++ </p>
                    
                        <img
                        src="/opt.jpg"
                        alt="opt"
                        className=" mt-3 ml-37 w-13 h-13 "                   
                        />                      
                    </div>
                </Link>   


            </div>

        </section>
    );
}