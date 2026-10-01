import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { behindTheStory } from "@/lib/content";
import { cn } from "@/lib/utils";

export function BehindTheStory() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-ink text-ink-foreground">
      <div className="shell section-y">
        <p className="label-mono text-accent">Behind the story</p>
        <h2 className="heading-lg mt-5 max-w-xl">The stages behind every story we publish.</h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-16">
          <ul className="divide-y divide-ink-foreground/15 border-y border-ink-foreground/15">
            {behindTheStory.map((item, i) => (
              <li key={item.no}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-start gap-5 py-6 text-left outline-none"
                >
                  <span
                    className={cn(
                      "label-mono pt-1 transition-colors",
                      i === active ? "text-accent" : "text-ink-foreground/40",
                    )}
                  >
                    {item.no}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 text-xl tracking-tight md:text-2xl">
                      {item.stage}
                      <ArrowRight
                        className={cn(
                          "size-4 transition-all duration-300",
                          i === active
                            ? "translate-x-0 text-accent opacity-100"
                            : "-translate-x-2 opacity-0",
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "mt-2 block max-w-md text-sm leading-relaxed transition-colors",
                        i === active ? "text-ink-foreground/80" : "text-ink-foreground/45",
                      )}
                    >
                      {item.note}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-ink-soft md:sticky md:top-28">
            {behindTheStory.map((item, i) => (
              <img
                key={item.no}
                src={item.image}
                alt={item.stage}
                loading="lazy"
                className={cn(
                  "aspect-[4/5] w-full object-cover transition-all duration-500 ease-out",
                  i === active ? "opacity-100" : "absolute inset-0 opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
