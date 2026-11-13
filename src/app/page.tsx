import { Expertise } from "@/components/expertise";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllTags, getProjects } from "@/lib/projects";

export default function Home() {
  const projects = getProjects();
  const tags = getAllTags(projects);
  const stackCount = new Set(projects.flatMap((project) => project.stack)).size;

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero projectCount={projects.length} stackCount={stackCount} />

        <Expertise />

        <section
          id="projects"
          className="mx-auto mt-24 max-w-6xl scroll-mt-20 px-5 sm:px-8"
        >
          <div className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              Projects
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
              A working list of everything I&apos;ve built. Pick a tag to filter,
              or open a card to read the details.
            </p>
          </div>

          <div className="mt-7">
            <ProjectGrid projects={projects} tags={tags} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
