import Link from "next/link";

export default function work(){
    return(
        <section className="relative min-h-screen">
            <p className=" mt-30 mb-15 text-center text-6xl font-bold opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                Projects 📁
            </p>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-5xl mx-auto">

                <Link href="https://github.com/CesarDanielDianov/SlitherLink-AI-Solver"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        SLITHERLINK AI SOLVER
                    </h2>
                    <p className="mt-7">AI-powered solver for SlitherLink puzzles using custom algorithms to calculate optimal solutions.</p>

                    <div className="flex justify-between">
                        <div className="flex gap-1">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-20 ">Python </p>
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-35 ">AI Algorithms </p>
                        </div>
                        <img
                            src="/robot.png"
                            alt="rb"
                            className=" mt-9 w-12 h-12"
                        />
                    </div>


                </Link>   


                <Link href="https://github.com/CesarDanielDianov/C-sar-s-Portofolio"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white 
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        PORTOFOLIO
                    </h2>
                    <p className="mt-7">A modern portfolio developed with Next.js and Tailwind CSS to showcase my work and technical background.</p>
                    
                    <div className="flex justify-between">
                        <div className="flex gap-1">
                            <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Next.js </p>
                            <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-16 ">React </p>
                            <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-27 ">TypeScript </p>
                            <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-14 "> CSS </p>
                        </div>
                        <img
                            src="/porrt.png"
                            alt="lib"
                            className=" mt-10 w-12 h-12 rotate-7"
                        />
                    </div>

                </Link>  


                <Link href="https://github.com/CesarDanielDianov/PACMAN-SERVER"
                    className="block h-60 rounded-3xl border-4 border-cyan-500  
                    bg-gradient-to-br from-cyan-100 to-white  dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        MULTI CLIENT PACMAN GAME
                    </h2>
                    
                    <p className="mt-7">A C implementation of the Pacman Game ,built on a server-client achitecture</p>
                    <div className="flex justify-between">
                        <div className="flex gap-1">
                            <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-16 ">Linux </p>
                            <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-8 ">C </p>
                        </div>
                        <img
                            src="/pacman.png"
                            alt="pac"
                            className=" mt-10 w-10 h-10"
                        />
                    </div>
                </Link>

                <Link href="https://github.com/CesarDanielDianov/LibraryManager"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        LIBRARY MANAGMENT SYSTEM
                    </h2>
                    <p className="mt-7">A text based  Library Managment system written in java</p>



                    <div className="flex justify-between">
                        <div className="flex gap-1">
                        <p className="flex items-center justify-center mt-15 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-16 ">Java </p>
                        </div>
                        <img
                            src="/l.png"
                            alt="l"
                            className=" mt-12 w-12 h-12"
                        />
                    </div>                    
                </Link>


                <Link href="https://github.com/CesarDanielDianov/VACCINE-MANAGER"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        VACCINE MANAGMENT SYSTEM
                    </h2>
                    <p className="mt-7">A text based vaccine managment system implemneted in C.</p>

                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-17 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-8 ">C </p>
                        <img
                        src="/vacc.png"
                        alt="lv"
                        className=" mt-12 ml-17 w-13 h-13 "                   
                        />                        
                    </div>

                </Link>                   




                <Link href="https://github.com/CesarDanielDianov/Star-Battle-Game-Solver"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        STAR BATTLE GAME SOLVER
                    </h2>
                    <p className="mt-7">A Prolog Implementation of a Script wich the main focuse is to algorithmically solve Star Battle.</p>
                    
                    <div className="flex justify-between">
                        <div className="flex gap-1">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Prolog </p>
                        </div>
                        <img
                            src="/puzz.png"
                            alt="p"
                            className=" mt-12 w-10 h-10"
                        />
                    </div>                    
                </Link>   

                <Link href="https://github.com/CesarDanielDianov/Protein-Chain-Energy-Maximizer"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        PROTEIN CHAIN ENERGY MAXIMIZER
                    </h2>
                    <p className="mt-7">A Protein Chain Energy Maximizer algorithm written in C++ for my Analysis and Synthesis of Algorithms.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-11 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-14 ">C++ </p>
                    
                        <img
                        src="/eff.png"
                        alt="eff"
                        className=" mt-9 ml-37 w-13 h-11 "                   
                        />                      
                    </div>
                </Link>   


                <Link href="https://github.com/CesarDanielDianov/DAG-Path-Counter-Truck-Routing"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        DAG PATH COUNTER TRUCK ROUTING
                    </h2>
                    <p className="mt-7">A C++ DAG Path Counter & Truck Routing algorithm for my Anaysis and Synthesis for Algorithms.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-11 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-14 ">C++ </p>
                    
                        <img
                        src="/eff.png"
                        alt="eff"
                        className=" mt-9 ml-37 w-13 h-11 "                   
                        />                      
                    </div>
                </Link>   


                <Link href="https://github.com/CesarDanielDianov/8-bit-Spike-Processor"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        8-BIT SPIKE PROCESSOR
                    </h2>
                    <p className="mt-7">A logic diagram implementation of a processor with a 8-bit data path architecture.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-20 ">Logisim </p>
                    
                        <img
                        src="/7.png"
                        alt="6"
                        className=" mt-7 ml-44 w-12 h-12 "                   
                        />                      
                    </div>
                </Link>                   

                <Link href="https://github.com/CesarDanielDianov/Selection-Optimization-UI"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        SELECTION OPTIMIZATION UI
                    </h2>
                    <p className="mt-7">Human-Computer Interaction project focused on optimizing dense UI target selection.</p>

                    <div className="flex justify-between">
                        <div className="flex gap-1">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-24 ">Javascript </p>
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-14 ">CSS </p>
                        </div>
                        <img
                            src="/e.png"
                            alt="e"
                            className=" mt-10 w-14 h-10"
                        />
                    </div>                    
                </Link>  

                <Link href="https://github.com/CesarDanielDianov/FOODINHO"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        FOODINHO
                    </h2>
                    <p className="mt-7">Modern food-focused mobile app UI/UX prototype designed in Figma.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Figma </p>
                        <img
                        src="/44.png"
                        alt="44"
                        className=" mt-5 ml-44 w-13 h-13 "                   
                        />                      
                    </div>
                </Link> 

                <Link href="https://github.com/CesarDanielDianov/Neural-Network-in-RISC-V"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        NEURAL NETWORK 
                    </h2>
                    <p className="mt-7">An implementation in Assembly RISC-V of a feedforward Artificial Neural Network.</p>

                    <div className="flex justify-between">
                        <div className="flex gap-1">
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-24 ">Assembly </p>
                        <p className="flex items-center justify-center mt-12 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-20 ">RISC-V </p>
                        </div>
                        <img
                            src="/9.png"
                            alt="9"
                            className=" mt-10 w-12 h-12"
                        />
                    </div>                      
                </Link> 

                <Link href="https://github.com/CesarDanielDianov/MILP-Sports-League-Optimizer"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        MILP SPORTS LEAGUE OPTIMIZER
                    </h2>
                    <p className="mt-3">A Pyhton implementation of a MILP Sports League Optimizer for my Analysis and Synthesis of Algorithms.</p>
                    <div className="flex items-center justify-between w-full  -mt-12 md:mt-1">
                        <p className="flex items-center justify-center mt-15 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Python </p>
                        <img
                        src="/eff.png"
                        alt="eff"
                        className=" mt-12 ml-37 w-13 h-11 "                   
                        />                      
                    </div>
                </Link> 

                <Link href="https://github.com/CesarDanielDianov/ZOO-MANAGMENT-DATABASE"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        ZOO DATABASE
                    </h2>
                    <p className="mt-9">Zoo management relational database with UML design, implemented using PostgreSQL and SQL.</p>
                    
                    <div className="flex items-center justify-between w-full  mt-2 md:mt-6">
                        <div className="flex gap-1">
                            <p className="flex items-center justify-center font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-26">PostgreSQL</p>

                            <p className="flex items-center justify-center font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-14">SQL</p>
                        </div>

                    <img
                        src="/99.png"
                        alt="99"
                        className="w-13 h-13"
                    />
                    </div>
                </Link> 

                <Link href="https://github.com/CesarDanielDianov/Orbito-game"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        ORBITO GAME
                    </h2>
                    <p className="mt-9">A playable implementation of the Orbito board game built with Python.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-9 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Pyhton </p>
                        <img
                        src="/puzz.png"
                        alt="p"
                        className=" mt-5 ml-37 w-13 h-13 "                   
                        />                      
                    </div>
                </Link> 

                <Link href="https://github.com/CesarDanielDianov/MNK-Game"
                    className="block h-60 rounded-3xl border-4 border-cyan-500 
                    bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white
                    p-6 mt-2 transition-all duration-300 hover:border-cyan-700 -translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                    <h2 className="text-2xl font-bold">
                        MNK GAME
                    </h2>
                    <p className="mt-9">A playable implementation of the MNK board game built with Python.</p>
                    <div className="flex justify-between">
                        <p className="flex items-center justify-center mt-9 font-bold h-8 rounded-2xl border-2 bg-cyan-500 text-white w-18 ">Pyhton </p>
                        <img
                        src="/puzz.png"
                        alt="p"
                        className=" mt-5 ml-37 w-13 h-13 "                   
                        />                      
                    </div>
                </Link> 

            </div>   

            <p className="flex justify-center text-gray-400 font-bold mt-10 mb-5">
                More projects are on the way. Stay tuned!
            </p>
        </section>
    );
}