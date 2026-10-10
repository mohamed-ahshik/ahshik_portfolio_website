# Portfolio Website — Design

Date: 2026-10-11
Status: Approved (pending written-spec review)

## Overview

Build a personal portfolio website for Mohamed Ahshik (AI Engineer @ Deriv) by
customizing the MagicUI portfolio template already present in this repo at
`template/magicuidesign-portfolio-5ef12e4/`. The final app lives at the repo
root; the `template/` directory is kept untouched as a reference, and
`resume/` holds the source resume.

Profile picture and all company/school logos/project images are intentionally
placeholders for now.

## Goals

- Root-level Next.js app built from the template, ready for local dev and build.
- All resume content wired into the template's single data file.
- No dead sections: blog and hackathons removed because the resume has no data
  for them.
- Placeholders (not fake demo content) wherever images/logos would appear.
- Template look, feel, animations, dark mode, and layout remain intact.

## Non-Goals

- Real profile photo, company/school logos, or project screenshots.
- Per-project repository/site URLs (resume has none).
- Blog functionality, deployment setup, or domain configuration.

## File Layout

```
/                       ← Next.js app (copied from template)
  src/
  public/
  package.json
  pnpm-lock.yaml
  next.config.mjs
  ... (all other template config files)
  docs/superpowers/specs/  ← this design doc
  resume/               ← untouched
  template/magicuidesign-portfolio-5ef12e4/  ← untouched reference copy
```

The template is copied (not moved) into the root. Every path below refers to
root unless prefixed with `template/`.

## Removals

1. **Blog**
   - Delete `src/app/blog/**` (page, [slug] page, both opengraph images).
   - Delete `content/` (sample MDX posts).
   - Delete `content-collections.ts` and content-collections wiring in
     `next.config.mjs` (keep the existing security headers).
   - Delete `src/mdx-components.tsx` and `src/components/mdx/**` (blog-only).
   - Remove `NotebookIcon`/Blog entry from `DATA.navbar`.
   - After verifying no remaining imports, prune now-unused dependencies:
     `@content-collections/*`, `content-collections`, `rehype-pretty-code`,
     `remark-gfm`, `shiki`, and `zod` if unused elsewhere.
2. **Hackathons**
   - Delete `src/components/section/hackathons-section.tsx`.
   - Remove `DATA.hackathons` and the `<section id="hackathons">` block from
     `src/app/page.tsx`.

Resulting page order: hero → about → work → education → skills → projects →
contact.

## Data (`src/data/resume.tsx`)

Single source of truth for all site content, populated from
`resume/Ahshik_resume_28_06_2026.docx`:

- `name`: "Mohamed Ahshik"; `initials`: "MA".
- `description`: short AI-engineer positioning line derived from resume.
- `summary`: resume SUMMARY (mechatronics + AI background, cross-functional
  leadership), as two markdown paragraphs.
- `location`: Singapore; `url`: placeholder site URL (e.g.
  `https://ahshik.vercel.app`) used by metadataBase.
- `avatarUrl`: omitted entirely so the Avatar renders the built-in initials
  fallback "MA" (approved placeholder).
- `skills`: Python, TensorFlow, PyTorch, Scikit-learn, OpenCV, Hugging Face,
  FastAPI, Docker, Git, MLflow, LLMs, RAG, LangChain/LangGraph, LlamaIndex,
  Neo4j, SQL, Supabase, Prompt Engineering, Data Engineering. Reuse template
  SVG icons for Python and Docker only; every other skill is a text-only chip
  (chips render fine without icons).
- `work` (5 entries, descriptions formatted as markdown bullet lists in the
  accordion body, `logoUrl` omitted → WorkSection's gray circle placeholder):
  1. Deriv — AI Engineer, Jan 2026 – Present
  2. AI Singapore – NUS — Associate AI Engineer, Sep 2024 – Jun 2025
  3. Rehabilitation Research Institute of Singapore – NTU — Project Officer /
     Research Associate, Nov 2019 – Sep 2024
  4. Singapore Police Force — Police Patrol Officer Sergeant (2),
     Oct 2015 – Aug 2017
  5. Thales Solutions Asia Pte Ltd — Internship, Oct 2014 – Dec 2014
- `education` (4 entries, `logoUrl` omitted → gray circle placeholder):
  1. Nanyang Polytechnic — Specialist Diploma in Artificial Intelligence,
     2022 – 2023
  2. Nanyang Technological University — MSc Mechanical Engineering (Additive
     Manufacturing), 2020 – 2022
  3. University of Glasgow (SIT) — BEng Mechatronics (Hons), 2017 – 2019
  4. Nanyang Polytechnic — Diploma, Electronics, Computer & Communication
     Engineering, 2012 – 2015
- `projects` (6 cards; `image` omitted → ProjectCard's gray placeholder block):
  1. Traditional RAG System (personal) — Streamlit, vector DB, LLM.
  2. Football Player Detection (personal) — YOLOv8, K-Means team clustering.
  3. Deep Learning Yoga Pose Classification (academic) — OpenPose, TensorFlow.
  4. Object Detection (academic) — YOLO, ResNet, NMS.
  5. Optical Blood Pressure Monitoring (academic) — Arduino, PPG.
  6. Smart Home Appliances (academic) — IR, Spark core.
  Each card's tags come from the resume's tech list. Since no per-project URLs
  exist, every card's link temporarily points to
  `https://github.com/mohamed-ahshik` (easily swapped per card later).
- `contact`: email `mohamedahshik@outlook.com`, tel `+65 9085 8555`. Socials
  kept: GitHub (`https://github.com/mohamed-ahshik`, navbar: true) and email
  icon linking to `mailto:mohamedahshik@outlook.com` (navbar: true). Remove
  LinkedIn/X/YouTube.
- `navbar`: Home + GitHub + Email + theme toggle.

## Component Edits

- `src/components/section/contact-section.tsx`: replace the Twitter-specific
  sentence with copy linking to `mailto:` email (no X account exists).
- `src/app/layout.tsx`: metadata derives from `DATA`, so only the placeholder
  `DATA.url` matters; no structural change expected.
- `src/app/opengraph-image.tsx`: update any hardcoded template author
  name/branding to Mohamed Ahshik.
- `README.md`: replace with a short project README (run/build commands, where
  content lives, placeholder notes).

## Placeholders Summary

| Element        | Placeholder                                |
| -------------- | ------------------------------------------ |
| Profile photo  | Avatar initials fallback "MA"              |
| Work logos     | Gray circle (built into WorkSection)       |
| Education logos| Gray circle (built into page.tsx)          |
| Project images | Gray block (built into ProjectCard)        |
| Site URL       | Placeholder Vercel-style URL in `DATA.url` |

## Testing / Verification

1. `pnpm install` at root succeeds.
2. `pnpm lint` passes.
3. `pnpm build` completes with no blog/content-collections references.
4. `pnpm dev` and manual browser check: hero/about/work/education/skills/
   projects/contact render; accordion expands; navbar dock works; dark/light
   toggle works; desktop and mobile widths; no console errors.

## Risks

- Removing content-collections touches `next.config.mjs`; build must be
  re-verified after removal.
- `lucide-react`/other deps referenced only by deleted files must not remain
  imported; lint/build will catch these.
