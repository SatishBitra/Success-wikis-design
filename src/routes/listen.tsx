import { createFileRoute } from "@tanstack/react-router";
import { Mic2, Play } from "lucide-react";
import { PageIntro, PageShell } from "@/components/sw/page-shell";
import { Newsletter } from "@/components/sw/newsletter";
import { PodcastBadges } from "@/components/sw/podcast-badges";
import { SWButton } from "@/components/sw/sw-button";
import { videos } from "@/lib/content";

export const Route = createFileRoute("/listen")({
  head: () => ({
    meta: [
      { title: "Listen — Success Wikis" },
      {
        name: "description",
        content:
          "The Success Wikis podcast: honest conversations with founders about decisions, failures and the long middle.",
      },
      { property: "og:title", content: "Listen — Success Wikis" },
      {
        property: "og:description",
        content: "Founder conversations on Spotify, Apple Podcasts and YouTube.",
      },
    ],
  }),
  component: ListenPage,
});

function ListenPage() {
  return (
    <PageShell>
      <PageIntro
        label="Listen"
        title="The conversations behind the journeys."
        blurb="One episode a week. No hype, no highlight reels — just how the decisions actually got made."
      />

      <section className="section-y">
        <div className="shell">
          <PodcastBadges className="mt-0" />

          <ul className="mt-14 divide-y divide-border border-y border-border">
            {videos.map((v) => (
              <li
                key={v.id}
                className="group flex flex-wrap items-center gap-5 py-7 md:flex-nowrap md:gap-8"
              >
                <span className="label-mono w-20 shrink-0 text-muted-foreground">{v.episode}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xl leading-snug tracking-tight md:text-2xl">{v.title}</p>
                  <p className="label-mono mt-2.5 text-muted-foreground">
                    {v.guest} · {v.duration}
                  </p>
                </div>
                <SWButton variant="secondary" size="sm" className="shrink-0">
                  <Play /> Listen
                </SWButton>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-xl bg-background-soft p-8 md:p-10">
            <p className="label-mono flex items-center gap-2 text-muted-foreground">
              <Mic2 className="size-3.5" /> Be on the show
            </p>
            <p className="mt-5 max-w-lg text-2xl leading-tight tracking-tight">
              If you&apos;ve built something worth explaining, we&apos;ll record it properly.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
