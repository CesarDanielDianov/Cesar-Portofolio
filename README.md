# César Dianov — Portfolio

Personal portfolio: experience timeline, project showcase, CV, and an interactive terminal on the homepage.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 · next-themes

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 (development, slower; not representative of real performance)
npm run build    # production build, all pages are statically prerendered
npm start        # serve the production build
npm run lint
```

## Project structure

```
app/                    Routes (App Router)
  layout.tsx            Root layout: metadata, theme, navbar/footer, skip link
  page.tsx              /            Home
  experience/page.tsx   /experience  Timeline
  projects/page.tsx     /projects    Project grid
  cv/page.tsx           /cv          Embedded PDF
  not-found.tsx         404
  globals.css           Theme tokens, backgrounds, effects (fx-*)
components/
  layout/               Navbar, Footer, ThemeToggle
  home/                 Hero, interactive Terminal
  experience/           ExperienceTimeline
  projects/             ProjectGrid
  cv/                   CvViewer
  effects/              HoverFx (cursor spotlight on cards)
  ui/                   Shared primitives (PageHeader, shadcn Button)
content/                All site copy and data: edit these to update the site
  site.ts               Name, links, nav, tech stack
  experience.ts         Timeline entries
  projects.ts           Projects and their grid layout
lib/                    Utilities (cn, sound)
public/                 Images and the CV PDF
```

## Updating content

Content lives in `content/`. UI components never hard-code copy.

- **New project:** add an entry to `content/projects.ts`; `layout` controls its size in the grid (`featured`, `wide`, `tall`, `standard`).
- **New role:** add an entry at the top of `content/experience.ts` (newest first).
- **New CV:** replace `public/cesar-dianov-cv.pdf`.

## Notes

- Old URLs `/contacts` and `/work` permanently redirect to `/experience` and `/projects` (`next.config.ts`).
- Animations respect `prefers-reduced-motion`.
- Backgrounds are pure CSS (no image assets).
