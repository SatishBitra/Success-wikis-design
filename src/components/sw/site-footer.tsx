import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-Dsk7rL_4.png";

const groups = [
  {
    heading: "Explore",
    links: [
      { label: "Stories", to: "/stories" },
      { label: "Watch", to: "/watch" },
      { label: "Listen", to: "/listen" },
      { label: "Community", to: "/community" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Get Featured", to: "/get-featured" },
      { label: "Advertise", to: "/get-featured" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-block shrink-0" aria-label="Success Wikis home">
              <img
                src={logo}
                alt="Success Wikis"
                className="h-8 w-auto brightness-0 invert md:h-9"
              />
            </Link>
            <p className="mt-4 max-w-xs text-2xl leading-tight tracking-tight">
              Stories of people building what comes next.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group.heading}>
              <p className="label-mono text-ink-foreground/50">{group.heading}</p>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[0.9375rem] text-ink-foreground/85 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="label-mono text-ink-foreground/50">Connect</p>
            <ul className="mt-5 space-y-3">
              {["Instagram", "LinkedIn", "YouTube"].map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-[0.9375rem] text-ink-foreground/85 transition-colors hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-foreground/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="label-mono text-ink-foreground/50">© 2026 Success Wikis</p>
          <p className="label-mono text-ink-foreground/50">Privacy · Terms · Accessibility</p>
        </div>
      </div>
    </footer>
  );
}
