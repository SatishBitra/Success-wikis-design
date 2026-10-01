import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { SWButton } from "@/components/sw/sw-button";
import { stories } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SurpriseMe({ className }: { className?: string }) {
  const navigate = useNavigate();

  const surprise = () => {
    const pick = stories[Math.floor(Math.random() * stories.length)];
    if (pick) {
      navigate({ to: "/stories/$slug", params: { slug: pick.slug } });
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-xl border border-border bg-background-soft p-8 md:p-10",
        className,
      )}
    >
      <div>
        <p className="label-mono flex items-center gap-2 text-muted-foreground">
          <Sparkles className="size-3.5 text-accent" /> Surprise me
        </p>
        <p className="mt-5 text-2xl leading-tight tracking-tight md:text-[1.75rem]">
          Don&apos;t know what to read? Let us pick a story.
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
          Discover unexpected founder breakthroughs, risks, and hard-earned lessons from our
          archives.
        </p>
      </div>
      <SWButton onClick={surprise} className="mt-8 self-start">
        Surprise me <ArrowRight className="size-4" />
      </SWButton>
    </div>
  );
}
