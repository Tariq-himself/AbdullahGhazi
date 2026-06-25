import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring } from "framer-motion";
import heroBg from "@/assets/Images/hero-bg.png";
import futureProtocol from "@/assets/reel/FUTURE PROTOCOL.mp4";
import unlockingArchive from "@/assets/reel/Unlocking the Archive.mp4";
import cityOfTwoContinents from "@/assets/reel/The City of Two Continents-Türkiye .mp4";
import soundsOfIstanbul from "@/assets/reel/Sounds of Istanbul 🇹🇷•••.mp4";
import nightfallExploration from "@/assets/reel/NIGHTFALL Exploration.mp4";
import redSeaOdyssey from "@/assets/reel/Red Sea Odyssey.mp4";
import doorsOfTime from "@/assets/reel/Doors of Time.mp4";
import hueChanges from "@/assets/reel/Hue changes .mp4";
import rhythmInRotation from "@/assets/reel/Rhythm in Rotation.mp4";
import streetShuffles from "@/assets/reel/Street Shuffles.mp4";
import clockLoop from "@/assets/clock-loop.mp4";
import {
  ArrowUpRight,
  Play,
  Mail,
  Maximize2,
  Minimize2,
  X,
  ChevronLeft,
  ChevronRight,
  Instagram,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  component: Home,
});

function GradientHighlight({ children }: { children: React.ReactNode }) {
  return <span className="text-gradient-focal font-extrabold">{children}</span>;
}

function Overline({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`overline ${className ?? ""}`}>{children}</span>;
}

// Scroll-reveal wrapper — premium, subtle fade + rise as content enters view
function Reveal({
  children,
  delay = 0,
  y = 22,
  once = true,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-72px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton({
  children,
  href = "#contact",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-lg bg-accent-end px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--accent-end)]"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function SecondaryButton({
  children,
  href = "#work",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-transparent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/5"
    >
      {children}
    </a>
  );
}

function Nav() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#problem", label: "Approach" },
    { href: "#work", label: "Archive" },
    { href: "#impact", label: "Impact" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      animate={{ y: hidden ? "-150%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-0.5 rounded-full border border-border/60 bg-card/80 px-2 py-1.5 backdrop-blur-xl md:px-3 md:py-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-all duration-200 ease-out hover:bg-white/10 hover:text-foreground focus-visible:bg-white/15 focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.97] active:bg-white/20 md:px-4 md:py-2 md:text-xs md:tracking-[0.15em]"
          >
            {l.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // High-inertia spring — gives all layers a polished, heavy feel
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 24,
    mass: 1.3,
  });

  // Layer 1 · Background — slowest, pre-shifted down at load for initial depth
  const bgY = useTransform(smoothed, [0, 1], ["4%", "15%"]);
  const bgScale = useTransform(smoothed, [0, 1], [1.05, 1.18]);
  const bgOpacity = useTransform(smoothed, [0, 1], [1, 0.5]);

  // Layer 2 · Smoke midground — medium
  const smokeY = useTransform(smoothed, [0, 1], ["2%", "60%"]);
  const smokeOpacity = useTransform(smoothed, [0, 0.85], [1, 0]);

  // Layer 3 · Foreground text — moves UP when scrolling down, faster than the
  // background to create depth separation. Pre-shifted up → settles into place
  // → rises out of view. Viewport units for consistent traversal.
  const fgY = useTransform(smoothed, [0, 0.07, 1], ["-4vh", "0vh", "-170vh"]);
  // translateZ for 3D pop through perspective — swells forward as it exits
  const fgZ = useTransform(smoothed, [0.07, 1], [0, 130]);
  // Reduced fade: text stays fully visible through 75% so depth is always readable
  const fgOpacity = useTransform(smoothed, [0, 0.75, 1], [1, 1, 0]);

  return (
    <section
      ref={heroRef}
      id="top"
      style={{ perspective: "1400px" }}
      className="sticky top-0 z-[1] isolate flex h-screen items-center justify-center overflow-hidden pt-24 md:pt-28"
    >
      {/* ── Layer 1 · Background image (slowest) ────────────── */}
      <motion.img
        src={heroBg}
        alt="Filmmaker in editing studio with camera rig"
        aria-hidden
        className="absolute inset-0 -z-20 h-[130%] w-full -top-[20%] object-cover object-[30%_center] will-change-transform sm:object-[40%_center] lg:object-center"
        style={{
          filter: "brightness(1.15) contrast(1.1) saturate(1.05)",
          y: bgY,
          scale: bgScale,
          opacity: bgOpacity,
        }}
      />

      {/* Legibility scrims */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-background/60 sm:bg-background/55 lg:bg-background/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.12) 38%, rgba(0,0,0,0.58) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 50%, rgba(0,0,0,0.38) 88%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ── Layer 2a · Smoke behind text (z-[5]) ────────────── */}
      {/* mix-blend-mode:screen makes colored blobs glow against the dark bg */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        style={{ y: smokeY, opacity: smokeOpacity, mixBlendMode: "screen" }}
      >
        {/* Orange blob — left */}
        <motion.div
          className="absolute -left-32 top-[12%] h-[520px] w-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.62) 0%, transparent 68%)",
            filter: "blur(72px)",
          }}
          animate={{
            x: [0, 95, -45, 25, 0],
            y: [0, -65, 38, -18, 0],
            scale: [1, 1.22, 0.9, 1.08, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Purple blob — right */}
        <motion.div
          className="absolute -right-24 top-[18%] h-[620px] w-[620px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.58) 0%, transparent 68%)",
            filter: "blur(88px)",
          }}
          animate={{
            x: [0, -72, 42, -22, 0],
            y: [0, 52, -38, 58, 0],
            scale: [1, 0.84, 1.18, 0.96, 1],
          }}
          transition={{ duration: 27, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        {/* Blue blob — bottom center */}
        <motion.div
          className="absolute left-[28%] bottom-[8%] h-[420px] w-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.55) 0%, transparent 68%)",
            filter: "blur(78px)",
          }}
          animate={{
            x: [0, 48, -28, 0],
            y: [0, -42, 62, 0],
            scale: [1, 1.14, 0.84, 1],
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
        {/* Wide horizontal band — center */}
        <motion.div
          className="absolute left-1/2 top-[28%] h-[320px] w-[140%] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.38) 0%, rgba(168,85,247,0.32) 40%, transparent 70%)",
            filter: "blur(58px)",
          }}
          animate={{
            scaleX: [1, 1.35, 0.78, 1.12, 1],
            scaleY: [1, 0.65, 1.25, 0.88, 1],
            opacity: [0.55, 1, 0.38, 0.82, 0.55],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* ── Layer 3 · Foreground text & CTA (fastest) ───────── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center will-change-transform"
        style={{ y: fgY, z: fgZ, opacity: fgOpacity, transformStyle: "preserve-3d" }}
      >
        <motion.span
          className="overline mb-3 block text-amber-400/60"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          Visual Architect & Post-Production Director
        </motion.span>

        <motion.h1
          className="mt-4 text-5xl font-extrabold leading-[1.04] tracking-tighter text-foreground sm:text-6xl md:mt-5 lg:text-[5.5rem]"
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          Cinematic Realities.
          <br />
          <GradientHighlight>Seamless Stories.</GradientHighlight>
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-md text-base leading-[1.55] text-muted-foreground sm:max-w-xl md:mt-6 md:max-w-2xl lg:max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
        >
          Visual architect and post-production director. I build pacing, sound design, and visual
          rhythm that stops the scroll — for brands, founders, and high-profile creators.
        </motion.p>

        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-4 pb-4 md:mt-9 md:pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <PrimaryButton>Start a project</PrimaryButton>
          <SecondaryButton href="#work">
            <Play className="h-3.5 w-3.5 fill-current" />
            View archive
          </SecondaryButton>
        </motion.div>
      </motion.div>

      {/* ── Layer 4 · Smoke above text — weave (z-[15]) ─────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[15] overflow-hidden"
        style={{ y: smokeY, opacity: smokeOpacity, mixBlendMode: "screen" }}
      >
        {/* Horizontal wisp over headline */}
        <motion.div
          className="absolute left-1/2 top-[34%] h-40 w-[95%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 75% 40% at 50% 50%, rgba(168,85,247,0.28) 0%, transparent 70%)",
            filter: "blur(42px)",
          }}
          animate={{
            scaleX: [1, 1.42, 0.72, 1.15, 1],
            opacity: [0.65, 1, 0.32, 0.88, 0.65],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        {/* Right edge wisp */}
        <motion.div
          className="-right-20 absolute top-[38%] h-64 w-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.32) 0%, transparent 65%)",
            filter: "blur(52px)",
          }}
          animate={{ x: [0, -38, 18, 0], opacity: [0.45, 0.85, 0.28, 0.45] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 9 }}
        />
      </motion.div>
    </section>
  );
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────

function Problem() {
  const items = [
    {
      tag: "01 / RETENTION",
      title: "The scroll-stop problem",
      body: "In an era of shrinking attention spans, standard chronological cutting fails. I engineer rhythm, sound design, and intentional pacing to sustain engagement past the 3-second exit.",
    },
    {
      tag: "02 / SCALE",
      title: "Friction at production scale",
      body: "International shoots across Bali, Turkey, and Dubai generate massive asset clutter. I operate as a post-production director — organizing chaos into ready-to-publish digital assets.",
    },
    {
      tag: "03 / MESSAGING",
      title: "Bridging the brand-voice gap",
      body: "High-profile figures need a specific tone: energetic yet authoritative. I translate complex brand identities into cohesive visual languages that hold up across every platform.",
    },
  ];

  return (
    <section id="problem" className="relative section-hairline section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:max-w-2xl">
            <Overline className="text-amber-400/60">The Value Proposition</Overline>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Most brands have <GradientHighlight>footage.</GradientHighlight>
              <br />
              Almost none have a story framework.
            </h2>
            <p className="mt-2 text-muted-foreground">
              I bridge the gap between raw production and final delivery — solving three pain points
              that kill most branded content.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-14 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.tag} delay={i * 0.1} y={28}>
              <article className="bento-card h-full p-8">
                <Overline>{it.tag}</Overline>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{it.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRANSITION · Clock interstitial ──────────────────────────────────────────

function Transition() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 24,
    mass: 1.3,
  });

  // Video drifts slightly — pinned feel, moves slower than scroll
  const videoY = useTransform(smoothed, [0, 1], ["-8%", "8%"]);
  const videoScale = useTransform(smoothed, [0, 0.5, 1], [1.12, 1.06, 1.12]);

  // Text fades in early, holds, fades out at the end
  // Progress 0 = section entering from below, 1 = section exited above
  // So: fade in at ~0.3, hold, fade out at ~0.75
  const textY = useTransform(smoothed, [0, 1], ["20%", "-20%"]);
  const textOpacity = useTransform(smoothed, [0.35, 0.52, 0.68, 0.82], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 h-screen overflow-hidden bg-background section-hairline"
    >
      {/* Pinned clock video background */}
      <motion.video
        src={clockLoop}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ y: videoY, scale: videoScale }}
      />

      {/* Dark scrim for text legibility */}
      <div aria-hidden className="absolute inset-0 bg-background/72" />
      {/* Center-focused darker wash for extra contrast on text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
        }}
      />

      {/* Parallax text */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-6 will-change-transform"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="text-center">
          <p className="overline mb-4 text-amber-400/60">The Interstitial</p>
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Time is the only
            <br />
            <GradientHighlight>currency that matters.</GradientHighlight>
          </h2>
        </div>
      </motion.div>

      {/* Bottom gradient fade → blends into Problem section below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background"
      />
      {/* Top edge soft fade — smooth overlap with hero below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/80 via-background/20 to-transparent"
      />
    </section>
  );
}

// ─── ARCHIVE ──────────────────────────────────────────────────────────────────

type WorkItem = {
  title: string;
  client: string;
  year: string;
  location: string;
  video: string;
};

const works: WorkItem[] = [
  {
    title: "Future Protocol",
    client: "Commercial",
    year: "2025",
    location: "Riyadh, SA",
    video: futureProtocol,
  },
  {
    title: "Unlocking the Archive",
    client: "Documentary",
    year: "2025",
    location: "Studio",
    video: unlockingArchive,
  },
  {
    title: "The City of Two Continents",
    client: "Travel",
    year: "2025",
    location: "Istanbul, TR",
    video: cityOfTwoContinents,
  },
  {
    title: "Sounds of Istanbul",
    client: "Cultural",
    year: "2025",
    location: "Istanbul, TR",
    video: soundsOfIstanbul,
  },
  {
    title: "Nightfall Exploration",
    client: "Experimental",
    year: "2025",
    location: "Riyadh, SA",
    video: nightfallExploration,
  },
  {
    title: "Red Sea Odyssey",
    client: "Travel",
    year: "2025",
    location: "Red Sea, SA",
    video: redSeaOdyssey,
  },
  {
    title: "Doors of Time",
    client: "Short Film",
    year: "2025",
    location: "Riyadh, SA",
    video: doorsOfTime,
  },
  {
    title: "Hue Changes",
    client: "Experimental",
    year: "2025",
    location: "Studio",
    video: hueChanges,
  },
  {
    title: "Rhythm in Rotation",
    client: "Motion",
    year: "2025",
    location: "Riyadh, SA",
    video: rhythmInRotation,
  },
  {
    title: "Street Shuffles",
    client: "Urban",
    year: "2025",
    location: "Riyadh, SA",
    video: streetShuffles,
  },
];

function Archive() {
  const filtered = works;

  // ─── State ──────────────────────────────────────────────────
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxOrientation, setLightboxOrientation] = useState<"portrait" | "landscape" | null>(
    null,
  );
  const [lightboxFit, setLightboxFit] = useState<"contain" | "cover">("contain");
  const [lightboxLoading, setLightboxLoading] = useState(true);
  const [lightboxProgress, setLightboxProgress] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(true);
  // Controls the "unfolding" spread animation
  const [isExpanded, setIsExpanded] = useState(false);

  // ─── Refs ────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  // ─── Handlers ────────────────────────────────────────────────
  const toggleFullscreen = () => {
    setAudioUnlocked(true);
    setLightboxIndex((cur) => (cur === null ? active : null));
  };

  const togglePlay = () => {
    const v = videoRefs.current[active];
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  // ─── Effects ─────────────────────────────────────────────────

  // Reset lightbox state when index changes
  useEffect(() => {
    setLightboxOrientation(null);
    setLightboxFit("contain");
    setLightboxLoading(true);
    setLightboxProgress(0);
  }, [lightboxIndex]);

  // IntersectionObserver for visibility + spread trigger
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  // Close lightbox when section scrolls out of view
  useEffect(() => {
    if (!sectionVisible && lightboxIndex !== null) {
      setLightboxIndex(null);
    }
  }, [sectionVisible, lightboxIndex]);

  // Trigger mechanical spread when section enters view
  useEffect(() => {
    if (sectionVisible) {
      const t = setTimeout(() => setIsExpanded(true), 180);
      return () => clearTimeout(t);
    } else {
      setIsExpanded(false);
    }
  }, [sectionVisible]);

  // Sync playback + audio whenever active or unlock state changes
  useEffect(() => {
    const lightboxOpen = lightboxIndex !== null;
    Object.entries(videoRefs.current).forEach(([key, v]) => {
      if (!v) return;
      const idx = Number(key);
      if (idx === active && !lightboxOpen && sectionVisible) {
        v.muted = !audioUnlocked;
        v.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        v.muted = true;
        v.pause();
      }
    });
  }, [active, audioUnlocked, lightboxIndex, sectionVisible]);

  // Scroll-driven active index + header parallax
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Header parallax: fades and rises out as the carousel takes over
  const headerY = useTransform(scrollYProgress, [0, 0.18], ["0%", "-55%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (filtered.length === 0) return;
    const idx = Math.min(filtered.length - 1, Math.max(0, Math.floor(v * filtered.length * 0.999)));
    setActive(idx);
  });

  // Media-query + reduced-motion detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsDesktop(mq.matches);
      setReduced(rm.matches);
    };
    sync();
    mq.addEventListener?.("change", sync);
    rm.addEventListener?.("change", sync);
    return () => {
      mq.removeEventListener?.("change", sync);
      rm.removeEventListener?.("change", sync);
    };
  }, []);

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const go = (dir: number) => {
    setActive((a) => Math.max(0, Math.min(filtered.length - 1, a + dir)));
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxIndex !== null) {
        e.preventDefault();
        setLightboxIndex(null);
        return;
      }
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const inView = r.bottom > 0 && r.top < window.innerHeight;
      if (!inView) return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        setAudioUnlocked(true);
        toggleFullscreen();
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setAudioUnlocked(true);
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length, active, audioUnlocked, lightboxIndex]);

  // Viewport height tracking
  const [vh, setVh] = useState(900);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const clamp = (min: number, v: number, max: number) => Math.max(min, Math.min(max, v));

  // Card geometry
  const cardH = isDesktop ? clamp(340, vh - 400, 480) : clamp(260, vh - 340, 400);
  const cardW = Math.round(cardH * (isDesktop ? 0.68 : 0.65));

  // Spread-dependent motion parameters — compressed when entering, expanded after reveal
  const stepX = isExpanded
    ? Math.round(cardW * (isDesktop ? 0.72 : 0.66))
    : Math.round(cardW * 0.2);
  const rotY = isDesktop ? (isExpanded ? 14 : 2) : isExpanded ? 10 : 1;
  const depth = isDesktop ? (isExpanded ? 165 : 20) : isExpanded ? 105 : 12;

  return (
    <div
      ref={scrollRef}
      id="work"
      style={{ height: `${Math.max(1, filtered.length) * 100}vh` }}
      className="relative"
    >
      <section
        ref={sectionRef}
        onPointerDown={() => setAudioUnlocked(true)}
        className="sticky top-0 z-10 h-[100svh] flex flex-col justify-center pt-20 md:pt-24 pb-12 md:pb-16 relative section-hairline overflow-hidden bg-background"
      >
        {/* Ambient amber & slate glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-x-0 top-0 h-[60%]"
            style={{
              background:
                "radial-gradient(ellipse 72% 52% at 50% -8%, rgba(245,158,11,0.11), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 h-[55%] w-[58%]"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 92% 108%, rgba(100,116,139,0.14), transparent 70%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          {/* ── Minimal header + horizontal spec strip (scroll parallax) ── */}
          <motion.div
            className="will-change-transform"
            style={{ y: headerY, opacity: headerOpacity }}
          >
            <Reveal>
              <div className="max-w-2xl">
                <Overline className="text-amber-400/60">Stop posting for attention. Start posting for impact.</Overline>
                <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
                  A <GradientHighlight>technical ecosystem</GradientHighlight> built for retention.
                </h2>
              </div>
            </Reveal>

            {/* Horizontal spec strip — compact, editorial */}
            <Reveal delay={0.12}>
              <div className="mt-6 flex flex-wrap items-stretch gap-x-8 gap-y-4 border-y border-white/[0.06] py-4">
                {[
                  { num: "01", label: "Pacing", desc: "Dynamic visual rhythm" },
                  { num: "02", label: "Sound", desc: "Immersive sound design" },
                  { num: "03", label: "Format", desc: "Adaptable across surfaces" },
                  { num: "04", label: "Look", desc: "High-contrast realism" },
                ].map((s, i) => (
                  <div
                    key={s.num}
                    className={`flex items-start gap-3 ${i > 0 ? "md:border-l md:border-white/[0.06] md:pl-8" : ""}`}
                  >
                    <span className="mono text-[10px] font-semibold tracking-widest text-amber-400/70">
                      {s.num}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </motion.div>

          {/* ── 3D carousel ───────────────────────────────────── */}
          <div
            className="relative mx-auto mt-8 md:mt-12 select-none"
            style={{ height: cardH + 60, perspective: "1600px" }}
          >
            <motion.div
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ transformStyle: "preserve-3d" }}
              drag="x"
              dragElastic={0.06}
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                const threshold = stepX * 0.35;
                const delta = -Math.round(info.offset.x / threshold);
                if (delta !== 0) {
                  const clamped = Math.sign(delta) * Math.min(Math.abs(delta), 3);
                  setActive((a) => Math.max(0, Math.min(filtered.length - 1, a + clamped)));
                }
              }}
            >
              {filtered.map((w, i) => {
                const offset = i - active;
                const abs = Math.abs(offset);
                const x = offset * stepX;
                const ry = reduced ? 0 : -offset * rotY;
                const z = reduced ? 0 : -abs * depth;
                const scale = abs === 0 ? 1 : Math.max(0.78, 1 - abs * 0.07);
                const opacity = abs > 3 ? 0 : abs === 0 ? 1 : Math.max(0.35, 1 - abs * 0.22);
                const blur = abs === 0 ? 0 : Math.min(5, abs * 1.8);
                const isCenter = abs === 0;

                return (
                  <motion.button
                    key={`${w.title}-${i}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className="absolute left-1/2 top-1/2 origin-center overflow-hidden bg-zinc-950 border border-zinc-800/70"
                    style={{
                      width: cardW,
                      height: cardH,
                      marginLeft: -cardW / 2,
                      marginTop: -cardH / 2,
                      filter: `blur(${blur}px)`,
                      zIndex: 100 - abs,
                      // CFexpress-style diagonal notch on top-right corner
                      clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
                      borderRadius: "3px",
                    }}
                    animate={{ x, rotateY: ry, z, scale, opacity }}
                    transition={{
                      type: "spring",
                      stiffness: 88,
                      damping: 30,
                      mass: 1.1,
                      // Staggered delay per card distance — creates unfolding effect
                      delay: isExpanded ? abs * 0.042 : 0,
                    }}
                    aria-label={`${w.title} — ${w.client}`}
                    aria-current={isCenter ? "true" : undefined}
                  >
                    {/* Amber top accent bar */}
                    <div
                      className="absolute inset-x-0 top-0 h-[2px] z-10"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 4%, rgba(245,158,11,0.82) 18%, rgba(251,191,36,1) 50%, rgba(245,158,11,0.82) 82%, transparent 96%)",
                      }}
                    />

                    {/* Video preview */}
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={w.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onClick={() => {
                        setAudioUnlocked(true);
                        setActive(i);
                      }}
                      className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                        isCenter ? "scale-[1.04]" : "scale-100"
                      }`}
                    />

                    {/* Main overlay gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/22 to-transparent" />

                    {/* Top row: format badge + expand button */}
                    <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                      <span
                        className="mono border border-amber-500/32 bg-black/72 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.18em] text-amber-400/88 backdrop-blur-sm"
                        style={{ borderRadius: "2px" }}
                      >
                        MP4
                      </span>
                      {isCenter && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setAudioUnlocked(true);
                            toggleFullscreen();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              (e.currentTarget as HTMLElement).click();
                            }
                          }}
                          className="inline-flex h-7 w-7 cursor-pointer items-center justify-center border border-white/15 bg-black/62 text-white/68 backdrop-blur-md transition-all hover:border-amber-500/52 hover:text-amber-300/90"
                          style={{
                            clipPath:
                              "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%)",
                          }}
                          aria-label="Toggle fullscreen"
                        >
                          <Maximize2 className="h-3 w-3" />
                        </span>
                      )}
                    </div>

                    {/* Left-edge amber accent line */}
                    <div
                      className="absolute inset-y-0 left-0 w-px z-10"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 5%, rgba(245,158,11,0.48) 28%, rgba(245,158,11,0.48) 72%, transparent 95%)",
                        opacity: isCenter ? 0.7 : 0.28,
                      }}
                    />

                    {/* Bottom metadata panel */}
                    <motion.div
                      className="pointer-events-none absolute inset-x-2 bottom-2 z-10 border border-white/8 bg-black/78 px-3.5 py-3 backdrop-blur-xl"
                      style={{ borderRadius: "2px" }}
                      animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 10 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="mono text-[8px] uppercase tracking-[0.18em] text-amber-400/82">
                          {w.year}
                        </span>
                        <span className="h-px w-3 shrink-0 bg-zinc-700" />
                        <span className="mono text-[8px] uppercase tracking-[0.15em] text-zinc-500">
                          {w.location}
                        </span>
                      </div>
                      <h3 className="text-[13px] font-bold leading-tight tracking-tight text-white">
                        {w.title}
                      </h3>
                      <p className="mono mt-1 text-[8px] uppercase tracking-[0.18em] text-zinc-600">
                        {w.client}
                      </p>
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Navigation chevrons — CFexpress notch style */}
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-1 md:left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center border border-zinc-800 bg-zinc-950/85 text-zinc-400 backdrop-blur-md transition-all hover:border-amber-500/42 hover:text-amber-300"
              style={{
                clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 0 100%)",
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-1 md:right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center border border-zinc-800 bg-zinc-950/85 text-zinc-400 backdrop-blur-md transition-all hover:border-amber-500/42 hover:text-amber-300"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))",
              }}
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Amber progress dots */}
            <div className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === active ? "w-7 bg-amber-400" : "w-[5px] bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            {/* Edge gradient fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent" />
          </div>

          <p className="mt-8 text-center mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            {String(active + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")} ·
            Drag · Arrow keys
          </p>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          onClick={() => setLightboxIndex(null)}
        >
          {lightboxLoading && (
            <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-white/5" />
          )}
          <video
            key={filtered[lightboxIndex].video}
            src={filtered[lightboxIndex].video}
            autoPlay
            controls
            playsInline
            {...({ "webkit-playsinline": "true" } as Record<string, string>)}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            loop
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              setLightboxOrientation(v.videoHeight > v.videoWidth ? "portrait" : "landscape");
            }}
            onCanPlay={() => setLightboxLoading(false)}
            onWaiting={() => setLightboxLoading(true)}
            onPlaying={() => setLightboxLoading(false)}
            onProgress={(e) => {
              const v = e.currentTarget;
              if (v.buffered.length && v.duration) {
                setLightboxProgress(
                  Math.min(100, (v.buffered.end(v.buffered.length - 1) / v.duration) * 100),
                );
              }
            }}
            className={
              lightboxFit === "cover"
                ? "h-full w-full object-cover"
                : lightboxOrientation === "portrait"
                  ? "h-full w-auto max-w-full object-contain"
                  : lightboxOrientation === "landscape"
                    ? "w-full h-auto max-h-full object-contain"
                    : "h-full w-full object-contain"
            }
            onClick={(e) => e.stopPropagation()}
          />
          {lightboxProgress > 0 && lightboxProgress < 100 && (
            <Progress
              value={lightboxProgress}
              className="absolute bottom-0 left-0 right-0 h-1 rounded-none bg-white/10"
            />
          )}
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxFit((f) => (f === "contain" ? "cover" : "contain"));
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition hover:border-white/60 hover:bg-black/70"
              aria-label={lightboxFit === "contain" ? "Fill screen" : "Fit to screen"}
              title={lightboxFit === "contain" ? "Fill screen" : "Fit to screen"}
            >
              {lightboxFit === "contain" ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition hover:border-white/60 hover:bg-black/70"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) =>
                    i === null ? null : (i - 1 + filtered.length) % filtered.length,
                  );
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition hover:border-white/60 hover:bg-black/70"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition hover:border-white/60 hover:bg-black/70"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── IMPACT ───────────────────────────────────────────────────────────────────

function Impact() {
  return (
    <section id="impact" className="relative section-hairline section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Overline className="text-amber-400/60">The ROI</Overline>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Clients don't buy edits. They buy <GradientHighlight>outcomes.</GradientHighlight>
            </h2>
          </Reveal>
          <div className="md:col-span-7 grid gap-4">
            {[
              {
                stat: "+184%",
                label: "AVG. WATCH-TIME",
                title: "Elevated brand authority",
                body: "High production value instantly signals premium quality — letting brands and personal figures command industry influence.",
              },
              {
                stat: "MENA · GLOBAL",
                label: "REACH",
                title: "Cultural & regional relevance",
                body: "Rooted in Riyadh's booming creative ecosystem with a global lens — bridging regional authenticity with international appeal.",
              },
              {
                stat: "12 MO+",
                label: "RETENTION HALF-LIFE",
                title: "Audience loyalty, not viral spikes",
                body: "Narrative-driven recaps and documentaries (like رحلة ٤٢٢) build community trust and long-form brand loyalty.",
              },
            ].map((it, i) => (
              <Reveal key={it.title} delay={i * 0.1}>
                <article className="bento-card flex flex-col gap-2 p-6 md:flex-row md:items-center md:gap-8">
                  <div className="md:w-48 md:shrink-0">
                    <p className="mono text-2xl font-bold text-gradient-focal md:text-3xl">
                      {it.stat}
                    </p>
                    <p className="overline mt-1">{it.label}</p>
                  </div>
                  <div className="flex-1 border-t border-zinc-800 pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <h3 className="text-lg font-bold">{it.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();
    if (!name || !email || !mobile) return;
    const subject = encodeURIComponent(`New project inquiry — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMobile: ${mobile}`);
    window.location.href = `mailto:hello@abdullahd.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden section-hairline section-pad-lg">
      {/* Single subtle warm glow — restrained */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-20 -z-10 h-[300px] w-[300px] rounded-full opacity-[0.22] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-start) 0%, transparent 70%)" }}
      />

      <Reveal>
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-xl">
            <Overline className="text-amber-400/60">Have a great idea?</Overline>
            <h2 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tighter md:text-7xl">
              Let's work <GradientHighlight>together!</GradientHighlight>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Need a helping hand with your footage? Don't worry — I have plenty.
            </p>

            <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-transparent px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-white/30 focus:bg-white/[0.03]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-transparent px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-white/30 focus:bg-white/[0.03]"
                  placeholder="you@brand.com"
                />
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60"
                >
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="tel"
                  required
                  maxLength={32}
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-transparent px-5 py-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-white/30 focus:bg-white/[0.03]"
                  placeholder="+966 ..."
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="group inline-flex h-12 items-center gap-2 rounded-lg bg-accent-end px-7 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--accent-end)]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <a
                  href="#work"
                  className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/20 bg-transparent px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/5 hover:border-white/40 hover:-translate-y-0.5"
                >
                  Check my works
                </a>
                {submitted && (
                  <span className="mono text-xs text-muted-foreground">Opening your mail app…</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
        <p className="mono text-xs text-muted-foreground">© 2026 ABDULLAH.D — RIYADH / GLOBAL</p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/abdullahdee/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="h-4 w-4" />
            INSTAGRAM
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <div className="relative h-[200vh]">
        <Hero />
      </div>
      <div className="relative z-10 bg-background">
        <Transition />
        <Problem />
        <Archive />
        <Impact />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
