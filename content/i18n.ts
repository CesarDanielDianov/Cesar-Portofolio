import type { Lang } from "@/lib/i18n";

/**
 * UI strings for every language. English defines the shape; Portuguese
 * (pt-PT) must provide every key, so a missing translation is a type error.
 * Page content (experience, projects) is translated in its own file.
 */
const en = {
    langToggle: "Mudar para português",
    skipToContent: "Skip to content",
    themeToggle: "Toggle dark mode",

    site: {
        title: "César Dianov | Portfolio",
        description:
            "Computer Science and Engineering student at Instituto Superior Técnico. Software engineering, AI and automation.",
        tagline: "Computer Engineering Student @ IST",
        ogLocale: "en_US",
    },

    nav: { home: "Home", experience: "Experience", projects: "Projects", cv: "CV" },

    footer: { rights: "All rights reserved." },

    flags: {
        group: "Portugal and Moldova",
        pt: "Portugal",
        md: "Moldova",
        play: (country: string, song: string) => `${country}: play ${song}`,
    },

    boot: {
        label: "Loading site",
        heading: "getting things ready…",
        skip: "press any key to skip",
        lines: ["Booting cesar-dianov.dev", "Loading experience", "Compiling projects", "Mounting CV", "Starting terminal"],
    },

    home: {
        intro: "Computer Science and Engineering student at IST, IT Executive at Five Thousand Miles, member of the NEIIST Dev and HR teams. Passionate about software engineering, AI and technology.",
        viewProjects: "View projects",
        readCv: "Read my CV",
        nextSteps: "Next Steps....",
        nextStepsList: ["C1 English certificate", "250 LeetCode problems", "Teaching Assistant", "Erasmus+", "Master's in AI"],
        wholeStory: "see the whole story",
        featured: "★ Featured project",
        viewOnGithub: "View on GitHub ↗",
        allProjects: (n: number) => `all ${n} projects →`,
        aboutMe: "about me",
        basedIn: "based in",
        studying: "studying",
        focus: "focus",
        focusValue: "Software Architecture & AI",
        tidy: "↺ tidy up the desk",
        psst: "psst… the papers move. drag them around ↖",
    },

    terminal: {
        inputLabel: "Terminal input",
        hintBefore: "// type ",
        hintAfter: " and press Enter (Tab completes)",
        roles: ["LEIC Senior @ IST", "IT Exec @ Five Thousand Miles", "Dev & HR @ NEIIST"],
        help: {
            help: "list commands",
            whoami: "who is this?",
            neofetch: "system info, developer edition",
            ls: "list files",
            "ls projects": "list every project",
            "ls experience": "list every role",
            "cat developer.ts": "print the developer object",
            experience: "open the experience page",
            projects: "open the projects page",
            cv: "open the CV page",
            github: "open my GitHub",
            linkedin: "open my LinkedIn",
            theme: "switch light / dark",
            matrix: "follow the white rabbit",
            snake: "play snake",
            history: "commands you ran",
            clear: "clear the terminal",
        },
        neofetch: {
            location: "Location",
            study: "Study",
            roles: "Roles",
            projects: "Projects",
            shell: "Shell",
            theme: "Theme",
            uptime: "Uptime",
        },
        themeName: { dark: "dark", light: "light", system: "system" } as Record<string, string>,
        themeSet: (name: string) => `Theme set to ${name}.`,
        matrixOff: "Wake up, Neo… (animation off: reduced motion is on)",
        matrixOn: "Wake up, Neo… (press any key to exit)",
        snakeStart: "Starting snake… (q to quit)",
        noHistory: "No history yet.",
        opening: (what: string) => `Opening ${what}…`,
        sudo: "Permission denied. Nice try.",
        notFound: (cmd: string) => `command not found: ${cmd}. Type `,
        notFoundAfter: ".",
        snakeOver: (score: number, best: number) => `snake: game over · score ${score} · best ${best}`,
    },

    snake: {
        label: "Snake game",
        score: "score",
        best: "best",
        quit: "q to quit",
        over: "game over",
        again: "play again (space)",
        paused: "paused · space to resume",
        controls: "arrows / WASD · space pauses · swipe on phones",
    },

    experience: {
        metaDescription: "Work, student organizations and education of César Dianov.",
        title: "Experience",
        subtitle: "Work, student organizations & education",
        expandAll: "[ + expand all ]",
        collapseAll: "[ − collapse all ]",
        skills: "Skills",
    },

    projects: {
        metaDescription: "Software projects by César Dianov: AI solvers, systems programming, databases and more.",
        title: "Projects",
        subtitle: "AI solvers, systems programming, databases & more",
        techStack: "Tech stack",
        viewOnGithub: "View on GitHub",
        more: "More projects are on the way. Stay tuned!",
    },

    cv: {
        metaDescription: "Curriculum vitae of César Dianov.",
        title: "CV",
        subtitle: "Download it or read it right here",
        download: "Download PDF",
        newTab: "Open in new tab",
        frameTitle: (name: string) => `${name}: CV (PDF)`,
        notShowing: "PDF not showing?",
        downloadInstead: "Download it instead.",
    },

    notFound: {
        title: "Page not found",
        error: "bash: cd: no such file or directory",
        back: "Back home",
    },
};

export type Dict = typeof en;

const pt: Dict = {
    langToggle: "Switch to English",
    skipToContent: "Saltar para o conteúdo",
    themeToggle: "Alternar modo escuro",

    site: {
        title: "César Dianov | Portfólio",
        description:
            "Estudante de Engenharia Informática e de Computadores no Instituto Superior Técnico. Engenharia de software, IA e automação.",
        tagline: "Estudante de Eng. Informática @ IST",
        ogLocale: "pt_PT",
    },

    nav: { home: "Início", experience: "Experiência", projects: "Projetos", cv: "CV" },

    footer: { rights: "Todos os direitos reservados." },

    flags: {
        group: "Portugal e Moldávia",
        pt: "Portugal",
        md: "Moldávia",
        play: (country, song) => `${country}: tocar ${song}`,
    },

    boot: {
        label: "A carregar o site",
        heading: "a preparar tudo…",
        skip: "carrega numa tecla para saltar",
        lines: ["A iniciar cesar-dianov.dev", "A carregar experiência", "A compilar projetos", "A montar o CV", "A iniciar o terminal"],
    },

    home: {
        intro: "Estudante de Engenharia Informática no IST, IT Executive na Five Thousand Miles, membro das equipas de Dev e RH do NEIIST. Apaixonado por engenharia de software, IA e tecnologia.",
        viewProjects: "Ver projetos",
        readCv: "Ler o meu CV",
        nextSteps: "Próximos Passos....",
        nextStepsList: ["Certificado C1 de inglês", "250 problemas no LeetCode", "Professor Assistente", "Erasmus+", "Mestrado em IA"],
        wholeStory: "ver a história toda",
        featured: "★ Projeto em destaque",
        viewOnGithub: "Ver no GitHub ↗",
        allProjects: (n) => `todos os ${n} projetos →`,
        aboutMe: "sobre mim",
        basedIn: "vivo em",
        studying: "estudo",
        focus: "foco",
        focusValue: "Arquitetura de Software e IA",
        tidy: "↺ arrumar a secretária",
        psst: "psst… os papéis mexem-se. arrasta-os ↖",
    },

    terminal: {
        inputLabel: "Entrada do terminal",
        hintBefore: "// escreve ",
        hintAfter: " e carrega em Enter (Tab completa)",
        roles: ["Finalista LEIC @ IST", "IT Exec @ Five Thousand Miles", "Dev & RH @ NEIIST"],
        help: {
            help: "listar comandos",
            whoami: "quem é este?",
            neofetch: "info do sistema, edição developer",
            ls: "listar ficheiros",
            "ls projects": "listar todos os projetos",
            "ls experience": "listar todas as funções",
            "cat developer.ts": "mostrar o objeto developer",
            experience: "abrir a página de experiência",
            projects: "abrir a página de projetos",
            cv: "abrir a página do CV",
            github: "abrir o meu GitHub",
            linkedin: "abrir o meu LinkedIn",
            theme: "alternar claro / escuro",
            matrix: "segue o coelho branco",
            snake: "jogar snake",
            history: "comandos que correste",
            clear: "limpar o terminal",
        },
        neofetch: {
            location: "Local",
            study: "Estudos",
            roles: "Funções",
            projects: "Projetos",
            shell: "Shell",
            theme: "Tema",
            uptime: "Ativo há",
        },
        themeName: { dark: "escuro", light: "claro", system: "sistema" },
        themeSet: (name) => `Tema alterado para ${name}.`,
        matrixOff: "Acorda, Neo… (animação desligada: movimento reduzido ativo)",
        matrixOn: "Acorda, Neo… (carrega numa tecla para sair)",
        snakeStart: "A iniciar o snake… (q para sair)",
        noHistory: "Ainda não há histórico.",
        opening: (what) => `A abrir ${what}…`,
        sudo: "Permissão negada. Boa tentativa.",
        notFound: (cmd) => `comando não encontrado: ${cmd}. Escreve `,
        notFoundAfter: ".",
        snakeOver: (score, best) => `snake: fim do jogo · pontos ${score} · recorde ${best}`,
    },

    snake: {
        label: "Jogo snake",
        score: "pontos",
        best: "recorde",
        quit: "q para sair",
        over: "fim do jogo",
        again: "jogar de novo (espaço)",
        paused: "em pausa · espaço para continuar",
        controls: "setas / WASD · espaço pausa · desliza no telemóvel",
    },

    experience: {
        metaDescription: "Trabalho, organizações estudantis e formação de César Dianov.",
        title: "Experiência",
        subtitle: "Trabalho, organizações estudantis e formação",
        expandAll: "[ + expandir tudo ]",
        collapseAll: "[ − recolher tudo ]",
        skills: "Competências",
    },

    projects: {
        metaDescription: "Projetos de software de César Dianov: solvers com IA, programação de sistemas, bases de dados e mais.",
        title: "Projetos",
        subtitle: "Solvers com IA, programação de sistemas, bases de dados e mais",
        techStack: "Tecnologias",
        viewOnGithub: "Ver no GitHub",
        more: "Há mais projetos a caminho. Fica atento!",
    },

    cv: {
        metaDescription: "Curriculum vitae de César Dianov.",
        title: "CV",
        subtitle: "Descarrega-o ou lê-o aqui mesmo",
        download: "Descarregar PDF",
        newTab: "Abrir num novo separador",
        frameTitle: (name) => `${name}: CV (PDF)`,
        notShowing: "O PDF não aparece?",
        downloadInstead: "Descarrega-o em vez disso.",
    },

    notFound: {
        title: "Página não encontrada",
        error: "bash: cd: ficheiro ou diretório inexistente",
        back: "Voltar ao início",
    },
};

export const dict: Record<Lang, Dict> = { en, pt };
