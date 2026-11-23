export type ProjectLayout = "featured" | "tall" | "wide" | "standard";

export type Project = {
    title: string;
    href: string;
    desc: string;
    /** Extra paragraphs shown on larger cards. */
    more?: string[];
    tags: string[];
    icon: string;
    iconAlt: string;
    /** Optional extra classes for the icon (e.g. a rotation). */
    iconClassName?: string;
    /** Grid footprint of the card in the bento layout. */
    layout: ProjectLayout;
};

export const projects: Project[] = [
    {
        title: "SLITHERLINK AI SOLVER",
        href: "https://github.com/CesarDanielDianov/SlitherLink-AI-Solver",
        desc: "AI-powered solver for SlitherLink puzzles using custom algorithms to calculate optimal solutions.",
        more: [
            "Slitherlink is a logic puzzle where you draw a single closed loop through a grid of dots, guided by the numbers written in the cells. Each number says how many of that cell's four edges belong to the loop.",
            "This solver reads a puzzle, applies the rules of the game through custom algorithms, and searches for a valid loop on its own instead of relying on trial and error.",
        ],
        tags: ["Python", "AI Algorithms"],
        icon: "/robot.png",
        iconAlt: "Robot",
        layout: "featured",
    },
    {
        title: "NEURAL NETWORK",
        href: "https://github.com/CesarDanielDianov/Neural-Network-in-RISC-V",
        desc: "An Assembly RISC-V implementation of a feedforward artificial neural network.",
        tags: ["Assembly", "RISC-V"],
        icon: "/9.png",
        iconAlt: "Neural Network",
        layout: "standard",
    },
    {
        title: "ZOO DATABASE",
        href: "https://github.com/CesarDanielDianov/ZOO-MANAGMENT-DATABASE",
        desc: "A zoo management relational database with UML design, implemented using PostgreSQL and SQL.",
        tags: ["PostgreSQL", "SQL"],
        icon: "/99.png",
        iconAlt: "Zoo Database",
        layout: "standard",
    },
    {
        title: "LIBRARY MANAGEMENT SYSTEM",
        href: "https://github.com/CesarDanielDianov/LibraryManager",
        desc: "A text-based library management system written in Java.",
        tags: ["Java"],
        icon: "/l.png",
        iconAlt: "Library",
        layout: "standard",
    },
    {
        title: "ORBITO GAME",
        href: "https://github.com/CesarDanielDianov/Orbito-game",
        desc: "A playable implementation of the Orbito board game built with Python.",
        tags: ["Python"],
        icon: "/game.png",
        iconAlt: "Game",
        layout: "standard",
    },
    {
        title: "MULTI CLIENT PACMAN GAME",
        href: "https://github.com/CesarDanielDianov/PACMAN-SERVER",
        desc: "A C implementation of the Pacman Game, built on a server-client architecture.",
        more: [
            "A multiplayer version of the classic Pacman, written in C for Linux. A central server keeps the state of the game and several clients connect to it to play at the same time.",
        ],
        tags: ["Linux", "C"],
        icon: "/pacman.png",
        iconAlt: "Pacman",
        layout: "tall",
    },
    {
        title: "PROTEIN CHAIN ENERGY MAXIMIZER",
        href: "https://github.com/CesarDanielDianov/Protein-Chain-Energy-Maximizer",
        desc: "A C++ algorithm developed for the Analysis and Synthesis of Algorithms course to maximize protein chain energy.",
        tags: ["C++"],
        icon: "/eff.png",
        iconAlt: "Protein",
        layout: "standard",
    },
    {
        title: "8-BIT SPIKE PROCESSOR",
        href: "https://github.com/CesarDanielDianov/8-bit-Spike-Processor",
        desc: "A logic diagram implementation of an 8-bit processor featuring a complete data path architecture.",
        tags: ["Logisim"],
        icon: "/7.png",
        iconAlt: "Processor",
        layout: "standard",
    },
    {
        title: "STAR BATTLE GAME SOLVER",
        href: "https://github.com/CesarDanielDianov/Star-Battle-Game-Solver",
        desc: "A Prolog implementation of a solver that algorithmically solves Star Battle puzzles.",
        more: [
            "Star Battle is a grid puzzle where stars are placed so that every row, column and region holds the same number of stars, and no two stars touch.",
            "The solver is written in Prolog: the rules of the puzzle are described declaratively and the engine searches for a valid placement.",
        ],
        tags: ["Prolog"],
        icon: "/puzz.png",
        iconAlt: "Puzzle",
        layout: "tall",
    },
    {
        title: "MILP SPORTS LEAGUE OPTIMIZER",
        href: "https://github.com/CesarDanielDianov/MILP-Sports-League-Optimizer",
        desc: "A Python implementation of a MILP Sports League Optimizer developed for the Analysis and Synthesis of Algorithms course.",
        more: [
            "The league is modelled as a Mixed-Integer Linear Program: decisions become variables, the rules become linear constraints, and a solver looks for the best solution that respects all of them.",
        ],
        tags: ["Python"],
        icon: "/eff.png",
        iconAlt: "MILP",
        layout: "wide",
    },
    {
        title: "DAG PATH COUNTER TRUCK ROUTING",
        href: "https://github.com/CesarDanielDianov/DAG-Path-Counter-Truck-Routing",
        desc: "A C++ project implementing DAG path counting and truck routing algorithms for the Analysis and Synthesis of Algorithms course.",
        more: [
            "Two graph problems solved in C++: counting the paths in a directed acyclic graph, and finding routes for trucks. Both rely on algorithms taught in the course rather than brute force.",
        ],
        tags: ["C++"],
        icon: "/eff.png",
        iconAlt: "Algorithms",
        layout: "wide",
    },
    {
        title: "MNK GAME",
        href: "https://github.com/CesarDanielDianov/MNK-Game",
        desc: "A playable implementation of the MNK board game built with Python.",
        tags: ["Python"],
        icon: "/game.png",
        iconAlt: "Game",
        layout: "standard",
    },
    {
        title: "VACCINE MANAGEMENT SYSTEM",
        href: "https://github.com/CesarDanielDianov/VACCINE-MANAGER",
        desc: "A text-based vaccine management system implemented in C.",
        tags: ["C"],
        icon: "/vacc.png",
        iconAlt: "Vaccine",
        layout: "standard",
    },
    {
        title: "FOODINHO",
        href: "https://github.com/CesarDanielDianov/FOODINHO",
        desc: "A modern food-focused mobile app UI/UX prototype designed in Figma.",
        tags: ["Figma"],
        icon: "/44.png",
        iconAlt: "Foodinho",
        layout: "standard",
    },
    {
        title: "PORTFOLIO",
        href: "https://github.com/CesarDanielDianov/C-sar-s-Portofolio",
        desc: "A modern portfolio developed with Next.js and Tailwind CSS to showcase my work and technical background.",
        more: [
            "This website. It is built with Next.js, React and TypeScript, has a light and a dark theme, and brings together my experience, projects and CV in one place.",
        ],
        tags: ["Next.js", "React", "TypeScript", "CSS"],
        icon: "/porrt.png",
        iconAlt: "Portfolio",
        iconClassName: "rotate-6",
        layout: "wide",
    },
    {
        title: "SELECTION OPTIMIZATION UI",
        href: "https://github.com/CesarDanielDianov/Selection-Optimization-UI",
        desc: "A Human-Computer Interaction project focused on optimizing dense user interface target selection.",
        tags: ["JavaScript", "CSS"],
        icon: "/e.png",
        iconAlt: "UI",
        layout: "standard",
    },
];
