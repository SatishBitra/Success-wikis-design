import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Mic2,
  Rocket,
  ShieldCheck,
  Theater,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/sw/page-shell";
import { images } from "@/lib/content";
import { cn } from "@/lib/utils";
import card1Image from "@/assets/6108688c-b63b-4d09-bd2b-581d628c690b.jpeg";
import card2Image from "@/assets/34a74818-eece-4f9c-8bae-82f97f14a850 (1).jpeg";
import card3Image from "@/assets/e53a21dc-5b6b-498f-b3f6-ef6003f2be8a.jpeg";

type TrackKey = "purpose" | "stage" | "unfiltered";

export const Route = createFileRoute("/get-featured")({
  validateSearch: (search: Record<string, unknown>): { track?: TrackKey } => {
    return {
      track: typeof search.track === "string" ? (search.track as TrackKey) : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Get Featured — Success Wikis" },
      {
        name: "description",
        content:
          "Be a part of Success Wikis. Submit your founder story through Driven by Purpose, Stage Behind the Story, or Founders Unfiltered.",
      },
      { property: "og:title", content: "Get Featured — Success Wikis" },
      {
        property: "og:description",
        content: "Share your founder journey with 10K+ monthly readers.",
      },
    ],
  }),
  component: GetFeaturedPage,
});

const tracks = [
  {
    key: "purpose" as TrackKey,
    title: "Driven by Purpose",
    eyebrow: "Company Feature",
    heroTag: "Track 01 · Built from Purpose",
    heroQuote: "“Some startups are built from purpose.”",
    heroDetail:
      "Tell your company's story in your way. Submit a complete feature detailing your foundational purpose, milestones, product philosophy, and what makes your startup worth knowing.",
    editorialHighlight:
      "100% Founder-First · Direct Publication after Review · Zero Editorial Paywalls",
    icon: Rocket,
    image: card1Image,
    ctaLabel: "Submit Story & Visuals",
    formHeading: "Driven by Purpose Submission",
    tagline: "Submit a complete company feature detailing your mission, milestones, and journey.",
    description:
      "Tell your company's story in your way. Submit a complete feature detailing your mission, milestones, and what makes your startup worth knowing.",
    steps: ["Contact Info", "Submission Details", "Upload Assets"],
  },
  {
    key: "stage" as TrackKey,
    title: "Stage Behind the Story",
    eyebrow: "Curated Interview",
    heroTag: "Track 02 · Built from Moments Nobody Sees",
    heroQuote: "“Some startups are built from the moments nobody sees.”",
    heroDetail:
      "Behind every founder story is a version nobody sees. Dive into the human side of entrepreneurship: the decisions, struggles, turning points, and moments that shaped your journey.",
    editorialHighlight: "Curated Interview · Deep-Dive Shortlist · Tailored Editorial Profile",
    icon: Theater,
    image: card2Image,
    ctaLabel: "Apply for Interview",
    formHeading: "Stage Behind the Story Application",
    tagline: "Dive into the unseen struggles, turning points, and human side of entrepreneurship.",
    description:
      "Dive into the human side of entrepreneurship: the decisions, struggles, turning points, and moments that shaped your journey.",
    steps: ["Contact Info", "Interest Form"],
  },
  {
    key: "unfiltered" as TrackKey,
    title: "Founders Unfiltered",
    eyebrow: "Rapid-Fire Q&A",
    heroTag: "Track 03 · Built from Chaos",
    heroQuote: "“Some startups are built from chaos.”",
    heroDetail:
      "Raw answers. Real founders. Minimal edits. Answer 11 direct, unfiltered questions in your own voice, published with zero PR censorship or corporate filters.",
    editorialHighlight: "Zero PR Alterations · 100% Raw Founder Voice · Rapid-Fire Authenticity",
    icon: Mic2,
    image: card3Image,
    ctaLabel: "Start Rapid Q&A",
    formHeading: "Founders Unfiltered Rapid Q&A",
    tagline: "A raw, minimal-edit Q&A series where founders answer direct questions.",
    description:
      "A rapid-fire, raw Q&A series where founders answer direct questions in their own voice with minimal edits.",
    steps: ["Contact Info", "Founder Questions"],
  },
];

const countryCodes = [
  { code: "+91", label: "+91 (India)" },
  { code: "+1", label: "+1 (USA/Canada)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+65", label: "+65 (Singapore)" },
  { code: "+49", label: "+49 (Germany)" },
  { code: "+33", label: "+33 (France)" },
  { code: "+971", label: "+971 (UAE)" },
  { code: "+61", label: "+61 (Australia)" },
  { code: "+81", label: "+81 (Japan)" },
];

const unfilteredQuestions = [
  "What was the lowest point before traction?",
  "What is one belief your competitors would disagree with?",
  "The single mistake that cost you the most time or money?",
  "What did you sacrifice that you still think about?",
  "When did you realize you weren't crazy, and the idea actually worked?",
  "What is the most unglamorous part of your daily routine?",
  "What advice would you immediately tell a first-time founder to ignore?",
  "How do you handle payroll anxiety or near-death cash moments?",
  "What keeps you building when the initial motivation fades?",
  "Who was the first person to believe in you when nobody else did?",
  "If your company vanished tomorrow, what would you build next?",
];

function GetFeaturedPage() {
  const search = useSearch({ from: "/get-featured" });
  const [selectedTrack, setSelectedTrack] = useState<TrackKey | null>(search.track ?? null);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Common Contact Info State
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    role: "",
    workEmail: "",
    countryCode: "+91",
    phone: "",
    company: "",
    companyWebsite: "",
    companyLinkedIn: "",
    companyEmail: "",
  });

  // OTP Verification Logic integrated into work email
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSending, setVerificationSending] = useState(false);

  // Track 1: Driven by Purpose State
  const [purposeData, setPurposeData] = useState({
    headline: "",
    mission: "",
    milestones: "",
    fullStory: "",
    logoAttached: false,
    portraitAttached: false,
  });

  // Track 2: Stage Behind the Story State (the 4 exact questions from Screenshot 5)
  const [stageAnswers, setStageAnswers] = useState({
    oneSentence: "",
    beliefOrExperience: "",
    rarelyAsked: "",
    whyBelongs: "",
  });

  // Track 3: Founders Unfiltered State (11 questions)
  const [unfilteredAnswers, setUnfilteredAnswers] = useState<Record<number, string>>({});

  const activeTrackObj = tracks.find((t) => t.key === selectedTrack);

  const handleSelectTrack = (track: TrackKey) => {
    setSelectedTrack(track);
    setStep(1);
    setIsSubmitted(false);
    window.scrollTo({ top: window.innerHeight * 0.45, behavior: "smooth" });
  };

  const handleBackToOptions = () => {
    setSelectedTrack(null);
    setStep(1);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendOtp = () => {
    if (!contact.workEmail || !contact.workEmail.includes("@")) {
      toast.error("Please enter a valid work email address");
      return;
    }
    setVerificationSending(true);
    setTimeout(() => {
      setVerificationSending(false);
      setOtpSent(true);
      toast.success(`OTP code sent to ${contact.workEmail}`);
    }, 700);
  };

  const handleVerifyOtp = () => {
    if (!otpCode || otpCode.length < 4) {
      toast.error("Please enter the verification code");
      return;
    }
    setEmailVerified(true);
    toast.success("Work email verified successfully!");
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.firstName || !contact.role || !contact.workEmail || !contact.company) {
      toast.error("Please complete all required fields marked with *");
      return;
    }
    setStep((prev) => prev + 1);
    window.scrollTo({ top: window.innerHeight * 0.45, behavior: "smooth" });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("Application submitted successfully!");
    window.scrollTo({ top: window.innerHeight * 0.4, behavior: "smooth" });
  };

  return (
    <PageShell>
      {/* Hero Section: Half-height with black background */}
      <section className="relative flex min-h-[48vh] items-center overflow-hidden bg-ink py-12 text-ink-foreground md:min-h-[50vh] md:py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 size-80 rounded-full bg-accent/5 blur-[90px]" />

        <div className="shell relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-soft bg-ink-soft/80 px-3.5 py-1 text-xs label-mono text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              GET FEATURED
            </div>

            <h1 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08]">
              Be a part of <span className="text-accent">SuccessWikis!</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-foreground/80 md:text-lg">
              Every startup has a story. Some are built from purpose, some from chaos, and some from
              the moments nobody sees. Choose how you&apos;d like to be featured on SuccessWikis.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-ink-soft/80 pt-6 text-xs label-mono text-ink-foreground/60">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                <span>10K+ Monthly Readers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                <span>100% Founder-First</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                <span>Zero Editorial Paywalls</span>
              </div>
            </div>
          </div>

          {/* Hero Section Image: Hidden for mobile and tablet responsive; text content removed for desktop */}
          <div className="hidden lg:block relative mx-auto w-full max-w-[480px]">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-ink-soft shadow-2xl">
              <img
                src={images.storyFeatured}
                alt="Founders working together"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-y bg-background">
        <div className="shell">
          {!selectedTrack ? (
            /* 1. 3 CARDS OVERVIEW: Images + concise text + rounded black button */
            <div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="label-mono text-muted-foreground">Select your pathway</p>
                  <h2 className="heading-lg mt-2">Three distinct ways to be featured</h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Choose a format that matches where your journey is right now. Each pathway offers
                  a bespoke editorial treatment.
                </p>
              </div>

              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {tracks.map((track) => (
                  <div
                    key={track.key}
                    onClick={() => handleSelectTrack(track.key)}
                    className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-s2 transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/30 hover:shadow-s3 cursor-pointer"
                  >
                    <div>
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                        <img
                          src={track.image}
                          alt={track.title}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* Eyebrow */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="label-mono text-xs text-muted-foreground">
                          {track.eyebrow}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-foreground">
                        {track.title}
                      </h3>

                      {/* Minimal, concise copy (major text removed) */}
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {track.description}
                      </p>
                    </div>

                    {/* Rounded Solid Black Button */}
                    <div className="mt-6 pt-2">
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 px-5 text-sm font-medium text-primary-foreground shadow-s1 transition-all duration-300 hover:bg-accent hover:text-accent-foreground active:scale-[0.98]"
                      >
                        <span>{track.ctaLabel}</span>
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* 2. FORM PAGES: Split Layout without standalone Back CTA or bottom badges */
            <div className="space-y-6">
              {isSubmitted ? (
                /* Application Received Confirmation */
                <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-s2">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <CheckCircle2 className="size-10 text-accent-foreground" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                    Application Received!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Thank you, {contact.firstName || "founder"}. Our editorial team has received
                    your submission for <strong>{activeTrackObj?.title}</strong> and will follow up
                    at <strong>{contact.workEmail || "your email"}</strong> within 2-3 business
                    days.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleBackToOptions}
                      className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Choose Another Track
                    </button>
                    <Link
                      to="/stories"
                      className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Explore Stories
                    </Link>
                  </div>
                </div>
              ) : (
                /* Split Container matching reference images */
                <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-s3 lg:grid-cols-[1fr_1.9fr]">
                  {/* LEFT SIDE: Patterned dark background, big clean title, no badges */}
                  <div className="relative flex flex-col justify-between overflow-hidden bg-ink p-8 text-white sm:p-10 lg:p-12">
                    {/* Typographic pattern backdrop */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.06] select-none text-[0.6875rem] font-mono leading-loose tracking-widest break-all p-6 text-white"
                      aria-hidden="true"
                    >
                      अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल
                      व श ष स ह अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब
                      भ म य र ल व श ष स ह अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द
                      ध न प फ ब भ म य र ल व श ष स ह
                    </div>

                    <div className="relative z-10">
                      {/* Integrated Track Changer Link */}
                      <button
                        type="button"
                        onClick={handleBackToOptions}
                        className="inline-flex items-center gap-1.5 text-xs label-mono text-accent hover:text-white transition-colors"
                      >
                        <ArrowLeft className="size-3.5" />
                        All Pathways
                      </button>

                      <div className="mt-6">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs label-mono text-accent backdrop-blur-sm">
                          <span className="size-1.5 rounded-full bg-accent" />
                          {activeTrackObj?.heroTag}
                        </span>
                      </div>

                      {/* Large Bold Title */}
                      <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {activeTrackObj?.title}
                      </h2>

                      {/* Hero Section Quote Alignment */}
                      <p className="mt-4 text-base italic font-serif text-accent/90">
                        {activeTrackObj?.heroQuote}
                      </p>

                      <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-sm">
                        {activeTrackObj?.heroDetail}
                      </p>
                    </div>

                    {/* Left footer note aligned with hero metrics */}
                    <div className="relative z-10 pt-8 text-xs text-white/60 border-t border-white/10 mt-10">
                      <p className="font-semibold text-white/90">
                        {activeTrackObj?.editorialHighlight}
                      </p>
                      <p className="mt-1 text-[0.6875rem] text-white/50">
                        Curated for 10K+ monthly founder readers on SuccessWikis.
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Form with integrated OTP verification in work email */}
                  <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
                    {/* Stepper Header */}
                    <div className="mb-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                            {activeTrackObj?.formHeading}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {activeTrackObj?.tagline}
                          </p>
                        </div>
                        <span className="label-mono text-xs text-muted-foreground">
                          Step {step} of {activeTrackObj?.steps.length}
                        </span>
                      </div>

                      {/* Step Progress Line */}
                      <div className="mt-6 flex items-center gap-2">
                        {activeTrackObj?.steps.map((stName, idx) => {
                          const sNum = idx + 1;
                          const isCur = step === sNum;
                          const isDone = step > sNum;
                          return (
                            <div key={stName} className="flex-1">
                              <div
                                className={cn(
                                  "h-1.5 w-full rounded-full transition-all duration-300",
                                  isCur ? "bg-primary" : isDone ? "bg-accent" : "bg-border",
                                )}
                              />
                              <p
                                className={cn(
                                  "mt-2 label-mono text-[0.625rem]",
                                  isCur ? "font-semibold text-foreground" : "text-muted-foreground",
                                )}
                              >
                                {sNum}. {stName}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ============================================================== */}
                    {/* STEP 1: Contact Information with Integrated OTP in Work Email  */}
                    {/* ============================================================== */}
                    {step === 1 && (
                      <form onSubmit={handleNextStep} className="space-y-5">
                        <div className="border-b border-border/70 pb-3">
                          <h4 className="text-sm font-semibold text-foreground">
                            Contact Information
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Please provide correct details so our editorial team can follow up with
                            you.
                          </p>
                        </div>

                        {/* Row 1: Name fields */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              First Name <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={contact.firstName}
                              onChange={(e) =>
                                setContact({ ...contact, firstName: e.target.value })
                              }
                              placeholder="e.g. Arjun"
                              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Last Name <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={contact.lastName}
                              onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                              placeholder="e.g. Sharma"
                              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>
                        </div>

                        {/* Row 2: Work Email with Integrated OTP Verification */}
                        <div>
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-medium text-foreground">
                              Work Email <span className="text-destructive">*</span>
                            </label>
                            {emailVerified ? (
                              <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-emerald-600">
                                <CheckCircle2 className="size-3.5" /> Email Verified
                              </span>
                            ) : otpSent ? (
                              <span className="text-[0.6875rem] text-accent-foreground font-medium">
                                OTP Code Sent
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-1.5 flex h-11 w-full rounded-xl border border-border bg-background transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden">
                            <input
                              type="email"
                              required
                              disabled={emailVerified}
                              value={contact.workEmail}
                              onChange={(e) => {
                                setContact({ ...contact, workEmail: e.target.value });
                                if (otpSent && !emailVerified) setOtpSent(false);
                              }}
                              placeholder="arjun@company.com"
                              className="h-full flex-1 bg-transparent px-3.5 text-sm outline-none placeholder:text-muted-foreground/50 disabled:opacity-70"
                            />

                            {!emailVerified ? (
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={verificationSending || !contact.workEmail}
                                className="h-full border-l border-border bg-muted/40 px-3.5 text-xs font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50 shrink-0"
                              >
                                {verificationSending
                                  ? "Sending..."
                                  : otpSent
                                    ? "Resend OTP"
                                    : "Send OTP"}
                              </button>
                            ) : (
                              <div className="flex items-center px-3.5 border-l border-border bg-emerald-500/10 text-emerald-600 text-xs font-medium gap-1 shrink-0">
                                <ShieldCheck className="size-4" />
                                Verified
                              </div>
                            )}
                          </div>

                          {/* Inline OTP Verification Box */}
                          {otpSent && !emailVerified && (
                            <div className="mt-2.5 flex flex-wrap items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 p-2.5">
                              <input
                                type="text"
                                maxLength={6}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                className="h-9 w-36 rounded-lg border border-border bg-background px-3 text-xs font-mono tracking-widest outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                              />
                              <button
                                type="button"
                                onClick={handleVerifyOtp}
                                className="h-9 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                Verify OTP
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setOtpCode("542901");
                                  setEmailVerified(true);
                                  toast.success("Work email verified successfully!");
                                }}
                                className="text-[0.6875rem] text-muted-foreground hover:text-foreground underline ml-auto"
                              >
                                Auto-fill demo (542901)
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Row 3: Combined Country Code + Phone Number in ONE field, paired with Company */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          {/* Combined Phone Field */}
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Phone number <span className="text-destructive">*</span>
                            </label>
                            <div className="mt-1.5 flex h-11 w-full rounded-xl border border-border bg-background transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden">
                              <select
                                value={contact.countryCode}
                                onChange={(e) =>
                                  setContact({ ...contact, countryCode: e.target.value })
                                }
                                aria-label="Country Code"
                                className="h-full border-r border-border bg-transparent px-2.5 text-xs sm:text-sm font-medium outline-none cursor-pointer text-foreground shrink-0"
                              >
                                {countryCodes.map((c) => (
                                  <option key={c.code} value={c.code}>
                                    {c.code}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="tel"
                                required
                                value={contact.phone}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                placeholder="98765 43210"
                                className="h-full flex-1 bg-transparent px-3.5 text-sm outline-none placeholder:text-muted-foreground/50"
                              />
                            </div>
                          </div>

                          {/* Company Field */}
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Company <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={contact.company}
                              onChange={(e) => setContact({ ...contact, company: e.target.value })}
                              placeholder="The Mosol9"
                              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>
                        </div>

                        {/* Row 4: Role & Website */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Role / Designation <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={contact.role}
                              onChange={(e) => setContact({ ...contact, role: e.target.value })}
                              placeholder="e.g. Founder, CEO"
                              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Company Website
                            </label>
                            <input
                              type="url"
                              value={contact.companyWebsite}
                              onChange={(e) =>
                                setContact({ ...contact, companyWebsite: e.target.value })
                              }
                              placeholder="https://example.com"
                              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>
                        </div>

                        {/* Row 5: LinkedIn & General Email */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Company LinkedIn
                            </label>
                            <input
                              type="url"
                              value={contact.companyLinkedIn}
                              onChange={(e) =>
                                setContact({ ...contact, companyLinkedIn: e.target.value })
                              }
                              placeholder="https://linkedin.com/company/..."
                              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Company General Email
                            </label>
                            <input
                              type="email"
                              value={contact.companyEmail}
                              onChange={(e) =>
                                setContact({ ...contact, companyEmail: e.target.value })
                              }
                              placeholder="contact@company.com"
                              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>
                        </div>

                        {/* Step 1 Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-6">
                          <p className="text-xs text-muted-foreground">
                            By continuing you agree to our{" "}
                            <span className="underline hover:text-foreground cursor-pointer">
                              terms of service
                            </span>{" "}
                            and{" "}
                            <span className="underline hover:text-foreground cursor-pointer">
                              privacy policy
                            </span>
                            .
                          </p>

                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-s2 transition-all duration-300 hover:bg-accent hover:text-accent-foreground active:scale-95"
                          >
                            <span>Next Step</span>
                            <ChevronRight className="size-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {/* ============================================================== */}
                    {/* TRACK 1: Driven by Purpose -> Step 2 (Submission Details)     */}
                    {/* ============================================================== */}
                    {selectedTrack === "purpose" && step === 2 && (
                      <form onSubmit={handleNextStep} className="space-y-5">
                        <div className="border-b border-border/70 pb-3">
                          <span className="label-mono text-[0.625rem] text-accent-foreground font-semibold">
                            Track 01 · Built from Purpose
                          </span>
                          <h4 className="text-sm font-semibold text-foreground mt-1">
                            Mission, Milestones &amp; Narrative
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Some startups are built from purpose. Tell your company&apos;s story in
                            your way — detailing your core problem, customer breakthrough, and
                            milestones.
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-foreground">
                            Story Headline / One-Liner <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={purposeData.headline}
                            onChange={(e) =>
                              setPurposeData({ ...purposeData, headline: e.target.value })
                            }
                            placeholder="e.g. How we scaled sustainable hand-weaving from ₹5,000 to global retail"
                            className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Company Mission &amp; Purpose{" "}
                              <span className="text-destructive">*</span>
                            </label>
                            <textarea
                              rows={4}
                              required
                              value={purposeData.mission}
                              onChange={(e) =>
                                setPurposeData({ ...purposeData, mission: e.target.value })
                              }
                              placeholder="Describe the fundamental problem you solve and your core philosophy..."
                              className="mt-1.5 w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-foreground">
                              Key Milestones &amp; Turning Points{" "}
                              <span className="text-destructive">*</span>
                            </label>
                            <textarea
                              rows={4}
                              required
                              value={purposeData.milestones}
                              onChange={(e) =>
                                setPurposeData({ ...purposeData, milestones: e.target.value })
                              }
                              placeholder="Detail 2-3 defining milestones, earliest believers, or hurdles overcome..."
                              className="mt-1.5 w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-foreground">
                            Full Narrative: What makes your startup worth knowing?{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            rows={5}
                            required
                            value={purposeData.fullStory}
                            onChange={(e) =>
                              setPurposeData({ ...purposeData, fullStory: e.target.value })
                            }
                            placeholder="Tell your complete feature in your own voice. Our editorial desk will format and polish for publication..."
                            className="mt-1.5 w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                          />
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-6">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="rounded-full border border-border px-6 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-s2 transition-all duration-300 hover:bg-accent hover:text-accent-foreground active:scale-95"
                          >
                            <span>Next: Upload Assets</span>
                            <ChevronRight className="size-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {/* ============================================================== */}
                    {/* TRACK 1: Driven by Purpose -> Step 3 (Upload Assets)          */}
                    {/* ============================================================== */}
                    {selectedTrack === "purpose" && step === 3 && (
                      <form onSubmit={handleFinalSubmit} className="space-y-6">
                        <div className="border-b border-border/70 pb-3">
                          <h4 className="text-sm font-semibold text-foreground">Upload Assets</h4>
                          <p className="text-xs text-muted-foreground">
                            Attach high-resolution logos, screenshots &amp; founder assets to
                            accompany your story.
                          </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {/* Logo Box */}
                          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-6 text-center transition-colors hover:border-primary/50">
                            <Upload className="size-6 text-muted-foreground" />
                            <p className="mt-2 text-xs font-semibold text-foreground">
                              Company Logo (SVG, PNG)
                            </p>
                            <p className="text-[0.6875rem] text-muted-foreground">
                              Transparent background preferred
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setPurposeData({ ...purposeData, logoAttached: true });
                                toast.success("Logo attached");
                              }}
                              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:bg-muted"
                            >
                              {purposeData.logoAttached ? (
                                <span className="flex items-center gap-1 text-emerald-600">
                                  <Check className="size-3" /> Attached
                                </span>
                              ) : (
                                "Choose File"
                              )}
                            </button>
                          </div>

                          {/* Portrait Box */}
                          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-6 text-center transition-colors hover:border-primary/50">
                            <Upload className="size-6 text-muted-foreground" />
                            <p className="mt-2 text-xs font-semibold text-foreground">
                              Founder Portrait Photo
                            </p>
                            <p className="text-[0.6875rem] text-muted-foreground">
                              Min 1200×1200px portrait
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setPurposeData({ ...purposeData, portraitAttached: true });
                                toast.success("Founder portrait attached");
                              }}
                              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:bg-muted"
                            >
                              {purposeData.portraitAttached ? (
                                <span className="flex items-center gap-1 text-emerald-600">
                                  <Check className="size-3" /> Attached
                                </span>
                              ) : (
                                "Choose File"
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-background-soft p-4">
                          <p className="text-xs font-semibold text-foreground">
                            Direct Publication After Editorial Review
                          </p>
                          <p className="mt-1 text-[0.6875rem] leading-relaxed text-muted-foreground">
                            Once reviewed and approved by our team, your feature will be published
                            to the Driven by Purpose section on SuccessWikis. No editorial fees.
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-6">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="rounded-full border border-border px-6 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-s2 transition-all duration-300 hover:bg-accent hover:text-accent-foreground active:scale-95"
                          >
                            <span>Submit Feature Application</span>
                            <Check className="size-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {/* ============================================================== */}
                    {/* TRACK 2: Stage Behind the Story -> Step 2 (Screenshot 5)       */}
                    {/* ============================================================== */}
                    {selectedTrack === "stage" && step === 2 && (
                      <form onSubmit={handleFinalSubmit} className="space-y-5">
                        <div className="border-b border-border/70 pb-3">
                          <span className="label-mono text-[0.625rem] text-accent-foreground font-semibold">
                            Track 02 · Built from Moments Nobody Sees
                          </span>
                          <h4 className="text-sm font-semibold text-foreground mt-1">
                            The Unseen Turning Points (Interest Form)
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Behind every founder story is a version nobody sees. Help us unpack the
                            decisions, struggles, and quiet turning points.
                          </p>
                        </div>

                        {/* Question 1 from Screenshot 5 */}
                        <div>
                          <label className="block text-xs font-medium text-foreground">
                            Tell us about your startup in one sentence{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            rows={2}
                            required
                            value={stageAnswers.oneSentence}
                            onChange={(e) =>
                              setStageAnswers({ ...stageAnswers, oneSentence: e.target.value })
                            }
                            placeholder="e.g. We build autonomous solar cold-storage for smallholder farmers across South Asia."
                            className="mt-1.5 w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                          />
                        </div>

                        {/* Question 2 from Screenshot 5 */}
                        <div>
                          <label className="block text-xs font-medium text-foreground">
                            What belief or experience pushed you into solving this problem?{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={stageAnswers.beliefOrExperience}
                            onChange={(e) =>
                              setStageAnswers({
                                ...stageAnswers,
                                beliefOrExperience: e.target.value,
                              })
                            }
                            placeholder="The catalyst moment, personal frustration, or breakdown that made this inevitable..."
                            className="mt-1.5 w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                          />
                        </div>

                        {/* Question 3 from Screenshot 5 */}
                        <div>
                          <label className="block text-xs font-medium text-foreground">
                            What part of your story do people rarely ask about?{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={stageAnswers.rarelyAsked}
                            onChange={(e) =>
                              setStageAnswers({ ...stageAnswers, rarelyAsked: e.target.value })
                            }
                            placeholder="The emotional toll, the quiet compromises, or the unglamorous months of near-zero traction..."
                            className="mt-1.5 w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                          />
                        </div>

                        {/* Question 4 from Screenshot 5 */}
                        <div>
                          <label className="block text-xs font-medium text-foreground">
                            Why do you think your story belongs on Stage Behind the Story?{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={stageAnswers.whyBelongs}
                            onChange={(e) =>
                              setStageAnswers({ ...stageAnswers, whyBelongs: e.target.value })
                            }
                            placeholder="What truth will other founders learn from your unvarnished experience?"
                            className="mt-1.5 w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                          />
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-6">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="rounded-full border border-border px-6 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-s2 transition-all duration-300 hover:bg-accent hover:text-accent-foreground active:scale-95"
                          >
                            <span>Submit Application</span>
                            <Check className="size-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {/* ============================================================== */}
                    {/* TRACK 3: Founders Unfiltered -> Step 2 (11 Questions)         */}
                    {/* ============================================================== */}
                    {selectedTrack === "unfiltered" && step === 2 && (
                      <form onSubmit={handleFinalSubmit} className="space-y-6">
                        <div className="flex items-center justify-between border-b border-border/70 pb-3">
                          <div>
                            <span className="label-mono text-[0.625rem] text-accent-foreground font-semibold">
                              Track 03 · Built from Chaos
                            </span>
                            <h4 className="text-sm font-semibold text-foreground mt-1">
                              11 Raw Founder Questions
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Some startups are built from chaos. Answer in your authentic voice
                              with zero PR filters or alterations.
                            </p>
                          </div>
                          <span className="label-mono text-xs font-semibold text-accent-foreground bg-accent/20 px-2.5 py-1 rounded-full">
                            {Object.values(unfilteredAnswers).filter(Boolean).length} / 11 answered
                          </span>
                        </div>

                        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">
                          {unfilteredQuestions.map((q, idx) => (
                            <div
                              key={q}
                              className="rounded-2xl border border-border bg-background p-4 transition-colors hover:border-foreground/30"
                            >
                              <label className="block text-xs font-medium text-foreground">
                                <span className="label-mono mr-2 font-bold text-accent-foreground">
                                  Q{idx + 1}.
                                </span>
                                {q}
                              </label>
                              <textarea
                                rows={2}
                                value={unfilteredAnswers[idx] || ""}
                                onChange={(e) =>
                                  setUnfilteredAnswers({
                                    ...unfilteredAnswers,
                                    [idx]: e.target.value,
                                  })
                                }
                                placeholder="Your unfiltered, spontaneous response..."
                                className="mt-2 w-full rounded-xl border border-border bg-background-soft p-3 text-sm outline-none transition-colors focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-6">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="rounded-full border border-border px-6 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-s2 transition-all duration-300 hover:bg-accent hover:text-accent-foreground active:scale-95"
                          >
                            <span>Submit Rapid Q&amp;A</span>
                            <Check className="size-4" />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
