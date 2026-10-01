import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SWButton } from "@/components/sw/sw-button";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="section-y border-t border-border">
      <div className="shell grid gap-10 md:grid-cols-2 md:items-end">
        <div>
          <h2 className="heading-lg max-w-sm">Stories worth opening.</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            The latest founder stories, interviews and ideas in your inbox. Once a week, nothing
            else.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            toast.success("You're on the list.", {
              description: "The next issue lands in your inbox on Thursday.",
            });
            setEmail("");
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            className="h-14 flex-1 rounded-full border border-border bg-background px-6 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground"
          />
          <SWButton type="submit" size="lg">
            Subscribe <ArrowRight />
          </SWButton>
        </form>
      </div>
    </section>
  );
}
