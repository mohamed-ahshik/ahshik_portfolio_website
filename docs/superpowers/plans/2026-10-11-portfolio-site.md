# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Mohamed Ahshik's portfolio website at the repo root by customizing the MagicUI template already in `template/magicuidesign-portfolio-5ef12e4/`, with resume content and image placeholders.

**Architecture:** Copy the stock template to the repo root, delete the blog and hackathons sections (no resume data for them), rewrite the single data file `src/data/resume.tsx` with resume content, and leave all other template behavior untouched. Images/logos use the template's built-in gray/initials placeholders.

**Tech Stack:** Next.js 16.1.1, React 19, TypeScript 5.9, Tailwind CSS 4, shadcn/ui, Magic UI (motion), pnpm.

**Spec:** `docs/superpowers/specs/2026-10-11-portfolio-site-design.md`

## Global Constraints

- Work only from the repo root `/Users/user/Documents/ahshik_portfolio_website`.
- `template/` and `resume/` directories must never be modified or staged in git commits.
- No real photos/logos: profile photo = initials fallback (`avatarUrl: ""`), work/education logos = `logoUrl: ""`, project images = `image: ""`, `video: ""`.
- Exact contact data: email `mohamedahshik@outlook.com`, tel `+65 9085 8555`, GitHub `https://github.com/mohamed-ahshik`.
- Placeholder site URL: `https://ahshik.vercel.app` (in `DATA.url`).
- Do not modify theme, animations, layout, or any component not named in a task.
- Package manager is pnpm (node >= 18; local node is v26, pnpm 12).
- Every commit command must exclude `template/` and `resume/`.
- Test cycle for this project (no test framework): `pnpm lint` and `pnpm build` from root, plus browser checks in the final task.

---

### Task 1: Scaffold — copy template to repo root

**Files:**
- Create: everything at root copied from `template/magicuidesign-portfolio-5ef12e4/` (`src/`, `public/`, `content/`, `package.json`, `pnpm-lock.yaml`, `next.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `.eslintrc.json`, `.gitignore`, `components.json`, `content-collections.ts`, `README.md`, `LICENSE`)
- Modify: root `README.md` (overwritten by template copy — intentionally)

**Interfaces:**
- Consumes: nothing.
- Produces: a working stock Next.js app at root; the file paths all later tasks modify.

- [ ] **Step 1: Copy template to root (template stays as reference)**

```bash
rsync -a --exclude='.DS_Store' template/magicuidesign-portfolio-5ef12e4/ ./
ls package.json src/app/page.tsx pnpm-lock.yaml .gitignore
```

Expected: all four paths listed.

- [ ] **Step 2: Install dependencies**

```bash
pnpm install
```

Expected: lockfile resolves; `node_modules` created. (The lockfile may be updated for the local pnpm version — that is fine.)

- [ ] **Step 3: Verify stock build passes**

```bash
pnpm build
```

Expected: build completes (blog routes included at this point). Note: first build downloads Next.js deps; allow a couple of minutes.

- [ ] **Step 4: Verify stock lint baseline**

```bash
pnpm lint
```

Expected: no errors. If the stock template has pre-existing lint warnings, record them and continue — build is the primary gate.

- [ ] **Step 5: Commit the scaffold (exclude template/ and resume/)**

```bash
git add -A -- . ':(exclude)template' ':(exclude)resume'
git status --short | head -40
git commit -m "feat: scaffold portfolio app from magicui template"
```

Expected: commit succeeds; `git status` shows only untracked `template/` and `resume/` remain (`.DS_Store` is now ignored by the copied `.gitignore`).

---

### Task 2: Remove blog and hackathons sections

**Files:**
- Delete: `src/app/blog/` (page.tsx, [slug]/page.tsx, [slug]/opengraph-image.tsx, opengraph-image.tsx), `content/` (7 sample `.mdx` files), `content-collections.ts`, `src/mdx-components.tsx`, `src/components/mdx/code-block.tsx`, `src/components/mdx/media-container.tsx`, `src/lib/remark-code-meta.ts`, `src/lib/pagination.ts`, `src/components/section/hackathons-section.tsx`
- Modify: `next.config.mjs` (drop content-collections wrapper)
- Modify: `src/app/page.tsx` (drop hackathons section)

**Interfaces:**
- Consumes: root app from Task 1.
- Produces: blog-free, hackathons-free app; `src/data/resume.tsx` still contains `DATA.hackathons` and a Blog navbar entry until Task 3 (this is expected and compiles fine).

- [ ] **Step 1: Delete blog/hackathons files**

```bash
rm -rf src/app/blog content content-collections.ts src/mdx-components.tsx src/components/mdx src/lib/remark-code-meta.ts src/lib/pagination.ts src/components/section/hackathons-section.tsx
```

- [ ] **Step 2: Replace `next.config.mjs` to remove content collections**

Current content wraps `nextConfig` with `withContentCollections`. New full content:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 3: Edit `src/app/page.tsx` — remove hackathons**

Remove this import line:

```tsx
import HackathonsSection from "@/components/section/hackathons-section";
```

Remove this block (between the projects and contact sections):

```tsx
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
```

- [ ] **Step 4: Clean stale content-collections artifacts**

```bash
rm -rf .content-collections
grep -rn "content-collections" src next.config.mjs || echo "OK: no references"
grep -rn "hackathon" src || echo "no hackathon references"
```

Expected: `OK: no references`; second grep may only match `src/data/resume.tsx` (its removal happens in Task 3).

- [ ] **Step 5: Verify build + lint**

```bash
pnpm build && pnpm lint
```

Expected: build succeeds; no lint errors from dangling imports.

- [ ] **Step 6: Commit**

```bash
git add -A -- . ':(exclude)template' ':(exclude)resume'
git commit -m "chore: remove blog and hackathons sections"
```

---

### Task 3: Populate site content from resume

**Files:**
- Modify: `src/data/resume.tsx` (full rewrite)
- Modify: `src/components/section/work-section.tsx` (render descriptions as markdown)
- Modify: `src/components/section/projects-section.tsx` (fix subtitle copy)
- Delete: demo images in `public/` (`atomic.png`, `buildspace.jpg`, `ib.png`, `laurier.png`, `lime.svg`, `me.png`, `mitremedia.png`, `nvidia.png`, `shopify.svg`, `splunk.svg`, `waterloo.png`) — keep `public/fonts/`

**Interfaces:**
- Consumes: template components read `DATA` fields by these exact names: `name`, `initials`, `url`, `location`, `locationLink`, `description`, `summary`, `avatarUrl`, `skills[].name`, `skills[].icon`, `navbar[].href/icon/label`, `contact.email/tel/social.<Key>.name/url/icon/navbar`, `work[].company/title/start/end/description/logoUrl/href/location`, `education[].school/degree/href/logoUrl/start/end`, `projects[].title/href/dates/description/technologies/links/image/video`.
- Produces: `DATA` as the exact object below. Every key must exist on every array element (the file ends with `as const`, and components access keys like `work.logoUrl`, `project.image`, `project.video`, `project.links`, `skill.icon` on every element).

- [ ] **Step 1: Replace `src/data/resume.tsx` with the full content below**

````tsx
import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Mohamed Ahshik",
  initials: "MA",
  url: "https://ahshik.vercel.app",
  location: "Singapore",
  locationLink: "https://www.google.com/maps/place/singapore",
  description:
    "AI Engineer specialising in LLM-powered automation, retrieval-augmented generation, and computer vision.",
  summary: `Dedicated and detail-oriented Engineer with a robust background in mechatronics and artificial intelligence. Extensive experience involving complex projects in academic and professional settings, with a proven track record of delivering innovations in data capture, process automation, and system development.

Skilled in leading cross-functional teams, training diverse groups, and executing high-impact research initiatives. Recognized for exceptional problem-solving abilities and a commitment to enhancing operational efficiencies and technological advancements.`,
  avatarUrl: "",
  skills: [
    { name: "Python", icon: Python },
    { name: "TensorFlow", icon: undefined },
    { name: "PyTorch", icon: undefined },
    { name: "Scikit-learn", icon: undefined },
    { name: "OpenCV", icon: undefined },
    { name: "Hugging Face", icon: undefined },
    { name: "FastAPI", icon: undefined },
    { name: "Docker", icon: Docker },
    { name: "Git", icon: undefined },
    { name: "MLflow", icon: undefined },
    { name: "LLMs", icon: undefined },
    { name: "RAG", icon: undefined },
    { name: "LangChain / LangGraph", icon: undefined },
    { name: "LlamaIndex", icon: undefined },
    { name: "Prompt Engineering", icon: undefined },
    { name: "Data Engineering", icon: undefined },
    { name: "Neo4j", icon: undefined },
    { name: "KuzuDB", icon: undefined },
    { name: "Supabase", icon: undefined },
    { name: "SQL", icon: undefined },
    { name: "Cypher", icon: undefined },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "mohamedahshik@outlook.com",
    tel: "+65 9085 8555",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mohamed-ahshik",
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:mohamedahshik@outlook.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Deriv",
      href: "https://deriv.com",
      location: "Singapore",
      title: "AI Engineer",
      logoUrl: "",
      start: "January 2026",
      end: undefined,
      description: `- Contributed to AI integration projects within the marketing function, building automated pipelines to detect, generate, and publish market-moving events using LLMs.
- Developed LLM-based insights (Claude) to analyze quarterly stock performance, incorporating prompt engineering and structured output generation.
- Integrated generative AI tools (Nano Banana) via APIs to produce on-brand visual assets for social media campaigns.
- Developed an AI-powered video generation pipeline combining text-to-speech, background audio, and automated content generation for scalable media production.
- Engineered an AI-driven video processing tool to automate podcast editing, utilizing machine learning to isolate key Q&A segments, format multi-cam side-by-side views, and apply programmatic branding to slash post-production turnaround from hours to minutes.`,
    },
    {
      company: "AI Singapore - NUS",
      href: "https://aisingapore.org",
      location: "Singapore",
      title: "Associate AI Engineer",
      logoUrl: "",
      start: "September 2024",
      end: "June 2025",
      description: `- Selected for the highly competitive 9-month AI Apprenticeship Programme (AIAP) through a rigorous technical assessment and interview process.
- Completed intensive training in statistics, classical machine learning techniques (SVMs, Random Forest, Logistic Regression), and modern deep learning with LLMs such as DeepSeek-R1-Distill, SaulLM, and LLaMA.
- Engineered a pipeline to synthesize annotated legal statutes by integrating structured legal data.
- Built a domain-specific knowledge graph mapping legal Acts, Sections, and Case Law, enabling linkage between legislation and cases.
- Developed and deployed a Retrieval-Augmented Generation (RAG) system with vector database integration, indexing legal text using dense embeddings for semantic retrieval.
- Achieved automated section-level annotation by retrieving the top-cited cases for each statutory section and generating LLM-based annotation with paragraph-level source attribution.`,
    },
    {
      company: "Rehabilitation Research Institute of Singapore - NTU",
      href: "https://www.ntu.edu.sg",
      location: "Singapore",
      title: "Project Officer / Research Associate",
      logoUrl: "",
      start: "November 2019",
      end: "September 2024",
      description: `- **Ability Data:** Managed the Qualisys Track Manager (QTM) motion capture system to collect Asian-centric motion data from over 200 subjects, conducted detailed data cleaning and processing, and served as the lead trainer for QTM operations across teams.
- **Visual3D:** Built automation scripts using Visual3D and Python (Pandas, PyQt5) to streamline post-processing of large datasets, including a one-click system that automated modeling of 200 subjects' height, weight, and pipeline parameters.
- **Markerless System:** Advanced a markerless tracking system that identifies anatomical points without traditional markers; improved quality-check scripts and built an analytical layer that generates detailed PDF reports via HTML and the Jinja templating library.`,
    },
    {
      company: "Singapore Police Force",
      href: "https://www.police.gov.sg",
      location: "Singapore",
      title: "Police Patrol Officer Sergeant (2)",
      logoUrl: "",
      start: "October 2015",
      end: "August 2017",
      description: `- Received the Commander's Award for dedicated service in 2016, acknowledging exceptional commitment and professionalism in law enforcement tasks.`,
    },
    {
      company: "Thales Solutions Asia Pte Ltd",
      href: "https://www.thalesgroup.com",
      location: "Singapore",
      title: "Internship",
      logoUrl: "",
      start: "October 2014",
      end: "December 2014",
      description: `- Engineering internship at Thales Solutions Asia Pte Ltd.`,
    },
  ],
  education: [
    {
      school: "Nanyang Polytechnic",
      href: "https://www.nyp.edu.sg",
      degree: "Specialist Diploma in Artificial Intelligence",
      logoUrl: "",
      start: "2022",
      end: "2023",
    },
    {
      school: "Nanyang Technological University",
      href: "https://www.ntu.edu.sg",
      degree: "Master of Science in Mechanical Engineering (Additive Manufacturing)",
      logoUrl: "",
      start: "2020",
      end: "2022",
    },
    {
      school: "University of Glasgow (Singapore Institute of Technology)",
      href: "https://www.gla.ac.uk",
      degree: "Bachelor of Engineering in Mechatronics (Hons)",
      logoUrl: "",
      start: "2017",
      end: "2019",
    },
    {
      school: "Nanyang Polytechnic",
      href: "https://www.nyp.edu.sg",
      degree: "Diploma in Electronics, Computer & Communication Engineering",
      logoUrl: "",
      start: "2012",
      end: "2015",
    },
  ],
  projects: [
    {
      title: "Traditional RAG System",
      href: "https://github.com/mohamed-ahshik",
      dates: "Personal Project",
      description:
        "A document question-answering system with a Streamlit front end: uploaded documents are chunked, embedded, and indexed into a vector database; semantically similar chunks are retrieved for an LLM to generate grounded answers.",
      technologies: ["Python", "Streamlit", "Vector Database", "LLMs", "RAG"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Player Detection in Football using YOLOv8",
      href: "https://github.com/mohamed-ahshik",
      dates: "Personal Project",
      description:
        "Fine-tuned YOLOv8 (pre-trained on COCO) to detect the ball, players, and referees in football footage. Used K-Means clustering on jersey colors from the top half of each bounding box to distinguish the two teams.",
      technologies: ["Python", "YOLOv8", "OpenCV", "K-Means"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Deep Learning Yoga Pose Classification",
      href: "https://github.com/mohamed-ahshik",
      dates: "Academic Project",
      description:
        "Built a training dataset from anatomical coordinates and trained a deep learning model (OpenPose + TensorFlow) to classify yoga poses live from a webcam stream, exploring hyperparameters to optimise performance.",
      technologies: ["Python", "OpenPose", "TensorFlow", "Computer Vision"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Object Detection",
      href: "https://github.com/mohamed-ahshik",
      dates: "Academic Project",
      description:
        "Explored open-source packages including YOLO and ResNet to train a model for detecting unique objects not originally in the training sets (sunny-side-up eggs alongside human figures) and implemented non-maximum suppression to keep the highest-confidence detection box.",
      technologies: ["Python", "YOLO", "ResNet", "Non-Maximum Suppression"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Optical Blood Pressure Monitoring System",
      href: "https://github.com/mohamed-ahshik",
      dates: "Academic Project",
      description:
        "Developed a non-invasive, cuffless blood pressure monitoring system using pulse oximetry and Arduino. Applied photoplethysmography techniques to detect specific signal points in real time, enabling systolic and diastolic blood pressure measurement.",
      technologies: ["Arduino", "Photoplethysmography", "Signal Processing"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Smart Home Appliances",
      href: "https://github.com/mohamed-ahshik",
      dates: "Academic Project",
      description:
        "Engineered a system to control home appliances remotely over the internet by extracting IR data from a fan and integrating it with a Spark core carrying an IR sender, allowing appliance control from connected devices.",
      technologies: ["Arduino", "Spark Core", "IR", "IoT"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
} as const;
````

- [ ] **Step 2: Edit `src/components/section/work-section.tsx` — render markdown descriptions**

Add import after the existing imports (near the top, after line `import { cn } from "@/lib/utils";`):

```tsx
import Markdown from "react-markdown";
```

Replace the `AccordionContent` body (currently `{work.description}`):

```tsx
          <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <Markdown>{work.description}</Markdown>
            </div>
          </AccordionContent>
```

- [ ] **Step 3: Edit `src/components/section/projects-section.tsx` — subtitle copy**

Replace this paragraph text:

```tsx
                            I&apos;ve worked on a variety of projects, from simple
                            websites to complex web applications. Here are a few of my
                            favorites.
```

with:

```tsx
                            A selection of AI, machine learning, and engineering
                            projects from my academic and professional work.
```

- [ ] **Step 4: Delete unused demo images (keep fonts)**

```bash
rm -f public/atomic.png public/buildspace.jpg public/ib.png public/laurier.png public/lime.svg public/me.png public/mitremedia.png public/nvidia.png public/shopify.svg public/splunk.svg public/waterloo.png
ls public/
```

Expected: only `fonts` remains.

- [ ] **Step 5: Verify build + lint**

```bash
pnpm build && pnpm lint
```

Expected: both pass. If TypeScript complains about `skill.icon` on text-only skills, the `icon: undefined` entries are already present — recheck the file was replaced exactly.

- [ ] **Step 6: Commit**

```bash
git add -A -- . ':(exclude)template' ':(exclude)resume'
git commit -m "feat: populate site content from resume"
```

---

### Task 4: Contact copy + README

**Files:**
- Modify: `src/components/section/contact-section.tsx` (remove Twitter-specific copy)
- Modify: `README.md` (replace template README)
- Verify (no change expected): `src/app/opengraph-image.tsx` is fully DATA-driven, no hardcoded author name.

**Interfaces:**
- Consumes: `DATA.contact.social.email.url` (a `mailto:` URL) from Task 3.
- Produces: user-facing contact copy and repo README.

- [ ] **Step 1: Replace the paragraph in `src/components/section/contact-section.tsx`**

Replace the whole `<p>` element (the one that links to `DATA.contact.social.X.url`) with:

```tsx
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Want to chat? Just{" "}
          <Link
            href={DATA.contact.social.email.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            send me an email
          </Link>{" "}
          and I&apos;ll respond whenever I can. I will ignore all
          soliciting.
        </p>
```

Note: `DATA.contact.social.email` exists in the new data (Task 3); the old `DATA.contact.social.X` no longer exists, so this edit is required for the build.

- [ ] **Step 2: Replace `README.md` with:**

```markdown
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
```

- [ ] **Step 3: Verify build + lint**

```bash
pnpm build && pnpm lint
```

Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add -A -- . ':(exclude)template' ':(exclude)resume'
git commit -m "feat: update contact copy and project readme"
```

---

### Task 5: Prune unused dependencies + full verification

**Files:**
- Modify: `package.json` (remove blog/content-collections-only deps)
- Modify: `pnpm-lock.yaml` (via `pnpm install`)

**Interfaces:**
- Consumes: completed app from Tasks 1–4.
- Produces: minimal dependency set; final verified site.

- [ ] **Step 1: Confirm each dep being removed has no remaining import**

```bash
grep -rn "content-collections\|rehype-pretty-code\|remark-gfm\|shiki\|zod" src next.config.mjs || echo "OK: safe to remove"
```

Expected: `OK: safe to remove`.

- [ ] **Step 2: Remove the deps**

```bash
pnpm remove @content-collections/core @content-collections/mdx @content-collections/next content-collections rehype-pretty-code remark-gfm shiki zod
```

Expected: `package.json` and `pnpm-lock.yaml` updated. Keep `@radix-ui/react-icons` (used by `src/components/mode-toggle.tsx`).

- [ ] **Step 3: Verify build + lint**

```bash
pnpm build && pnpm lint
```

Expected: both pass.

- [ ] **Step 4: Start dev server and check in browser**

```bash
pnpm dev > /tmp/portfolio-dev.log 2>&1 &
sleep 8
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expected: `200`. If not, check `/tmp/portfolio-dev.log`.

Then with the browser tools:
1. Navigate to `http://localhost:3000`.
2. Check console messages — expect no errors.
3. Desktop screenshot: hero shows "Hi, I'm Mohamed" + "MA" initials avatar; about, work (Deriv first), education, skills chips, 6 project cards with gray image blocks, contact card with email link.
4. Expand the first work accordion item; bullets render as a list.
5. Toggle dark mode via the navbar theme button; screenshot.
6. Resize/emulate mobile viewport (e.g. 390x844); screenshot.
7. Verify nav dock: Home, GitHub, email icons, theme toggle.

- [ ] **Step 5: Stop the dev server**

```bash
pkill -f "next dev" || true
```

- [ ] **Step 6: Commit**

```bash
git add -A -- . ':(exclude)template' ':(exclude)resume'
git commit -m "chore: prune unused dependencies and verify build"
```

---

## Self-Review Notes

- **Spec coverage:** file layout (Task 1), blog removal (Task 2), hackathons removal (Tasks 2–3), data mapping incl. placeholders (Task 3), contact copy + README + DATA-driven OG check (Task 4), dependency pruning and verification (Task 5). Design's "opengraph-image edit" resolved: file is entirely DATA-driven — no edit needed, verified in Task 4.
- **Type consistency:** no component edits introduce new interfaces; `DATA` keys match template access patterns exactly (`logoUrl`, `image`, `video`, `links`, `icon` present on every element).
- **Known deviations from spec:** spec said work descriptions "markdown bullet lists" — template's WorkSection renders plain text, so Task 3 adds the minimal Markdown render; spec said "site URL placeholder" — value fixed to `https://ahshik.vercel.app`.
