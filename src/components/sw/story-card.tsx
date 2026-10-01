import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Story } from "@/lib/content";

export function StoryCard({
  story,
  size = "md",
  className,
}: {
  story: Story;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      to="/stories/$slug"
      params={{ slug: story.slug }}
      className={cn("group block focus-visible:outline-none", className)}
    >
      <div className="overflow-hidden rounded-xl bg-muted ring-offset-4 ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <img
          src={story.image}
          alt={story.title}
          loading="lazy"
          className={cn(
            "w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]",
            size === "lg" ? "aspect-[16/11]" : "aspect-[4/3]",
          )}
        />
      </div>
      <div className="mt-5">
        <p className="label-mono text-muted-foreground">
          {story.category} / {story.readTime.replace(" read", "")}
        </p>
        <h3
          className={cn(
            "mt-3 font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-0.5",
            size === "lg" ? "text-2xl md:text-[1.875rem] leading-[1.1]" : "text-xl leading-snug",
          )}
        >
          {story.title}
        </h3>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-muted-foreground">
          {story.dek}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="label-mono text-foreground">{story.author}</span>
          <span className="flex items-center gap-1.5 label-mono text-muted-foreground transition-colors group-hover:text-foreground">
            {story.readTime}
            <ArrowUpRight className="size-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
        </div>
      </div>
    </Link>
  );
}
