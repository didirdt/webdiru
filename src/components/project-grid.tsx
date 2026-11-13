"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { ProjectDialog } from "@/components/project-dialog";
import type { Project } from "@/lib/types";

type ProjectGridProps = {
  projects: Project[];
  tags: string[];
};

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "bg-accent text-accent-fg"
          : "border border-border bg-surface text-muted hover:bg-surface-hover hover:text-fg"
      }`}
    >
      {label}
    </button>
  );
}

export function ProjectGrid({ projects, tags }: ProjectGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      activeTag
        ? projects.filter((project) => project.tags.includes(activeTag))
        : projects,
    [projects, activeTag],
  );

  const openProject = openSlug
    ? (projects.find((project) => project.slug === openSlug) ?? null)
    : null;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          label="All"
          active={activeTag === null}
          onClick={() => setActiveTag(null)}
        />
        {tags.map((tag) => (
          <FilterChip
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          />
        ))}
      </div>

      {visible.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <li
              key={project.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <ProjectCard
                project={project}
                onOpen={() => setOpenSlug(project.slug)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-sm text-muted">
          No projects match this filter yet.
        </p>
      )}

      <ProjectDialog project={openProject} onClose={() => setOpenSlug(null)} />
    </>
  );
}
