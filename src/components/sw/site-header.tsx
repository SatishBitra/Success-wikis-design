import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-Dsk7rL_4.png";
import { SWButton } from "@/components/sw/sw-button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { founders, stories, videos } from "@/lib/content";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Stories", to: "/stories" },
  { label: "Watch", to: "/watch" },
  { label: "Listen", to: "/listen" },
  { label: "Community", to: "/community" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-ink text-ink-foreground">
        <div className="shell flex h-8 items-center justify-center">
          <Link
            to="/stories/$slug"
            params={{ slug: stories[0].slug }}
            className="label-mono flex items-center gap-2 transition-colors hover:text-accent"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            A new founder story is live
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-background",
        )}
      >
        <div className="shell flex h-18 items-center justify-between gap-6 py-4">
          <Link to="/" className="shrink-0" aria-label="Success Wikis home">
            <img src={logo} alt="Success Wikis" className="h-8 w-auto md:h-9" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative text-[0.9375rem] text-foreground transition-colors hover:text-muted-foreground"
                activeProps={{ className: "font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
            >
              <Search className="size-[1.125rem]" />
            </button>
            <SWButton asChild size="sm" className="hidden md:inline-flex">
              <Link to="/get-featured">Get Featured</Link>
            </SWButton>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted md:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="shell flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-1 py-3 text-lg"
                >
                  {item.label}
                </Link>
              ))}
              <SWButton asChild className="mt-3 w-full">
                <Link to="/get-featured" onClick={() => setMobileOpen(false)}>
                  Get Featured
                </Link>
              </SWButton>
            </div>
          </div>
        )}
      </header>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search stories, founders, companies..." />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Stories">
            {stories.map((s) => (
              <CommandItem
                key={s.slug}
                value={`${s.title} ${s.author} ${s.category}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/stories/$slug", params: { slug: s.slug } });
                }}
              >
                {s.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Founders">
            {founders.map((f) => (
              <CommandItem
                key={f.name}
                value={`${f.name} ${f.company}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/stories" });
                }}
              >
                {f.name} — {f.company}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Videos & Podcasts">
            {videos.map((v) => (
              <CommandItem
                key={v.id}
                value={`${v.episode} ${v.title} ${v.guest}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/watch" });
                }}
              >
                {v.episode} · {v.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
