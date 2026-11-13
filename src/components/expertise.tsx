import { skillGroups } from "@/lib/site";

export function Expertise() {
  return (
    <section id="expertise" className="mx-auto max-w-6xl scroll-mt-20 px-5 sm:px-8">
      <div className="border-t border-border pt-12">
        <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Expertise
        </h2>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
          The toolkit I reach for, from the database up to the server it runs
          on.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong"
          >
            <h3 className="text-sm font-semibold tracking-tight text-fg">
              {group.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-subtle">
              {group.note}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-border ring-inset"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
