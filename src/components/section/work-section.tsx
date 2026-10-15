/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

function WorkHeader({
  logoUrl,
  company,
  title,
  start,
  end,
  showChevrons,
}: {
  logoUrl: string;
  company: string;
  title: string;
  start: string;
  end: string | undefined;
  showChevrons: boolean;
}) {
  return (
    <div className="flex items-center gap-x-3 justify-between w-full text-left">
      <div className="flex items-center gap-x-3 flex-1 min-w-0">
        <LogoImage src={logoUrl} alt={company} />
        <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
          <div className="font-semibold leading-none flex items-center gap-2">
            {company}
            {showChevrons && (
              <span className="relative inline-flex items-center w-3.5 h-3.5">
                <ChevronRight
                  className={cn(
                    "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                    "translate-x-0 opacity-0",
                    "group-hover:translate-x-1 group-hover:opacity-100",
                    "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                  )}
                />
                <ChevronDown
                  className={cn(
                    "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                    "opacity-0 rotate-0",
                    "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                  )}
                />
              </span>
            )}
          </div>
          <div className="font-sans text-sm text-muted-foreground">
            {title}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
        <span>
          {start} - {end ?? "Present"}
        </span>
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.work.map((work) =>
        work.description ? (
          <AccordionItem
            key={work.company}
            value={work.company}
            className="w-full border-b-0 grid gap-2"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
              <WorkHeader
                logoUrl={work.logoUrl}
                company={work.company}
                title={work.title}
                start={work.start}
                end={work.end}
                showChevrons
              />
            </AccordionTrigger>
            <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <Markdown>{work.description}</Markdown>
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <div key={work.company} className="w-full">
            <WorkHeader
              logoUrl={work.logoUrl}
              company={work.company}
              title={work.title}
              start={work.start}
              end={work.end}
              showChevrons={false}
            />
          </div>
        )
      )}
    </Accordion>
  );
}
