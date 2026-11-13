import Image from "next/image";

import { ArrowUpRightIcon, DownloadIcon } from "@/components/icons";
import { site } from "@/lib/site";

type HeroProps = {
  projectCount: number;
  stackCount: number;
};

export function Hero({ projectCount, stackCount }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Subtle grid + glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-center lg:gap-x-14 lg:gap-y-8">
          {/* Intro */}
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {site.availability}
            </p>

            <h1 className="animate-fade-up mt-6 text-4xl font-bold tracking-tight text-balance text-fg sm:text-5xl md:text-6xl [animation-delay:60ms]">
              {site.headline}
            </h1>

            <p className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg [animation-delay:120ms]">
              {site.intro}
            </p>
          </div>

          {/* Portrait */}
          <div className="animate-fade-up mt-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 [animation-delay:200ms]">
            <div className="relative mx-auto w-56 sm:w-64 lg:w-full">
              <div
                aria-hidden
                className="absolute -inset-2.5 rounded-[2.25rem] bg-gradient-to-br from-accent/30 via-accent/5 to-transparent blur-2xl"
              />
              <Image
                src="/foto.jpg"
                alt={`${site.name}, ${site.role}`}
                width={800}
                height={800}
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 272px"
                preload
                className="relative aspect-[4/5] w-full rounded-3xl object-cover object-[50%_22%] ring-1 ring-border shadow-card"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-bg/80 px-3 py-1 text-[11px] font-medium text-fg backdrop-blur-sm">
                {site.location}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-start-1 lg:row-start-2">
            <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-3 [animation-delay:180ms]">
              <a
                href="#projects"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-fg shadow-card transition-all hover:-translate-y-0.5 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View projects
                <ArrowUpRightIcon className="size-4" />
              </a>
              <a
                href={site.cv}
                download
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <DownloadIcon className="size-4" />
                Download CV
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-11 items-center rounded-xl px-1 text-sm font-semibold text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Get in touch
              </a>
            </div>

            <dl className="animate-fade-up mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 [animation-delay:240ms]">
              <div>
                <dt className="text-xs font-medium tracking-wide text-subtle uppercase">
                  Projects
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-fg tabular-nums">
                  {projectCount}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-subtle uppercase">
                  Technologies
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-fg tabular-nums">
                  {stackCount}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-subtle uppercase">
                  Based in
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-fg">{site.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
