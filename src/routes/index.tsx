import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Mic2, Play } from "lucide-react";
import { useState } from "react";
import { Hero } from "@/components/sw/hero";
import { BehindTheStory } from "@/components/sw/behind-the-story";
import { FounderCarousel } from "@/components/sw/founder-carousel";
import { Newsletter } from "@/components/sw/newsletter";
import { PageShell } from "@/components/sw/page-shell";
import { StoryCard } from "@/components/sw/story-card";
import { SurpriseMe } from "@/components/sw/surprise-me";
import { PodcastBadges } from "@/components/sw/podcast-badges";
import { SWButton } from "@/components/sw/sw-button";
import { categories, images, stories, videos } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Success Wikis — Real people. Real journeys." },
      {
        name: "description",
        content:
          "Founder stories, interviews, videos and podcasts about the people building what comes next.",
      },
      { property: "og:title", content: "Success Wikis — Real people. Real journeys." },
      {
        property: "og:description",
        content: "The stories behind founders, builders and creators, in their own words.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState("All");
  const [cornerIndex, setCornerIndex] = useState(0);

  const filtered = active === "All" ? stories : stories.filter((s) => s.category === active);
  const featured = filtered[0] ?? stories[0]!;

  // 4 items for the vertical recent stories list
  const latestList =
    filtered.length > 1
      ? filtered.slice(1, 5)
      : stories.filter((s) => s.slug !== featured.slug).slice(0, 4);

  // 3 items for the Founders corner carousel
  const cornerStories = [
    stories[(cornerIndex + 0) % stories.length]!,
    stories[(cornerIndex + 1) % stories.length]!,
    stories[(cornerIndex + 2) % stories.length]!,
  ];

  const handleCornerPrev = () => {
    setCornerIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const handleCornerNext = () => {
    setCornerIndex((prev) => (prev + 1) % stories.length);
  };

  const lead = videos[0]!;

  return (
    <PageShell>
      <Hero />

      {/* Categories + editorial grid */}
      <section className="section-y">
        <div className="shell">
          <div>
            <h2 className="heading-lg">Explore stories</h2>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
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

            <Link
              to="/stories"
              className="label-mono flex items-center gap-1.5 underline underline-offset-4 decoration-current transition-colors hover:text-accent"
            >
              All stories <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Tier 1: Featured Story (wide) + Recent Stories list (compact vertical stack) */}
          <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
            {/* Left: Featured story card with full image and overlay */}
            <Link
              to="/stories/$slug"
              params={{ slug: featured.slug }}
              className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl bg-ink shadow-s2 transition-transform duration-500 hover:-translate-y-0.5 sm:min-h-[440px] lg:min-h-[480px]"
            >
              <img
                src={featured.image}
                alt={featured.title}
                loading="eager"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-transparent" />

              <div className="relative z-10 p-6 sm:p-8 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/95 px-3.5 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Story of the Week
                </span>

                <h3 className="mt-4 text-2xl font-medium leading-tight text-white transition-colors group-hover:text-accent sm:text-3xl lg:text-[2rem]">
                  {featured.title}
                </h3>

                <p className="mt-3 flex items-center gap-2 label-mono text-xs text-white/80">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </p>
              </div>
            </Link>

            {/* Right: Recent stories vertical stack */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  Recent stories
                </h3>

                <div className="mt-6 divide-y divide-border/60">
                  {latestList.map((item) => (
                    <Link
                      key={item.slug}
                      to="/stories/$slug"
                      params={{ slug: item.slug }}
                      className="group flex items-center gap-4 py-3.5 transition-colors first:pt-0 last:pb-0"
                    >
                      <div className="relative size-18 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-20">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-accent-foreground sm:text-[0.9375rem]">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 label-mono text-xs text-muted-foreground">
                          {item.date} · {item.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2: Founders corner with 3 cards & pagination arrows */}
          <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-14">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  Founders corner
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCornerPrev}
                  aria-label="Previous stories"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground hover:bg-muted active:scale-95"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCornerNext}
                  aria-label="Next stories"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground hover:bg-muted active:scale-95"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-7">
              {cornerStories.map((story) => (
                <Link
                  key={story.slug}
                  to="/stories/$slug"
                  params={{ slug: story.slug }}
                  className="group flex flex-col rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-s2"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                    <img
                      src={story.image}
                      alt={story.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span className="label-mono text-xs text-muted-foreground">
                      {story.category}
                    </span>
                  </div>
                  <h4 className="mt-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-foreground line-clamp-2">
                    {story.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {story.dek}
                  </p>
                  <div className="mt-4 border-t border-border/60 pt-3 label-mono text-xs text-muted-foreground">
                    {story.date} · {story.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BehindTheStory />

      {/* Watch */}
      <section className="section-y">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-mono text-muted-foreground">Watch</p>
              <h2 className="heading-lg mt-5 max-w-lg">Founder interviews, filmed in full.</h2>
            </div>
            <SWButton asChild variant="secondary">
              <Link to="/watch">
                All episodes <ArrowRight />
              </Link>
            </SWButton>
          </div>

          <Link to="/watch" className="group mt-12 block">
            <div className="relative overflow-hidden rounded-xl bg-muted">
              <img
                src={lead.image}
                alt={lead.title}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground md:size-20">
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
          </Link>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {videos.slice(1).map((v) => (
              <Link key={v.id} to="/watch" className="group block">
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section className="bg-background-soft">
        <div className="shell section-y grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="label-mono text-muted-foreground">Listen</p>
            <h2 className="heading-lg mt-5 max-w-md">The conversations behind the journeys.</h2>
            <PodcastBadges />
          </div>
          <div className="rounded-xl bg-background p-8 shadow-s1 md:p-10">
            <p className="label-mono flex items-center gap-2 text-muted-foreground">
              <Mic2 className="size-3.5" /> EP. 018
            </p>
            <p className="mt-5 text-2xl leading-tight tracking-tight md:text-[1.75rem]">
              How founders actually make difficult decisions.
            </p>
            <SWButton asChild className="mt-8">
              <Link to="/listen">
                <Play /> Listen now
              </Link>
            </SWButton>
          </div>
        </div>
      </section>

      <FounderCarousel />

      {/* Surprise me + community */}
      <section className="section-y border-t border-border">
        <div className="shell grid gap-6 md:grid-cols-2">
          <SurpriseMe />
          <div className="flex flex-col justify-between rounded-xl bg-ink p-8 text-ink-foreground md:p-10">
            <div>
              <p className="label-mono text-accent">Community</p>
              <p className="mt-5 text-2xl leading-tight tracking-tight md:text-[1.75rem]">
                The story doesn&apos;t end here. Founders, builders and readers connect beyond the
                stories.
              </p>
            </div>
            <SWButton asChild variant="onDark" className="mt-8 self-start">
              <Link to="/community">
                Join the Community <ArrowRight />
              </Link>
            </SWButton>
          </div>
        </div>
      </section>

      {/* Get featured */}
      <section className="bg-accent">
        <div className="shell section-y grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="label-mono text-accent-foreground/70">Get featured</p>
            <h2 className="display-xl mt-6 max-w-2xl text-accent-foreground">You have a story.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-accent-foreground/80">
              If you&apos;ve built something, changed something, or started something that matters —
              we want to hear it.
            </p>
            <SWButton asChild size="lg" className="mt-9">
              <Link to="/get-featured">
                Tell Your Story <ArrowRight />
              </Link>
            </SWButton>

            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-accent-foreground/15 pt-6 text-sm text-accent-foreground/85">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent-foreground" />
                <span>No agency or PR fees</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent-foreground" />
                <span>Written & filmed editorial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent-foreground" />
                <span>10K+ monthly readers</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-accent-foreground/10 shadow-s3">
              <img
                src={images.founder1}
                alt="Founder featured on Success Wikis"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-ink-foreground">
                <p className="label-mono text-accent">Recent Feature · 2026</p>
                <p className="mt-2 text-lg font-medium leading-snug">
                  &ldquo;Sharing the messy beginnings helped us find our earliest believers.&rdquo;
                </p>
                <p className="label-mono mt-2 text-ink-foreground/75">
                  Samir Oza · Founder, Northline
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
