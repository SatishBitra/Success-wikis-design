import type { ReactNode } from "react";
import { SiteHeader } from "@/components/sw/site-header";
import { SiteFooter } from "@/components/sw/site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageIntro({
  label,
  title,
  blurb,
}: {
  label: string;
  title: string;
  blurb?: string;
}) {
  return (
    <section className="border-b border-border">
      <div className="shell py-14 md:py-24">
        <p className="label-mono text-muted-foreground">{label}</p>
        <h1 className="display-xl mt-6 max-w-4xl">{title}</h1>
        {blurb && (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{blurb}</p>
        )}
      </div>
    </section>
  );
}
