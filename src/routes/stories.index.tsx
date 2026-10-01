import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro, PageShell } from "@/components/sw/page-shell";
import { StoryCard } from "@/components/sw/story-card";
import { Newsletter } from "@/components/sw/newsletter";
import { categories, stories } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stories/")({
  head: () => ({
    meta: [
      { title: "Stories — Success Wikis" },
      {
        name: "description",
        content:
          "Written founder stories: the beginnings, the risks, the breakthroughs and the unglamorous years in between.",
      },
      { property: "og:title", content: "Stories — Success Wikis" },
      {
        property: "og:description",
        content: "Founder, builder and creator journeys documented in their own words.",
      },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? stories : stories.filter((s) => s.category === active);

  return (
    <PageShell>
      <PageIntro
        label="Stories"
        title="Every journey, written out in full."
        blurb="The beginnings, the risks, the breakthroughs — and the long stretches nobody posts about."
      />

      <section className="section-y">
        <div className="shell">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "h-9.5 rounded-full border px-4 text-sm transition-colors duration-300",
                  active === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-accent hover:bg-accent",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-lg text-muted-foreground">
              No stories in this category yet — more are on the way.
            </p>
          )}
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
