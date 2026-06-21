import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
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

function Overline({ children }: { children: React.ReactNode }) {
  return <span className="overline">{children}</span>;
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

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const scale = useTransform(scrollY, [0, 800], [1.05, 1.15]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.6]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24 grain"
    >
      <motion.img
        src={heroBg}
        alt="Filmmaker in editing studio with camera rig"
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[30%_center] will-change-transform sm:object-[40%_center] lg:object-center"
        style={{ filter: "brightness(1.15) contrast(1.1) saturate(1.05)", y, scale, opacity }}
      />
      {/* Centered legibility scrim — darker wash so text reads clearly */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-background/60 sm:bg-background/55 lg:bg-background/50"
      />
      {/* Vertical gradient — adds contrast at top and bottom for headline + stats */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Cinematic edge vignette — frames the portrait without dimming the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tighter text-foreground sm:text-5xl md:mt-6 lg:text-6xl">
          Your Footage,
          <br className="sm:hidden" /> <GradientHighlight>Elevating Your Brand</GradientHighlight>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-[1.55] text-muted-foreground sm:max-w-xl md:mt-6 md:max-w-2xl lg:max-w-3xl">
          Visual architect and post-production director. I build pacing, sound design, and visual
          rhythm that stops the scroll — for brands, founders, and high-profile creators.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-8">
          <PrimaryButton>Start a project</PrimaryButton>
          <SecondaryButton href="#work">
            <Play className="h-3.5 w-3.5 fill-current" />
            View archive
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}

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
    <section id="problem" className="relative border-t border-zinc-900 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 md:max-w-2xl">
          <Overline>The Value Proposition</Overline>
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

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <article key={it.tag} className="bento-card p-8">
              <Overline>{it.tag}</Overline>
              <h3 className="mt-6 text-xl font-bold tracking-tight">{it.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  return (
    <section className="relative border-t border-zinc-900 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Overline>Stop posting for attention. Start posting for impact.</Overline>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              A <GradientHighlight>technical ecosystem</GradientHighlight> built for retention.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Not just tools — execution. Every cut, transition, and audio layer is engineered for
              one outcome: holding attention long enough for the message to land.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bento-card p-6">
                <Overline>01 — Pacing</Overline>
                <h3 className="mt-4 text-lg font-bold">Dynamic visual rhythm</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Seamlessly blending BTS energy with polished commercial finishes.
                </p>
              </div>
              <div className="bento-card p-6">
                <Overline>02 — Sound</Overline>
                <h3 className="mt-4 text-lg font-bold">Immersive sound design</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Ambient textures and beat-matched edits that build tension before a single
                  transition.
                </p>
              </div>
              <div className="bento-card p-6">
                <Overline>03 — Format</Overline>
                <h3 className="mt-4 text-lg font-bold">Adaptable across surfaces</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Ultra-wide cinematic down to mobile-first vertical — engineered as one system.
                </p>
              </div>
              <div className="bento-card p-6">
                <Overline>04 — Look</Overline>
                <h3 className="mt-4 text-lg font-bold">High-contrast realism</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Deep shadows, vibrant color accents. Lifestyle and travel content that pops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

  useEffect(() => {
    setLightboxOrientation(null);
    setLightboxFit("contain");
    setLightboxLoading(true);
    setLightboxProgress(0);
  }, [lightboxIndex]);

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

  useEffect(() => {
    if (!sectionVisible && lightboxIndex !== null) {
      setLightboxIndex(null);
    }
  }, [sectionVisible, lightboxIndex]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

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

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (filtered.length === 0) return;
    const idx = Math.min(filtered.length - 1, Math.max(0, Math.floor(v * filtered.length * 0.999)));
    setActive(idx);
  });

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

  const [vh, setVh] = useState(900);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const clamp = (min: number, v: number, max: number) => Math.max(min, Math.min(max, v));
  const cardH = isDesktop ? clamp(360, vh - 380, 520) : clamp(280, vh - 320, 420);
  const cardW = Math.round(cardH * (isDesktop ? 0.74 : 0.7));
  const stepX = Math.round(cardW * 0.65);
  const rotY = isDesktop ? 28 : 18;
  const depth = isDesktop ? 180 : 100;

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
        className="sticky top-0 z-10 h-[100svh] flex flex-col justify-center pt-24 md:pt-32 pb-16 md:pb-20 relative border-t border-zinc-900 overflow-hidden bg-background"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%] opacity-50"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Overline>The Digital Archive</Overline>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Cinematic Realities. <GradientHighlight>Seamless Stories.</GradientHighlight>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Where raw footage becomes narrative. Explore an immersive gallery of travel
              cinematography, commercial edits, and visual experiments from around the world.
            </p>
          </div>

          <div
            className="relative mx-auto mt-8 md:mt-12 select-none"
            style={{ height: cardH + 40, perspective: "1400px" }}
          >
            <motion.div
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ transformStyle: "preserve-3d" }}
              drag="x"
              dragElastic={0.08}
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
                const scale = abs === 0 ? 1 : Math.max(0.78, 1 - abs * 0.08);
                const opacity = abs > 3 ? 0 : abs === 0 ? 1 : Math.max(0.35, 1 - abs * 0.22);
                const blur = abs === 0 ? 0 : Math.min(6, abs * 2);
                const isCenter = abs === 0;

                return (
                  <motion.button
                    key={`${w.title}-${i}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className="absolute left-1/2 top-1/2 origin-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
                    style={{
                      width: cardW,
                      height: cardH,
                      marginLeft: -cardW / 2,
                      marginTop: -cardH / 2,
                      filter: `blur(${blur}px)`,
                      zIndex: 100 - abs,
                    }}
                    animate={{ x, rotateY: ry, z, scale, opacity }}
                    transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.6 }}
                    aria-label={`${w.title} — ${w.client}`}
                    aria-current={isCenter ? "true" : undefined}
                  >
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
                      className={`h-full w-full object-cover transition-transform duration-[600ms] ease-out ${
                        isCenter ? "scale-105" : "scale-100"
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
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
                        className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/60 hover:bg-black/70 hover:shadow-[0_0_24px_-4px_rgba(255,255,255,0.4)]"
                        aria-label="Toggle fullscreen"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    )}
                    <motion.div
                      className="pointer-events-none absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-2xl"
                      animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="mono rounded-full border border-white/20 bg-black/30 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white/90">
                          {w.year}
                        </span>
                        <span className="mono text-[10px] uppercase tracking-widest text-white/70">
                          {w.client}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-base font-bold tracking-tight text-white md:text-lg">
                        {w.title}
                      </h3>
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Side chevrons */}
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-1 md:left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-1 md:right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
              aria-label="Next"
            >
              ›
            </button>

            {/* Bottom dots */}
            <div className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent" />
          </div>

          <p className="mt-8 text-center mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
            {String(active + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")} ·
            Drag · Arrow keys
          </p>
        </div>
      </section>
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

function Impact() {
  return (
    <section
      id="impact"
      className="relative border-t border-zinc-900 mt-16 md:mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Overline>The ROI</Overline>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Clients don't buy edits. They buy <GradientHighlight>outcomes.</GradientHighlight>
            </h2>
          </div>
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
            ].map((it) => (
              <article
                key={it.title}
                className="bento-card flex flex-col gap-2 p-6 md:flex-row md:items-center md:gap-8"
              >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section
      id="contact"
      className="relative overflow-hidden border-t border-zinc-900 py-32 md:py-44"
    >
      {/* Decorative wave/gradient shapes from the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-[820px] w-[820px] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-20 -z-10 h-[300px] w-[300px] rounded-full opacity-30 blur-2xl"
        style={{ background: "radial-gradient(circle, var(--accent-start) 0%, transparent 70%)" }}
      />
      {/* Sparkle bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-12 right-12 text-accent-start/70"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-xl">
          <Overline>Have a great idea?</Overline>
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
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-10">
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

function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Problem />
      <Craft />
      <Archive />
      <Impact />
      <CTA />
      <Footer />
    </main>
  );
}
