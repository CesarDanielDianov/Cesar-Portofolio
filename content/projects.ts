import type { Lang, Text } from "@/lib/i18n";

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

type Source = Omit<Project, "title" | "desc" | "more" | "tags" | "iconAlt"> & {
    title: Text;
    desc: Text;
    more?: Record<Lang, string[]>;
    /** Plain strings are the same in every language (names of technologies). */
    tags: (string | Text)[];
    iconAlt: Text;
};

const items: Source[] = [
    {
        title: { en: "SLITHERLINK AI SOLVER", pt: "SOLVER DE SLITHERLINK COM IA" },
        href: "https://github.com/CesarDanielDianov/SlitherLink-AI-Solver",
        desc: {
            en: "AI-powered solver for SlitherLink puzzles using custom algorithms to calculate optimal solutions.",
            pt: "Solver de puzzles SlitherLink com IA, que usa algoritmos próprios para calcular as soluções ideais.",
        },
        more: {
            en: [
                "Slitherlink is a logic puzzle where you draw a single closed loop through a grid of dots, guided by the numbers written in the cells. Each number says how many of that cell's four edges belong to the loop.",
                "This solver reads a puzzle, applies the rules of the game through custom algorithms, and searches for a valid loop on its own instead of relying on trial and error.",
            ],
            pt: [
                "O Slitherlink é um puzzle lógico em que se desenha um único ciclo fechado numa grelha de pontos, guiado pelos números escritos nas células. Cada número indica quantas das quatro arestas dessa célula pertencem ao ciclo.",
                "Este solver lê um puzzle, aplica as regras do jogo através de algoritmos próprios e procura sozinho um ciclo válido, em vez de depender de tentativa e erro.",
            ],
        },
        tags: ["Python", { en: "AI Algorithms", pt: "Algoritmos de IA" }],
        icon: "/robot.png",
        iconAlt: { en: "Robot", pt: "Robô" },
        layout: "featured",
    },
    {
        title: { en: "NEURAL NETWORK", pt: "REDE NEURONAL" },
        href: "https://github.com/CesarDanielDianov/Neural-Network-in-RISC-V",
        desc: {
            en: "An Assembly RISC-V implementation of a feedforward artificial neural network.",
            pt: "Implementação em Assembly RISC-V de uma rede neuronal artificial feedforward.",
        },
        tags: ["Assembly", "RISC-V"],
        icon: "/9.png",
        iconAlt: { en: "Neural Network", pt: "Rede neuronal" },
        layout: "standard",
    },
    {
        title: { en: "ZOO DATABASE", pt: "BASE DE DADOS DE ZOO" },
        href: "https://github.com/CesarDanielDianov/ZOO-MANAGMENT-DATABASE",
        desc: {
            en: "A zoo management relational database with UML design, implemented using PostgreSQL and SQL.",
            pt: "Base de dados relacional para a gestão de um zoo, com modelação em UML, implementada em PostgreSQL e SQL.",
        },
        tags: ["PostgreSQL", "SQL"],
        icon: "/99.png",
        iconAlt: { en: "Zoo Database", pt: "Base de dados de zoo" },
        layout: "standard",
    },
    {
        title: { en: "LIBRARY MANAGEMENT SYSTEM", pt: "SISTEMA DE GESTÃO DE BIBLIOTECA" },
        href: "https://github.com/CesarDanielDianov/LibraryManager",
        desc: {
            en: "A text-based library management system written in Java.",
            pt: "Sistema de gestão de biblioteca em modo de texto, escrito em Java.",
        },
        tags: ["Java"],
        icon: "/l.png",
        iconAlt: { en: "Library", pt: "Biblioteca" },
        layout: "standard",
    },
    {
        title: { en: "ORBITO GAME", pt: "JOGO ORBITO" },
        href: "https://github.com/CesarDanielDianov/Orbito-game",
        desc: {
            en: "A playable implementation of the Orbito board game built with Python.",
            pt: "Implementação jogável do jogo de tabuleiro Orbito, feita em Python.",
        },
        tags: ["Python"],
        icon: "/game.png",
        iconAlt: { en: "Game", pt: "Jogo" },
        layout: "standard",
    },
    {
        title: { en: "MULTI CLIENT PACMAN GAME", pt: "PACMAN MULTI-CLIENTE" },
        href: "https://github.com/CesarDanielDianov/PACMAN-SERVER",
        desc: {
            en: "A C implementation of the Pacman Game, built on a server-client architecture.",
            pt: "Implementação em C do jogo Pacman, assente numa arquitetura cliente-servidor.",
        },
        more: {
            en: [
                "A multiplayer version of the classic Pacman, written in C for Linux. A central server keeps the state of the game and several clients connect to it to play at the same time.",
            ],
            pt: [
                "Uma versão multijogador do clássico Pacman, escrita em C para Linux. Um servidor central guarda o estado do jogo e vários clientes ligam-se a ele para jogar ao mesmo tempo.",
            ],
        },
        tags: ["Linux", "C"],
        icon: "/pacman.png",
        iconAlt: { en: "Pacman", pt: "Pacman" },
        layout: "tall",
    },
    {
        title: { en: "PROTEIN CHAIN ENERGY MAXIMIZER", pt: "MAXIMIZADOR DE ENERGIA DE CADEIAS PROTEICAS" },
        href: "https://github.com/CesarDanielDianov/Protein-Chain-Energy-Maximizer",
        desc: {
            en: "A C++ algorithm developed for the Analysis and Synthesis of Algorithms course to maximize protein chain energy.",
            pt: "Algoritmo em C++ desenvolvido para a unidade curricular de Análise e Síntese de Algoritmos, que maximiza a energia de uma cadeia proteica.",
        },
        tags: ["C++"],
        icon: "/eff.png",
        iconAlt: { en: "Protein", pt: "Proteína" },
        layout: "standard",
    },
    {
        title: { en: "8-BIT SPIKE PROCESSOR", pt: "PROCESSADOR SPIKE DE 8 BITS" },
        href: "https://github.com/CesarDanielDianov/8-bit-Spike-Processor",
        desc: {
            en: "A logic diagram implementation of an 8-bit processor featuring a complete data path architecture.",
            pt: "Implementação em diagrama lógico de um processador de 8 bits, com uma arquitetura de datapath completa.",
        },
        tags: ["Logisim"],
        icon: "/7.png",
        iconAlt: { en: "Processor", pt: "Processador" },
        layout: "standard",
    },
    {
        title: { en: "STAR BATTLE GAME SOLVER", pt: "SOLVER DE STAR BATTLE" },
        href: "https://github.com/CesarDanielDianov/Star-Battle-Game-Solver",
        desc: {
            en: "A Prolog implementation of a solver that algorithmically solves Star Battle puzzles.",
            pt: "Implementação em Prolog de um solver que resolve algoritmicamente puzzles Star Battle.",
        },
        more: {
            en: [
                "Star Battle is a grid puzzle where stars are placed so that every row, column and region holds the same number of stars, and no two stars touch.",
                "The solver is written in Prolog: the rules of the puzzle are described declaratively and the engine searches for a valid placement.",
            ],
            pt: [
                "O Star Battle é um puzzle de grelha em que se colocam estrelas de forma a que cada linha, coluna e região tenha o mesmo número de estrelas, sem que duas estrelas se toquem.",
                "O solver está escrito em Prolog: as regras do puzzle são descritas de forma declarativa e o motor procura uma colocação válida.",
            ],
        },
        tags: ["Prolog"],
        icon: "/puzz.png",
        iconAlt: { en: "Puzzle", pt: "Puzzle" },
        layout: "tall",
    },
    {
        title: { en: "MILP SPORTS LEAGUE OPTIMIZER", pt: "OTIMIZADOR MILP DE LIGAS DESPORTIVAS" },
        href: "https://github.com/CesarDanielDianov/MILP-Sports-League-Optimizer",
        desc: {
            en: "A Python implementation of a MILP Sports League Optimizer developed for the Analysis and Synthesis of Algorithms course.",
            pt: "Implementação em Python de um otimizador MILP de ligas desportivas, desenvolvido para a unidade curricular de Análise e Síntese de Algoritmos.",
        },
        more: {
            en: [
                "The league is modelled as a Mixed-Integer Linear Program: decisions become variables, the rules become linear constraints, and a solver looks for the best solution that respects all of them.",
            ],
            pt: [
                "A liga é modelada como um Programa Linear Inteiro Misto: as decisões tornam-se variáveis, as regras tornam-se restrições lineares e um solver procura a melhor solução que respeite todas elas.",
            ],
        },
        tags: ["Python"],
        icon: "/eff.png",
        iconAlt: { en: "MILP", pt: "MILP" },
        layout: "wide",
    },
    {
        title: { en: "DAG PATH COUNTER TRUCK ROUTING", pt: "CONTAGEM DE CAMINHOS EM DAG E ROTAS DE CAMIÕES" },
        href: "https://github.com/CesarDanielDianov/DAG-Path-Counter-Truck-Routing",
        desc: {
            en: "A C++ project implementing DAG path counting and truck routing algorithms for the Analysis and Synthesis of Algorithms course.",
            pt: "Projeto em C++ que implementa algoritmos de contagem de caminhos em DAG e de rotas de camiões, para a unidade curricular de Análise e Síntese de Algoritmos.",
        },
        more: {
            en: [
                "Two graph problems solved in C++: counting the paths in a directed acyclic graph, and finding routes for trucks. Both rely on algorithms taught in the course rather than brute force.",
            ],
            pt: [
                "Dois problemas de grafos resolvidos em C++: contar os caminhos num grafo acíclico dirigido e encontrar rotas para camiões. Ambos assentam em algoritmos lecionados na unidade curricular, e não em força bruta.",
            ],
        },
        tags: ["C++"],
        icon: "/eff.png",
        iconAlt: { en: "Algorithms", pt: "Algoritmos" },
        layout: "wide",
    },
    {
        title: { en: "MNK GAME", pt: "JOGO MNK" },
        href: "https://github.com/CesarDanielDianov/MNK-Game",
        desc: {
            en: "A playable implementation of the MNK board game built with Python.",
            pt: "Implementação jogável do jogo de tabuleiro MNK, feita em Python.",
        },
        tags: ["Python"],
        icon: "/game.png",
        iconAlt: { en: "Game", pt: "Jogo" },
        layout: "standard",
    },
    {
        title: { en: "VACCINE MANAGEMENT SYSTEM", pt: "SISTEMA DE GESTÃO DE VACINAS" },
        href: "https://github.com/CesarDanielDianov/VACCINE-MANAGER",
        desc: {
            en: "A text-based vaccine management system implemented in C.",
            pt: "Sistema de gestão de vacinas em modo de texto, implementado em C.",
        },
        tags: ["C"],
        icon: "/vacc.png",
        iconAlt: { en: "Vaccine", pt: "Vacina" },
        layout: "standard",
    },
    {
        title: { en: "FOODINHO", pt: "FOODINHO" },
        href: "https://github.com/CesarDanielDianov/FOODINHO",
        desc: {
            en: "A modern food-focused mobile app UI/UX prototype designed in Figma.",
            pt: "Protótipo de UI/UX de uma app móvel moderna dedicada a comida, desenhado no Figma.",
        },
        tags: ["Figma"],
        icon: "/44.png",
        iconAlt: { en: "Foodinho", pt: "Foodinho" },
        layout: "standard",
    },
    {
        title: { en: "PORTFOLIO", pt: "PORTFÓLIO" },
        href: "https://github.com/CesarDanielDianov/C-sar-s-Portofolio",
        desc: {
            en: "A modern portfolio developed with Next.js and Tailwind CSS to showcase my work and technical background.",
            pt: "Portfólio moderno desenvolvido com Next.js e Tailwind CSS para mostrar o meu trabalho e percurso técnico.",
        },
        more: {
            en: [
                "This website. It is built with Next.js, React and TypeScript, has a light and a dark theme, and brings together my experience, projects and CV in one place.",
            ],
            pt: [
                "Este site. Foi construído com Next.js, React e TypeScript, tem um tema claro e um escuro, e reúne num só lugar a minha experiência, os meus projetos e o meu CV.",
            ],
        },
        tags: ["Next.js", "React", "TypeScript", "CSS"],
        icon: "/porrt.png",
        iconAlt: { en: "Portfolio", pt: "Portfólio" },
        iconClassName: "rotate-6",
        layout: "wide",
    },
    {
        title: { en: "SELECTION OPTIMIZATION UI", pt: "INTERFACE DE SELEÇÃO OTIMIZADA" },
        href: "https://github.com/CesarDanielDianov/Selection-Optimization-UI",
        desc: {
            en: "A Human-Computer Interaction project focused on optimizing dense user interface target selection.",
            pt: "Projeto de Interação Pessoa-Máquina focado em otimizar a seleção de alvos em interfaces densas.",
        },
        tags: ["JavaScript", "CSS"],
        icon: "/e.png",
        iconAlt: { en: "UI", pt: "Interface" },
        layout: "standard",
    },
];

/** All projects in one language. */
export function getProjects(lang: Lang): Project[] {
    return items.map((p) => ({
        ...p,
        title: p.title[lang],
        desc: p.desc[lang],
        more: p.more?.[lang],
        tags: p.tags.map((t) => (typeof t === "string" ? t : t[lang])),
        iconAlt: p.iconAlt[lang],
    }));
}

/** How many projects there are (the same in every language). */
export const projectCount = items.length;
