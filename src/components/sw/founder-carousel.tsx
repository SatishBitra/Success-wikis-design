import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { founders } from "@/lib/content";

export function FounderCarousel() {
  const rail = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    rail.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="section-y border-t border-border">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-mono text-muted-foreground">The people</p>
            <h2 className="heading-lg mt-5 max-w-lg">Meet the people behind the stories.</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous founders"
              className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next founders"
              className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] md:gap-6 md:px-[max(2rem,calc((100vw-1280px)/2+2rem))] scroll-pl-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] md:scroll-pl-[max(2rem,calc((100vw-1280px)/2+2rem))]"
      >
        {founders.map((f) => (
          <article key={f.name} className="group w-[260px] shrink-0 snap-start md:w-[300px]">
            <div className="overflow-hidden rounded-xl bg-muted">
              <img
                src={f.image}
                alt={f.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-4 transition-transform duration-300 group-hover:-translate-y-1">
              <p className="text-lg font-medium tracking-tight">{f.name}</p>
              <p className="label-mono mt-2 text-muted-foreground">{f.company}</p>
              <p className="label-mono mt-1.5 text-muted-foreground">
                {f.category} · {f.location}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
