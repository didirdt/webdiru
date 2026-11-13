import Image from "next/image";

import { ArrowUpRightIcon } from "@/components/icons";
import type { Project, ProjectStatus } from "@/lib/types";

const STATUS_STYLES: Record<ProjectStatus, { label: string; className: string }> = {
  shipped: {
    label: "Shipped",
    className:
      "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300",
  },
  "in-progress": {
    label: "In progress",
    className:
      "bg-amber-500/10 text-amber-700 ring-amber-600/20 dark:text-amber-300",
  },
  experiment: {
    label: "Experiment",
    className:
      "bg-violet-500/10 text-violet-700 ring-violet-600/20 dark:text-violet-300",
  },
  archived: {
    label: "Archived",
    className:
      "bg-zinc-500/10 text-zinc-600 ring-zinc-500/20 dark:text-zinc-300",
  },
};

type ProjectCardProps = {
  project: Project;
  onOpen: () => void;
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const status = STATUS_STYLES[project.status];
  const accent = project.accent ?? "#6366f1";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open details for ${project.title}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative h-32 shrink-0 overflow-hidden border-b border-border">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(120% 120% at 15% 0%, ${accent}38 0%, transparent 55%), radial-gradient(110% 110% at 85% 100%, ${accent}22 0%, transparent 55%)`,
            }}
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bg/85 px-3 py-1.5 text-xs font-medium text-fg backdrop-blur-sm">
            View details
            <ArrowUpRightIcon className="size-3.5" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-subtle tabular-nums">
            {project.year}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        <h3 className="text-base font-semibold tracking-tight text-fg">
          {project.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-border ring-inset"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
