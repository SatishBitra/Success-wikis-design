import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { PageShell } from "@/components/sw/page-shell";
import { StoryCard } from "@/components/sw/story-card";
import { Newsletter } from "@/components/sw/newsletter";
import { stories, storyBySlug } from "@/lib/content";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = storyBySlug(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Story not found — Success Wikis" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { story } = loaderData;
    return {
      meta: [
        { title: `${story.title} — Success Wikis` },
        { name: "description", content: story.dek },
        { property: "og:title", content: story.title },
        { property: "og:description", content: story.dek },
      ],
    };
  },
  notFoundComponent: StoryNotFound,
  component: StoryPage,
});

function StoryNotFound() {
  return (
    <PageShell>
      <div className="shell section-y">
        <h1 className="heading-lg">We couldn&apos;t find that story.</h1>
        <Link to="/stories" className="label-mono mt-6 inline-flex items-center gap-2">
          <ArrowLeft className="size-3" /> All stories
        </Link>
      </div>
    </PageShell>
  );
}

function StoryPage() {
  const { story } = Route.useLoaderData();
  const related = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <PageShell>
      <article>
        <header className="shell pt-14 pb-10 md:pt-20">
          <Link
            to="/stories"
            className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3" /> Stories
          </Link>
          <p className="label-mono mt-10 text-muted-foreground">{story.category}</p>
          <h1 className="display-xl mt-5 max-w-3xl">{story.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {story.dek}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6">
            <span className="label-mono">{story.author}</span>
            <span className="label-mono text-muted-foreground">{story.role}</span>
            <span className="label-mono flex items-center gap-1.5 text-muted-foreground">
              <Clock3 className="size-3" /> {story.readTime} · {story.date}
            </span>
          </div>
        </header>

        <div className="shell">
          <img
            src={story.image}
            alt={story.title}
            className="aspect-[16/10] w-full rounded-xl object-cover"
          />
        </div>

        <div className="shell py-14 md:py-20">
          <div className="mx-auto max-w-[44rem]">
            {story.body.slice(0, 2).map((p) => (
              <p key={p} className="mb-7 text-lg leading-[1.75] md:text-xl">
                {p}
              </p>
            ))}

            <blockquote className="my-12 border-l-2 border-accent pl-6 md:-mx-16 md:pl-10">
              <p className="text-2xl leading-tight tracking-tight md:text-[2rem]">
                “{story.pullQuote}”
              </p>
              <footer className="label-mono mt-5 text-muted-foreground">{story.author}</footer>
            </blockquote>

            {story.body.slice(2).map((p) => (
              <p key={p} className="mb-7 text-lg leading-[1.75] md:text-xl">
                {p}
              </p>
            ))}
          </div>
        </div>
      </article>

      <section className="section-y border-t border-border">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="heading-lg">What happened next?</h2>
            <Link to="/stories" className="label-mono flex items-center gap-1.5">
              All stories <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {related.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
