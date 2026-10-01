import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  Copy,
  Heart,
  MessageSquare,
  Quote,
  Send,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/sw/page-shell";
import { StoryCard } from "@/components/sw/story-card";
import { Newsletter } from "@/components/sw/newsletter";
import { stories, storyBySlug } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = storyBySlug(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Story not found — Success Wikis" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { story } = loaderData;
    return {
      meta: [
        { title: `${story.title} — Success Wikis` },
        { name: "description", content: story.dek },
        { property: "og:title", content: story.title },
        { property: "og:description", content: story.dek },
      ],
    };
  },
  notFoundComponent: StoryNotFound,
  component: StoryPage,
});

function StoryNotFound() {
  return (
    <PageShell>
      <div className="shell section-y">
        <h1 className="heading-lg">We couldn&apos;t find that story.</h1>
        <Link to="/stories" className="label-mono mt-6 inline-flex items-center gap-2">
          <ArrowLeft className="size-3" /> All stories
        </Link>
      </div>
    </PageShell>
  );
}

interface CommentItem {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  date: string;
  content: string;
  likes: number;
  isLiked?: boolean;
}

function StoryPage() {
  const { story } = Route.useLoaderData();
  const related = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  // Likes state
  const [likeCount, setLikeCount] = useState(148);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: "c-1",
      name: "Siddharth Rao",
      role: "Seed Founder, B2B SaaS",
      avatarColor: "bg-amber-500",
      date: "2 days ago",
      content:
        "The honesty about the first two years is refreshing. So many narratives skip the grinding months where you simply solve for Friday and then the Friday after that.",
      likes: 19,
      isLiked: false,
    },
    {
      id: "c-2",
      name: "Pooja Deshmukh",
      role: "Operator & Angel Investor",
      avatarColor: "bg-emerald-600",
      date: "Yesterday",
      content:
        "That turning point decision under extreme cash constraint was pivotal. True founder grit documented without the standard PR filter.",
      likes: 12,
      isLiked: false,
    },
  ]);

  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleToggleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      toast.success("Thank you for liking this story!");
    }
  };

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      if (next) {
        toast.success("Story saved to your reading list");
      }
      return next;
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Story link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`"${story.title}" on Success Wikis`);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${story.title} - ${url}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  const handleCommentLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextLiked = !c.isLiked;
          return {
            ...c,
            isLiked: nextLiked,
            likes: nextLiked ? c.likes + 1 : c.likes - 1,
          };
        }
        return c;
      }),
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Please enter your comment thoughts");
      return;
    }

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      name: authorName.trim() || "Anonymous Builder",
      role: authorRole.trim() || "Founder / Reader",
      avatarColor: "bg-primary",
      date: "Just now",
      content: commentText.trim(),
      likes: 0,
      isLiked: false,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    setAuthorName("");
    setAuthorRole("");
    toast.success("Comment published successfully!");
  };

  return (
    <PageShell>
      <article className="pb-16 md:pb-24">
        {/* Header Section with Fixed Content Alignment */}
        <header className="shell pt-10 pb-8 md:pt-16 md:pb-12">
          <div className="mx-auto max-w-3xl">
            {/* Back to stories breadcrumb */}
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-xs label-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> All Stories
            </Link>

            {/* Category tag */}
            <div className="mt-6 flex items-center gap-2.5">
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs label-mono text-accent-foreground font-semibold">
                {story.category}
              </span>
              <span className="text-xs text-muted-foreground label-mono">·</span>
              <span className="text-xs text-muted-foreground label-mono flex items-center gap-1.5">
                <Clock3 className="size-3" /> {story.readTime}
              </span>
            </div>

            {/* Title with balanced measure and line-height */}
            <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.12]">
              {story.title}
            </h1>

            {/* Dek / Subtitle */}
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {story.dek}
            </p>

            {/* Author Profile Row */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-ink text-white font-medium text-sm">
                  {story.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {story.author}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{story.role}</p>
                </div>
              </div>

              <span className="label-mono text-xs text-muted-foreground">{story.date}</span>
            </div>
          </div>
        </header>

        {/* Featured Editorial Photo */}
        <div className="shell pb-10 md:pb-14">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border shadow-s2 md:rounded-3xl">
            <img
              src={story.image}
              alt={story.title}
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* Reading Content with Proper Visual & Typographic Alignment */}
        <div className="shell">
          <div className="mx-auto max-w-3xl">
            {/* Lead paragraphs */}
            {story.body.slice(0, 2).map((p, idx) => (
              <p
                key={p}
                className={cn(
                  "mb-6 text-base leading-[1.8] text-foreground/90 md:text-lg",
                  idx === 0 && "text-lg md:text-xl font-normal leading-[1.75] text-foreground",
                )}
              >
                {p}
              </p>
            ))}

            {/* In-column Pullquote (No negative margin blowout, properly boxed) */}
            <blockquote className="my-10 rounded-2xl border-l-4 border-accent bg-accent/5 p-6 sm:p-8">
              <Quote className="size-6 text-accent mb-2 opacity-80" />
              <p className="text-xl sm:text-2xl font-serif italic text-foreground leading-snug">
                “{story.pullQuote}”
              </p>
              <footer className="mt-4 label-mono text-xs text-muted-foreground">
                — {story.author}, <span className="text-foreground/80">{story.role}</span>
              </footer>
            </blockquote>

            {/* Remaining story paragraphs */}
            {story.body.slice(2).map((p) => (
              <p key={p} className="mb-6 text-base leading-[1.8] text-foreground/90 md:text-lg">
                {p}
              </p>
            ))}

            {/* ============================================================== */}
            {/* DOWNSIDE SECTION: Likes, Social Media Links, Shareable Feature */}
            {/* ============================================================== */}
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-2xl border border-border bg-card p-5 shadow-s1">
                {/* Likes & Save Actions */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleToggleLike}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95",
                      isLiked
                        ? "border-rose-500/40 bg-rose-500/10 text-rose-500"
                        : "border-border bg-background text-foreground hover:bg-muted",
                    )}
                  >
                    <Heart
                      className={cn(
                        "size-4 transition-transform",
                        isLiked && "fill-current scale-110",
                      )}
                    />
                    <span>{likeCount} Likes</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleBookmark}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95",
                      isBookmarked
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-600"
                        : "border-border bg-background text-foreground hover:bg-muted",
                    )}
                  >
                    <Bookmark
                      className={cn("size-4 transition-transform", isBookmarked && "fill-current")}
                    />
                    <span>{isBookmarked ? "Saved" : "Save"}</span>
                  </button>
                </div>

                {/* Social Media & Sharable Feature */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs label-mono text-muted-foreground mr-1 flex items-center gap-1">
                    <Share2 className="size-3.5" /> Share:
                  </span>

                  {/* Copy Link Button */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    title="Copy Link"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {copied ? (
                      <Check className="size-3 text-emerald-600" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>

                  {/* Twitter / X */}
                  <button
                    type="button"
                    onClick={handleShareTwitter}
                    title="Share on X / Twitter"
                    className="inline-flex items-center justify-center size-8 rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                  >
                    <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>

                  {/* LinkedIn */}
                  <button
                    type="button"
                    onClick={handleShareLinkedIn}
                    title="Share on LinkedIn"
                    className="inline-flex items-center justify-center size-8 rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                  >
                    <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.78a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                    </svg>
                  </button>

                  {/* WhatsApp */}
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    title="Share on WhatsApp"
                    className="inline-flex items-center justify-center size-8 rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                  >
                    <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.09-1.1l-.29-.17-3.05.8 1.01-2.97-.19-.31a8.21 8.21 0 0 1-1.26-4.49c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Founder Get Featured Promo banner */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-ink p-6 text-white">
                <div>
                  <span className="label-mono text-[0.625rem] text-accent font-semibold uppercase tracking-wider">
                    Be a part of SuccessWikis
                  </span>
                  <p className="mt-1 text-base font-medium">Have an unvarnished founder journey?</p>
                  <p className="mt-0.5 text-xs text-white/70">
                    Submit through Driven by Purpose, Stage Behind the Story, or Founders
                    Unfiltered.
                  </p>
                </div>
                <Link
                  to="/get-featured"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-accent-foreground hover:bg-white transition-colors shrink-0"
                >
                  <span>Get Featured</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>

              {/* ============================================================== */}
              {/* DOWNSIDE SECTION: Comments Feature                             */}
              {/* ============================================================== */}
              <div className="mt-12">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="size-5 text-primary" />
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      Comments ({comments.length})
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground label-mono">
                    Join the founder conversation
                  </span>
                </div>

                {/* Add Comment Form */}
                <form
                  onSubmit={handleAddComment}
                  className="mt-6 space-y-3.5 rounded-2xl border border-border bg-card p-5 shadow-s1"
                >
                  <p className="text-xs font-semibold text-foreground">
                    Leave a thought or takeaway
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Your Name (e.g. Maya Iyer)"
                      className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60"
                    />
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="Role (e.g. Founder, Growth Lead)"
                      className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60"
                    />
                  </div>

                  <textarea
                    rows={3}
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share what resonated with you from this founder journey..."
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60"
                  />

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground shadow-s1 transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
                    >
                      <span>Post Comment</span>
                      <Send className="size-3.5" />
                    </button>
                  </div>
                </form>

                {/* Comments Stream */}
                <div className="mt-6 space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-2xl border border-border bg-background p-4 sm:p-5 transition-colors hover:border-foreground/20"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex size-8 items-center justify-center rounded-full text-white font-medium text-xs",
                              comment.avatarColor,
                            )}
                          >
                            {comment.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-foreground leading-none">
                              {comment.name}
                            </p>
                            <p className="text-[0.6875rem] text-muted-foreground mt-0.5">
                              {comment.role}
                            </p>
                          </div>
                        </div>

                        <span className="text-[0.6875rem] text-muted-foreground label-mono">
                          {comment.date}
                        </span>
                      </div>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground/90">
                        {comment.content}
                      </p>

                      <div className="mt-3 flex items-center justify-end gap-2 border-t border-border/60 pt-2.5">
                        <button
                          type="button"
                          onClick={() => handleCommentLike(comment.id)}
                          className={cn(
                            "inline-flex items-center gap-1 text-[0.6875rem] font-medium transition-colors",
                            comment.isLiked
                              ? "text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <ThumbsUp className={cn("size-3", comment.isLiked && "fill-current")} />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* What happened next? (Related Stories) */}
      <section className="section-y border-t border-border bg-background">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-mono text-xs text-muted-foreground">More Founder Journeys</p>
              <h2 className="heading-lg mt-1">What happened next?</h2>
            </div>
            <Link
              to="/stories"
              className="label-mono flex items-center gap-1.5 text-sm font-medium hover:text-accent-foreground"
            >
              All stories <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {related.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
