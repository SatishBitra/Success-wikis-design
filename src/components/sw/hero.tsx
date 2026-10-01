import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SWButton } from "@/components/sw/sw-button";
import { heroSlides, stories } from "@/lib/content";
import { cn } from "@/lib/utils";

function SurpriseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-90 group-hover:scale-110"
    >
      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
    </svg>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  const handleSurprise = () => {
    const pick = stories[Math.floor(Math.random() * stories.length)];
    if (pick) {
      navigate({ to: "/stories/$slug", params: { slug: pick.slug } });
    }
  };

  const slide = heroSlides[index] ?? heroSlides[0]!;

  return (
    <section className="relative overflow-hidden bg-accent lg:flex lg:min-h-[calc(100dvh-6.5rem)] lg:flex-col lg:justify-between">
      <div className="shell relative my-auto grid w-full items-center gap-8 py-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:py-10 lg:gap-14 lg:py-12 xl:gap-16 xl:py-14 2xl:gap-20 2xl:py-16">
        <div className="reveal">
          <p className="label-mono text-xs text-accent-foreground/75 lg:text-sm">
            Founder stories · since 2021
          </p>
          <h1 className="mt-3 text-3xl font-medium leading-[1.02] tracking-tight text-accent-foreground sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] xl:text-[4rem] 2xl:text-[4.5rem]">
            Real people.
            <br />
            Real journeys.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-accent-foreground/85 sm:text-base md:text-[1.0625rem] lg:mt-5 lg:max-w-lg lg:text-lg 2xl:text-xl">
            The stories behind the people building what comes next — written, filmed and recorded in
            their own words.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-8 2xl:mt-10">
            <SWButton
              asChild
              variant="heroPrimary"
              size="md"
              className="md:h-12 md:px-6 lg:h-13 lg:px-7"
            >
              <Link to="/stories">
                Explore Stories <ArrowRight className="size-4" />
              </Link>
            </SWButton>
            <SWButton
              type="button"
              onClick={handleSurprise}
              variant="secondary"
              size="md"
              className="group md:h-12 md:px-6 lg:h-13 lg:px-7 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <SurpriseIcon />
              <span>Surprise Me</span>
            </SWButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[430px] xl:max-w-[480px] 2xl:max-w-[520px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-accent-foreground/10 shadow-s3">
            {heroSlides.map((s, i) => (
              <img
                key={s.slug}
                src={s.image}
                alt={s.name}
                width={1200}
                height={1500}
                className={cn(
                  "size-full object-cover transition-opacity duration-500 ease-out",
                  i === index ? "opacity-100" : "absolute inset-0 opacity-0",
                )}
              />
            ))}
          </div>

          <Link
            to="/stories/$slug"
            params={{ slug: slide.slug }}
            className="group mt-4 block rounded-xl bg-background p-4 shadow-s2 transition-transform duration-300 hover:-translate-y-0.5 md:absolute md:-bottom-4 md:-left-6 md:mt-0 md:max-w-[260px] lg:-bottom-5 lg:-left-8 lg:max-w-[280px] xl:-bottom-6 xl:-left-10 xl:max-w-[310px] 2xl:max-w-[330px]"
          >
            <p className="label-mono text-[0.6875rem] text-muted-foreground xl:text-xs">
              {slide.eyebrow}
            </p>
            <p className="mt-2 text-sm font-medium leading-snug line-clamp-2 lg:text-[0.9375rem] xl:text-base">
              {slide.title}
            </p>
            <p className="mt-2 truncate label-mono text-[0.6875rem] text-muted-foreground xl:text-xs">
              {slide.name} · {slide.company}
            </p>
            <span className="mt-3 flex items-center gap-1.5 label-mono text-[0.6875rem] xl:text-xs">
              Read story
              <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>

      <div className="shell flex items-center gap-3.5 pb-5 pt-1 md:pb-6 lg:pb-8">
        <span className="label-mono text-xs text-accent-foreground/75 lg:text-sm">
          {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => setIndex(i)}
              aria-label={`Featured story ${i + 1}`}
              className={cn(
                "h-0.5 w-8 transition-all duration-300 lg:w-10",
                i === index ? "bg-accent-foreground" : "bg-accent-foreground/30",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
