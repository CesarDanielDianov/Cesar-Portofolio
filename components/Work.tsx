import Link from "next/link";

export default function work() {
    return (
        <section className="relative min-h-screen">
            <p className="mt-30 mb-15 text-center text-6xl font-bold opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                Projects 📁
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-5xl mx-auto">

                <Link
                    href="https://github.com/CesarDanielDianov/SlitherLink-AI-Solver"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        SLITHERLINK AI SOLVER
                    </h2>

                    <p className="mt-5 flex-grow">
                        AI-powered solver for SlitherLink puzzles using custom algorithms to calculate optimal solutions.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <p className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Python
                            </p>

                            <p className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                AI Algorithms
                            </p>
                        </div>

                        <img
                            src="/robot.png"
                            alt="Robot"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/C-sar-s-Portofolio"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        PORTFOLIO
                    </h2>

                    <p className="mt-5 flex-grow">
                        A modern portfolio developed with Next.js and Tailwind CSS to showcase my work and technical background.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <p className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Next.js
                            </p>

                            <p className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                React
                            </p>

                            <p className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                TypeScript
                            </p>

                            <p className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                CSS
                            </p>
                        </div>

                        <img
                            src="/porrt.png"
                            alt="Portfolio"
                            className="w-12 h-12 object-contain flex-shrink-0 rotate-6"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/PACMAN-SERVER"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        MULTI CLIENT PACMAN GAME
                    </h2>

                    <p className="mt-5 flex-grow">
                        A C implementation of the Pacman Game, built on a server-client architecture.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <p className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Linux
                            </p>

                            <p className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                C
                            </p>
                        </div>

                        <img
                            src="/pacman.png"
                            alt="s"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>



                <Link
                    href="https://github.com/CesarDanielDianov/LibraryManager"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        LIBRARY MANAGEMENT SYSTEM
                    </h2>

                    <p className="mt-5 flex-grow">
                        A text-based library management system written in Java.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Java
                            </span>
                        </div>

                        <img
                            src="/l.png"
                            alt="Library"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/VACCINE-MANAGER"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        VACCINE MANAGEMENT SYSTEM
                    </h2>

                    <p className="mt-5 flex-grow">
                        A text-based vaccine management system implemented in C.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                C
                            </span>
                        </div>

                        <img
                            src="/vacc.png"
                            alt="Vaccine"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/Star-Battle-Game-Solver"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        STAR BATTLE GAME SOLVER
                    </h2>

                    <p className="mt-5 flex-grow">
                        A Prolog implementation of a solver that algorithmically solves Star Battle puzzles.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Prolog
                            </span>
                        </div>

                        <img
                            src="/puzz.png"
                            alt="Puzzle"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>   






                <Link
                    href="https://github.com/CesarDanielDianov/Protein-Chain-Energy-Maximizer"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        PROTEIN CHAIN ENERGY MAXIMIZER
                    </h2>

                    <p className="mt-5 flex-grow">
                        A C++ algorithm developed for the Analysis and Synthesis of Algorithms course to maximize protein chain energy.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                C++
                            </span>
                        </div>

                        <img
                            src="/eff.png"
                            alt="Protein"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/DAG-Path-Counter-Truck-Routing"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        DAG PATH COUNTER TRUCK ROUTING
                    </h2>

                    <p className="mt-5 flex-grow">
                        A C++ project implementing DAG path counting and truck routing algorithms for the Analysis and Synthesis of Algorithms course.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                C++
                            </span>
                        </div>

                        <img
                            src="/eff.png"
                            alt="Algorithms"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/8-bit-Spike-Processor"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        8-BIT SPIKE PROCESSOR
                    </h2>

                    <p className="mt-5 flex-grow">
                        A logic diagram implementation of an 8-bit processor featuring a complete data path architecture.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Logisim
                            </span>
                        </div>

                        <img
                            src="/7.png"
                            alt="Processor"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/Selection-Optimization-UI"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        SELECTION OPTIMIZATION UI
                    </h2>

                    <p className="mt-5 flex-grow">
                        A Human-Computer Interaction project focused on optimizing dense user interface target selection.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                JavaScript
                            </span>

                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                CSS
                            </span>
                        </div>

                        <img
                            src="/e.png"
                            alt="UI"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link> 




                <Link
                    href="https://github.com/CesarDanielDianov/FOODINHO"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        FOODINHO
                    </h2>

                    <p className="mt-5 flex-grow">
                        A modern food-focused mobile app UI/UX prototype designed in Figma.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Figma
                            </span>
                        </div>

                        <img
                            src="/44.png"
                            alt="Foodinho"
                            className="w-14 h-14 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/Neural-Network-in-RISC-V"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        NEURAL NETWORK
                    </h2>

                    <p className="mt-5 flex-grow">
                        An Assembly RISC-V implementation of a feedforward artificial neural network.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Assembly
                            </span>

                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                RISC-V
                            </span>
                        </div>

                        <img
                            src="/9.png"
                            alt="Neural Network"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/MILP-Sports-League-Optimizer"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        MILP SPORTS LEAGUE OPTIMIZER
                    </h2>

                    <p className="mt-5 flex-grow">
                        A Python implementation of a MILP Sports League Optimizer developed for the Analysis and Synthesis of Algorithms course.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Python
                            </span>
                        </div>

                        <img
                            src="/eff.png"
                            alt="MILP"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/ZOO-MANAGMENT-DATABASE"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        ZOO DATABASE
                    </h2>

                    <p className="mt-5 flex-grow">
                        A zoo management relational database with UML design, implemented using PostgreSQL and SQL.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                PostgreSQL
                            </span>

                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                SQL
                            </span>
                        </div>

                        <img
                            src="/99.png"
                            alt="Zoo Database"
                            className="w-12 h-12 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>


                <Link
                    href="https://github.com/CesarDanielDianov/Orbito-game"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        ORBITO GAME
                    </h2>

                    <p className="mt-5 flex-grow">
                        A playable implementation of the Orbito board game built with Python.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Python
                            </span>
                        </div>

                        <img
                            src="/game.png"
                            alt="game"
                            className="w-15 h-15 object-contain flex-shrink-0"
                        />
                    </div>
                </Link>

                <Link
                    href="https://github.com/CesarDanielDianov/MNK-Game"
                    className="flex flex-col rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-100 to-white dark:from-gray-700 dark:to-gray-900 dark:text-white p-6 transition-all duration-300 hover:border-cyan-700 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                >
                    <h2 className="text-2xl font-bold">
                        MNK GAME
                    </h2>

                    <p className="mt-5 flex-grow">
                        A playable implementation of the MNK board game built with Python.
                    </p>

                    <div className="flex items-end justify-between mt-6">
                        <div className="flex gap-2 flex-wrap">
                            <span className="flex items-center justify-center h-8 px-4 rounded-2xl bg-cyan-500 text-white font-bold">
                                Python
                            </span>
                        </div>

                        <img
                            src="/game.png"
                            alt="game"
                            className="w-15 h-15 object-contain flex-shrink-0"
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