# Mohamed Ahshik — Portfolio

Personal portfolio website for Mohamed Ahshik, built with Next.js, shadcn/ui, and Magic UI.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building

```bash
pnpm build
pnpm start
```

## Editing Content

All site content lives in [`src/data/resume.tsx`](./src/data/resume.tsx) — name, summary, skills, work, education, projects, and contact links.

## Placeholders

- **Profile photo:** currently the initials fallback ("MA"). Set `DATA.avatarUrl` to a file in `public/` (e.g. `"/me.png"`) to use a real photo.
- **Work / education logos:** gray circles. Set `logoUrl` per entry.
- **Project images:** gray blocks. Set `image` (or `video`) per project.
- **Site URL:** `DATA.url` is a placeholder (`https://ahshik.vercel.app`); update once deployed.

The original template is kept for reference at `template/magicuidesign-portfolio-5ef12e4/`.
