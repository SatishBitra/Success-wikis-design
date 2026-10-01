import { cn } from "@/lib/utils";

export const podcastPlatforms = [
  {
    name: "Spotify",
    href: "https://open.spotify.com",
    icon: (
      <svg className="size-4 shrink-0 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.218.358-.682.472-1.04.254-2.853-1.743-6.445-2.138-10.677-1.171-.409.094-.817-.162-.911-.571-.093-.409.162-.817.571-.911 4.636-1.06 8.607-.611 11.803 1.341.358.218.472.682.254 1.058zm1.47-3.264c-.275.447-.86.59-1.307.315-3.266-2.008-8.246-2.59-12.11-1.416-.502.152-1.034-.136-1.186-.638-.152-.502.136-1.034.638-1.186 4.417-1.34 9.907-.692 13.65 1.618.447.275.59.86.315 1.307zm.126-3.41c-3.916-2.326-10.373-2.54-14.108-1.405-.6.183-1.238-.163-1.421-.763-.183-.6.163-1.238.763-1.421 4.298-1.305 11.439-1.053 15.949 1.624.542.322.721 1.025.4 1.567-.322.542-1.025.721-1.583.398z" />
      </svg>
    ),
  },
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com",
    icon: (
      <svg className="size-4 shrink-0 text-[#872EC4]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.887 3.504 8.956 8.125 9.816v-2.045C6.612 18.94 4 15.775 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8c0 3.775-2.612 6.94-6.125 7.771v2.045C18.496 20.956 22 16.887 22 12c0-5.523-4.477-10-10-10zm0 4a6 6 0 0 0-6 6c0 2.825 1.956 5.195 4.594 5.828v-2.148A4.004 4.004 0 0 1 8 12c0-2.206 1.794-4 4-4s4 1.794 4 4c0 1.696-1.06 3.146-2.594 3.68v2.148C16.044 17.195 18 14.825 18 12a6 6 0 0 0-6-6zm0 4a2 2 0 0 0-2 2v4a2 2 0 1 0 4 0v-4a2 2 0 0 0-2-2z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
          fill="#FF0000"
        />
        <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
      </svg>
    ),
  },
];

export function PodcastBadges({ className }: { className?: string }) {
  return (
    <div className={cn("mt-8 flex flex-wrap gap-2.5", className)}>
      {podcastPlatforms.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 transition-colors hover:border-accent hover:bg-accent"
        >
          {p.icon}
          <span>{p.name}</span>
        </a>
      ))}
    </div>
  );
}
