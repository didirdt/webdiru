"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { ArrowUpRightIcon, CloseIcon } from "@/components/icons";
import type { Project } from "@/lib/types";

const STATUS_STYLES: Record<Project["status"], { label: string; className: string }> = {
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

type ProjectDialogProps = {
  project: Project | null;
  onClose: () => void;
};

const CLOSE_ANIMATION_MS = 160;

/** Constant so React never rewrites the class attribute mid-animation. */
const DIALOG_CLASS =
  "project-dialog m-auto w-[min(46rem,calc(100vw-1.5rem))] max-h-[min(85vh,52rem)] overflow-hidden rounded-2xl border border-border bg-surface p-0 text-fg shadow-dialog";

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timerRef = useRef<number | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;

    if (!dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
  }, [project]);

  // Never leave the page scroll-locked if the component unmounts mid-open.
  useEffect(
    () => () => {
      document.body.style.overflow = "";
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  function requestClose() {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (timerRef.current !== null) window.clearTimeout(timerRef.current);

    // Toggle the class directly: React keeps this className constant, so it
    // never overwrites the flag while the exit animation runs.
    dialog.classList.add("is-closing");

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      dialog.classList.remove("is-closing");
      dialog.close();
      document.body.style.overflow = "";
      onCloseRef.current();
    }, CLOSE_ANIMATION_MS);
  }

  const status = project ? STATUS_STYLES[project.status] : null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        // Route Esc through our own close path so the exit animation runs.
        event.preventDefault();
        requestClose();
      }}
      onClose={() => {
        document.body.style.overflow = "";
      }}
      aria-labelledby="project-dialog-title"
      className={DIALOG_CLASS}
    >
      {project ? (
        <div className="flex max-h-[min(85vh,52rem)] flex-col overflow-hidden">
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="font-medium text-subtle tabular-nums">
                  {project.year}
                </span>
                {status ? (
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ring-1 ring-inset ${status.className}`}
                  >
                    {status.label}
                  </span>
                ) : null}
              </div>
              <h2
                id="project-dialog-title"
                className="mt-1.5 text-xl font-bold tracking-tight text-fg"
              >
                {project.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={requestClose}
              aria-label="Close"
              className="-mt-1 -mr-1 inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-5">
            {project.image || project.cover ? (
              <Image
                src={project.image ?? project.cover!}
                alt=""
                width={1200}
                height={630}
                sizes="(max-width: 768px) 100vw, 46rem"
                className="mb-5 aspect-[16/9] w-full rounded-xl object-cover ring-1 ring-border"
              />
            ) : null}

            {project.summary ? (
              <p className="text-sm leading-relaxed text-pretty text-muted">
                {project.summary}
              </p>
            ) : null}

            {project.body ? (
              <div
                className="prose mt-4"
                dangerouslySetInnerHTML={{ __html: project.body }}
              />
            ) : null}

            {project.stack.length > 0 ? (
              <div className="mt-7">
                <h3 className="text-xs font-semibold tracking-wide text-subtle uppercase">
                  Stack
                </h3>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-border ring-inset"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.links.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-2.5 border-t border-border pt-5">
                {project.links.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface-hover px-3.5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {link.label}
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
