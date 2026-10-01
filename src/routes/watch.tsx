import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { PageIntro, PageShell } from "@/components/sw/page-shell";
import { Newsletter } from "@/components/sw/newsletter";
import { videos } from "@/lib/content";

export const Route = createFileRoute("/watch")({
  head: () => ({
    meta: [
      { title: "Watch — Success Wikis" },
      {
        name: "description",
        content:
          "Filmed founder interviews, short documentaries and full episodes from the Success Wikis studio.",
      },
      { property: "og:title", content: "Watch — Success Wikis" },
      {
        property: "og:description",
        content: "Founder interviews and short films, in full and unedited.",
      },
    ],
  }),
  component: WatchPage,
});

function WatchPage() {
  const lead = videos[0]!;

  return (
    <PageShell>
      <PageIntro
        label="Watch"
        title="Interviews, unedited."
        blurb="Long-form conversations and short films with the founders, builders and creators we document."
      />

      <section className="section-y">
        <div className="shell">
          <div className="group relative overflow-hidden rounded-xl bg-muted">
            <img
              src={lead.image}
              alt={lead.title}
              className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground md:size-20">
                <Play className="size-6 md:size-7" />
              </span>
            </span>
          </div>
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="label-mono text-muted-foreground">
                {lead.episode} · {lead.guest}
              </p>
              <p className="mt-3 text-2xl tracking-tight md:text-[1.875rem]">{lead.title}</p>
            </div>
            <span className="label-mono text-muted-foreground">{lead.duration}</span>
          </div>

          <div className="mt-16 grid gap-10 border-t border-border pt-14 md:grid-cols-3">
            {videos.slice(1).map((v) => (
              <article key={v.id} className="group">
                <div className="relative overflow-hidden rounded-lg bg-muted">
                  <img
                    src={v.image}
                    alt={v.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Play className="size-4" />
                  </span>
                  <span className="label-mono absolute right-3 bottom-3 rounded-full bg-background px-2.5 py-1.5">
                    {v.duration}
                  </span>
                </div>
                <p className="label-mono mt-4 text-muted-foreground">
                  {v.episode} · {v.guest}
                </p>
                <p className="mt-2.5 text-lg leading-snug">{v.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
