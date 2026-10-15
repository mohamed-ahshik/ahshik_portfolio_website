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

- **Profile photo:** set from `public/profile_photo/` via `DATA.avatarUrl` (e.g. `"/profile_photo/1_profile_photo_ntu.jpeg"`). An empty value falls back to the initials.
- **Work / education logos:** set from `public/logos/` via `logoUrl` per entry. An empty `logoUrl` falls back to a gray circle.
- **Project images:** gray blocks. Set `image` (or `video`) per project.
- **Site URL:** `DATA.url` is a placeholder (`https://ahshik.vercel.app`); update once deployed.

The original template is kept for reference at `template/magicuidesign-portfolio-5ef12e4/`.
