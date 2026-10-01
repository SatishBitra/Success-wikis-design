import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { SWButton } from "@/components/sw/sw-button";
import { heroSlides } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="relative overflow-hidden bg-accent">
      <div className="shell relative grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-20 lg:py-24">
        <div className="reveal">
          <p className="label-mono text-accent-foreground/70">Founder stories · since 2021</p>
          <h1 className="display-xl mt-6 text-accent-foreground">
            Real people.
            <br />
            Real journeys.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-accent-foreground/80 md:text-xl">
            The stories behind the people building what comes next — written, filmed and recorded in
            their own words.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <SWButton asChild variant="heroPrimary" size="lg">
              <Link to="/stories">
                Explore Stories <ArrowRight />
              </Link>
            </SWButton>
            <SWButton asChild variant="secondary" size="lg">
              <Link to="/watch">
                <Play /> Watch Stories
              </Link>
            </SWButton>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl bg-accent-foreground/10 shadow-s3">
            {heroSlides.map((s, i) => (
              <img
                key={s.slug}
                src={s.image}
                alt={s.name}
                width={1200}
                height={1500}
                className={cn(
                  "aspect-[4/5] w-full object-cover transition-opacity duration-500 ease-out",
                  i === index ? "opacity-100" : "absolute inset-0 opacity-0",
                )}
              />
            ))}
          </div>

          <Link
            to="/stories/$slug"
            params={{ slug: slide.slug }}
            className="group mt-5 block rounded-xl bg-background p-5 shadow-s2 transition-transform duration-300 hover:-translate-y-0.5 md:absolute md:-bottom-10 md:-left-8 md:mt-0 md:max-w-xs"
          >
            <p className="label-mono text-muted-foreground">{slide.eyebrow}</p>
            <p className="mt-3 text-lg leading-snug font-medium">{slide.title}</p>
            <p className="mt-3 label-mono text-muted-foreground">
              {slide.name} · {slide.company}
            </p>
            <span className="mt-4 flex items-center gap-1.5 label-mono">
              Read story
              <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>

      <div className="shell flex items-center gap-4 pb-8 md:pb-10">
        <span className="label-mono text-accent-foreground/70">
          {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => setIndex(i)}
              aria-label={`Featured story ${i + 1}`}
              className={cn(
                "h-0.5 w-10 transition-all duration-300",
                i === index ? "bg-accent-foreground" : "bg-accent-foreground/30",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
