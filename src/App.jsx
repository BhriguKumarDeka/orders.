import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Package,
  Calendar,
  CheckCircle,
  Layout,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";

/* ── Assets ──────────────────────────────────────────────── */
import logoImage from "./public/logo.png";
import productVideo from "./public/orders-product.mp4";
import handheldImage from "./public/orders-handheld.png";
import uiImage from "./public/orders-ui.png";
import aaravImage from "./public/Aarav.png";
import janhviImage from "./public/Janhvi.png";
import bannerImage from "./public/orders-banner.png";
import historyImage from "./public/orders-history.png";
import homeImage from "./public/orders-home.png";
import heroImgOld from "./public/orders-hero.png";

/* ── Global Animation Config ──────────────────────────────── */
const SNAPPY_EASE = [0.76, 0, 0.24, 1];
const FIGMA_LINK = "https://www.figma.com/proto/0Ym2EXSxhoravrc2XL7vYM/Orders?page-id=111%3A535&node-id=149-35&viewport=4358%2C156%2C0.39&t=a2l76HHOhGy7TyeH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=149%3A35";

/* ── Data ─────────────────────────────────────────────────── */
const stats = [
  { value: 100, suffix: "%", label: "Track via individual apps", icon: Package },
  { value: 52, suffix: "%", label: "Missed return deadlines", icon: Calendar },
  { value: 63, suffix: "%", label: "Want smart suggestions", icon: CheckCircle },
  { value: 97.5, suffix: "", label: "SUS Score", icon: Layout },
];

const personas = [
  {
    name: "Janhvi Mehta",
    age: 23,
    role: "Design Student",
    image: janhviImage,
    quote: "I love the thrill of unboxing, but hate it when I forget I even ordered them.",
    painPoints: ["Missed return windows", "App switching fatigue", "Fragmented tracking"],
    goals: ["Centralized order hub", "Smart return alerts"],
  },
  {
    name: "Aarav Malhotra",
    age: 27,
    role: "Lifestyle Influencer",
    image: aaravImage,
    quote: "I'm ordering for 250K people who trust my word. I can't lose track.",
    painPoints: ["Financial loss from returns", "Sponsorship tracking", "Missing updates"],
    goals: ["Tag orders as reviewed", "Export summaries"],
  },
];

/* ── Preloader ────────────────────────────────────────────── */
function Preloader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds minimum load time
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[10000] bg-ink flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: SNAPPY_EASE }}
    >
      <motion.img 
        src={logoImage} 
        alt="Orders Logo" 
        className="h-16 w-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: SNAPPY_EASE }}
      />
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Comet Cursor Trail ───────────────────────────────────── */
function CometCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Generate 8 trailing springs with increasingly sluggish physics
  const tailLength = 8;
  const tail = Array.from({ length: tailLength }).map((_, i) => {
    const mass = 0.2 + i * 0.15;
    const stiffness = 800 - i * 80;
    const damping = 30 + i * 5;
    return {
      x: useSpring(cursorX, { stiffness, damping, mass }),
      y: useSpring(cursorY, { stiffness, damping, mass }),
      opacity: 1 - i / tailLength,
      scale: 1 - i / (tailLength + 2),
    };
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block mix-blend-screen">
      {tail.map((point, i) => (
        <motion.div
          key={i}
          className="absolute left-0 top-0 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
          style={{ 
            x: point.x, 
            y: point.y, 
            opacity: point.opacity,
            scale: point.scale,
            width: i === 0 ? "8px" : "6px", // head is slightly larger
            height: i === 0 ? "8px" : "6px",
            boxShadow: i === 0 ? "0 0 15px rgba(99,102,241,1)" : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ── SVG Components ───────────────────────────────────────── */
function FigmaLogo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 38 57" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5H9.5V28.5H19Z" fill="#F24E1E"/>
      <path d="M9.5 28.5H19C24.2467 28.5 28.5 32.7533 28.5 38C28.5 43.2467 24.2467 47.5 19 47.5C13.7533 47.5 9.5 43.2467 9.5 38V28.5Z" fill="#A259FF"/>
      <path d="M9.5 28.5C4.25329 28.5 0 24.2467 0 19C0 13.7533 4.25329 9.5 9.5 9.5H19V28.5H9.5Z" fill="#FF7262"/>
      <path d="M9.5 28.5H19V47.5H9.5V28.5Z" fill="#1ABCFE"/>
      <path d="M19 47.5C24.2467 47.5 28.5 43.2467 28.5 38H19V47.5Z" fill="#0ACF83"/>
      <path d="M9.5 47.5C4.25329 47.5 0 43.2467 0 38C0 32.7533 4.25329 28.5 9.5 28.5V47.5Z" fill="#1ABCFE"/>
      <path d="M9.5 47.5V57L19 47.5H9.5Z" fill="#0ACF83"/>
      <path d="M9.5 38C4.25329 38 0 42.2533 0 47.5C0 52.7467 4.25329 57 9.5 57C14.7467 57 19 52.7467 19 47.5V38H9.5Z" fill="#0ACF83"/>
    </svg>
  );
}

function FlowingDivider({ dark = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useSpring(useTransform(scrollYProgress, [0, 0.7], [0, 1]), { stiffness: 120, damping: 20 });
  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto px-6 -my-px">
      <svg viewBox="0 0 900 60" fill="none" className="w-full h-auto">
        <motion.path d="M0,30 C180,60 300,0 450,30 C600,60 720,0 900,30"
          stroke={dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.4)"}
          strokeWidth="2" fill="none" style={{ pathLength }} />
      </svg>
    </div>
  );
}

function DrawCheckmark({ inView }) {
  return (
    <svg viewBox="0 0 52 52" className="w-12 h-12">
      <motion.circle cx="26" cy="26" r="24" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, ease: SNAPPY_EASE }} />
      <motion.path d="M15 27 L23 35 L37 19" fill="none" stroke="#6366f1" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3, ease: SNAPPY_EASE }} />
    </svg>
  );
}

function AdvancedNetworkAnimation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const nodes = [
    { cx: 30, cy: 30 }, { cx: 80, cy: 45 }, { cx: 40, cy: 90 },
    { cx: 120, cy: 20 }, { cx: 150, cy: 70 }, { cx: 100, cy: 110 }
  ];
  const connections = [
    { x1: 30, y1: 30, x2: 80, y2: 45 }, { x1: 80, y1: 45, x2: 40, y2: 90 },
    { x1: 80, y1: 45, x2: 120, y2: 20 }, { x1: 120, y1: 20, x2: 150, y2: 70 },
    { x1: 150, y1: 70, x2: 100, y2: 110 }, { x1: 80, y1: 45, x2: 100, y2: 110 }
  ];

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative bg-ink overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
      <svg viewBox="0 0 180 140" className="w-[80%] h-auto">
        {connections.map((line, i) => (
          <motion.line key={`line-${i}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: i * 0.1, ease: SNAPPY_EASE }} />
        ))}
        {nodes.map((node, i) => (
          <motion.circle key={`node-${i}`} cx={node.cx} cy={node.cy} r="4" fill="#E8ECFE"
            initial={{ scale: 0 }} animate={inView ? { scale: [0, 1.5, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: SNAPPY_EASE }} />
        ))}
        <motion.circle cx="80" cy="45" r="40" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1"
          initial={{ scale: 0, opacity: 1 }} animate={inView ? { scale: 3, opacity: 0 } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
      </svg>
    </div>
  );
}

/* ── Utility Components ───────────────────────────────────── */
function AnimatedCounter({ value, suffix = "", inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1000;
    const start = performance.now();
    const isFloat = !Number.isInteger(value);
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setCount(isFloat ? parseFloat((value * e).toFixed(1)) : Math.round(value * e));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span>{count}{suffix}</span>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: SNAPPY_EASE }} className={className}>
      {children}
    </motion.div>
  );
}

function TextReveal({ text, className = "", delayOffset = 0, tag: Tag = "p" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delayOffset } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)", scale: 0.9 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 0.6, ease: SNAPPY_EASE } },
  };

  return (
    <Tag ref={ref} className={`${className} flex flex-wrap inline-flex`}>
      <motion.span variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="flex flex-wrap">
        {words.map((word, i) => (
          <motion.span key={i} variants={wordVariants} className="mr-[0.25em] inline-block">{word}</motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN CASE STUDY
   ═══════════════════════════════════════════════════════════ */
export default function CaseStudy() {
  const [loaded, setLoaded] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOp = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const solRef = useRef(null);
  const solInView = useInView(solRef, { once: true, margin: "-100px" });

  const solScrollRef = useRef(null);
  const { scrollYProgress: solScroll } = useScroll({ target: solScrollRef, offset: ["start end", "end start"] });
  const solImgY = useTransform(solScroll, [0, 1], [80, -80]);

  // For the new collage section
  const collageRef = useRef(null);
  const collageInView = useInView(collageRef, { once: true, margin: "-150px" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className="min-h-screen font-sans overflow-x-hidden relative bg-[#E8ECFE]">
        <CometCursor />

        {/* ════════════ HERO ════════════ */}
        <header ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ink">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.05] blur-[120px]" />
          </div>

          <motion.div className="relative z-10 flex flex-col items-center px-5 w-full h-full justify-center"
            style={{ y: heroY, opacity: heroOp }}>

            {/* Top nav */}
            <motion.div className="absolute top-10 w-full max-w-5xl flex items-center justify-between px-6"
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: SNAPPY_EASE }}>
              <div className="flex items-center gap-3">
                <img src={logoImage} alt="Orders Logo" className="h-6 w-auto" />
                <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-light">Product Case Study</span>
              </div>
              <span className="text-white/40 text-[11px] tracking-[0.2em] uppercase font-light hidden md:block">Bhrigu Kumar Deka</span>
            </motion.div>

            {/* Main Title & Video Container */}
            <div className="flex flex-col items-center mt-20 md:mt-10">
              <div className="overflow-hidden mb-8 text-center z-20 pointer-events-none">
                <motion.h1
                  className="font-display text-[clamp(4.5rem,10vw+1rem,12rem)] font-light text-white tracking-[-0.04em] leading-[0.85]"
                  initial={{ y: "100%", skewY: 5, filter: "blur(20px)", opacity: 0 }}
                  animate={{ y: 0, skewY: 0, filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: SNAPPY_EASE }}>
                  orders<span className="text-accent inline-block">.</span>
                </motion.h1>
              </div>

              {/* Hero Video replacing the image */}
              <motion.div className="relative w-[300px] md:w-[600px] lg:w-[800px] aspect-video rounded-3xl overflow-hidden border border-white/[0.1] shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-10 bg-ink/50 backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.8, y: 80, rotateX: 20, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.5, ease: SNAPPY_EASE }}>
                
                {/* Fallback image is shown while loading or if video fails, but video is absolute covering it */}
                <img src={heroImgOld} alt="Orders UI Fallback" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-lg" />
                
                <video 
                  src={productVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            {/* Tagline below video */}
            <motion.p
              className="mt-12 text-sm md:text-base text-white/50 max-w-md text-center leading-relaxed font-light"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.8, ease: SNAPPY_EASE }}>
              Unifying the fragmented post-purchase chaos into one beautifully organized, intelligent experience.
            </motion.p>

          </motion.div>
        </header>

        {/* ════════════ ABOUT — BENTO GRID ════════════ */}
        <section className="py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-10 text-center flex justify-center">
              <TextReveal tag="h2" text="Simplifying the post‑purchase experience" className="font-display text-[clamp(2.5rem,4vw+0.5rem,3.5rem)] font-light text-ink tracking-tight leading-snug" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 mb-4 md:gap-y-5">
              <Reveal className="md:col-span-4">
                <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-12 h-full shadow-soft hover:shadow-glow transition-shadow duration-500">
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-accent mb-6">About This Project</p>
                  <TextReveal tag="p" text="Orders is a unified, intelligent hub designed to centralize tracking, return deadlines, and purchase suggestions. We replace the chaos of juggling multiple e‑commerce apps with a single, serene environment." className="text-lg md:text-xl text-brand-900/70 leading-relaxed font-light" />
                </div>
              </Reveal>

              <Reveal delay={0.1} className="md:col-span-2"><AdvancedNetworkAnimation /></Reveal>

              <Reveal delay={0.2} className="md:col-span-3">
                <div className="bg-white/80 border border-white/90 rounded-3xl h-[280px] md:h-[320px] overflow-hidden shadow-soft relative group">
                   <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10 pointer-events-none" />
                   <img src={uiImage} alt="Orders UI Components" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
              </Reveal>

              <Reveal delay={0.3} className="md:col-span-3">
                <div ref={statsRef} className="grid grid-cols-2 gap-4 h-full">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl p-5 md:p-6 text-center hover:bg-white transition-colors duration-300 shadow-soft flex flex-col justify-center">
                      <div className="text-3xl md:text-4xl font-display font-light text-ink mb-1 tabular-nums tracking-tight">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                      </div>
                      <p className="text-[10px] text-brand-900/50 font-medium tracking-wide uppercase leading-snug">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <FlowingDivider />

        {/* ════════════ INTERACTIVE PROTOTYPE ════════════ */}
        <section className="py-20 md:py-32 bg-ink text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-accent/10 blur-[150px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-accent mb-5">Interactive Demo</p>
                  <TextReveal tag="h2" text="Experience the Flow" className="font-display text-[clamp(2.5rem,5vw+0.5rem,4rem)] font-light tracking-tight leading-[1]" />
                </div>
                <motion.a href={FIGMA_LINK} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-white/50 hover:text-white font-medium text-sm tracking-widest uppercase transition-colors" whileHover={{ x: 5 }}>
                  Open Fullscreen <ArrowRight size={16} className="group-hover:text-accent transition-colors" />
                </motion.a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <motion.div className="w-full aspect-[16/9] md:h-[700px] rounded-3xl overflow-hidden border border-white/[0.15] bg-ink/50 backdrop-blur-md shadow-[0_0_80px_rgba(99,102,241,0.15)] relative group"
                initial={{ rotateX: 10, scale: 0.95 }} whileInView={{ rotateX: 0, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: SNAPPY_EASE }}>
                <iframe style={{ border: "none" }} width="100%" height="100%" src="https://embed.figma.com/proto/0Ym2EXSxhoravrc2XL7vYM/Orders?page-id=111%3A535&node-id=149-35&viewport=4358%2C156%2C0.39&scaling=scale-down&content-scaling=fixed&starting-point-node-id=149%3A35&embed-host=share" allowFullScreen title="Figma Prototype"></iframe>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ════════════ PROBLEM ════════════ */}
        <section className="relative bg-ink text-white py-20 md:py-32 overflow-hidden border-t border-white/[0.05]">
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-indigo-400 mb-5">The Problem</p>
              <TextReveal tag="h2" text="Missing Windows & Scattered Apps" className="font-display text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] font-light tracking-tight leading-[1] mb-12 md:mb-16" />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6">
              <Reveal className="md:col-span-3">
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl md:rounded-3xl p-8 md:p-12 h-full shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <blockquote className="text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-10">
                    Urban shoppers face disorganization because there is <strong className="text-white font-medium bg-white/10 px-2 rounded-md">no unified platform</strong> to track purchases across Myntra, Amazon, and Blinkit.
                  </blockquote>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="md:col-span-2">
                <div className="bg-gradient-to-br from-brand-900/60 to-ink rounded-2xl md:rounded-3xl border border-white/[0.08] p-10 flex items-center justify-center h-full min-h-[240px] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <div className="text-center">
                    <AlertCircle size={56} className="text-indigo-400/40 mx-auto mb-5" strokeWidth={1} />
                    <p className="text-white/30 text-[11px] font-medium tracking-[0.3em] uppercase">Fragmented<br />Experiences</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <FlowingDivider dark />

        {/* ════════════ PERSONAS (WITH IMAGES) ════════════ */}
        <section className="py-20 md:py-32 bg-ink">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-accent mb-5">User Personas</p>
              <TextReveal tag="h2" text="Who are we building for?" className="font-display text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] font-light text-white tracking-tight leading-[1] mb-12 md:mb-16" />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {personas.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-white/[0.02] text-white rounded-2xl md:rounded-3xl p-8 md:p-10 h-full border border-white/[0.05] shadow-glow hover:shadow-glow-lg transition-all duration-500">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full overflow-hidden border border-white/10">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-display text-xl font-medium">{p.name}</h4>
                        <p className="text-indigo-300/70 text-sm font-light mt-1">{p.age} · {p.role}</p>
                      </div>
                    </div>
                    <TextReveal tag="p" text={`"${p.quote}"`} className="italic text-lg md:text-xl text-white/70 leading-relaxed mb-8 font-light" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-ink"><FlowingDivider dark /></div>

        {/* ════════════ SOLUTION (BENTO GRID) ════════════ */}
        <section ref={solScrollRef} className="py-20 md:py-32 bg-ink border-b border-white/[0.05]">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-accent mb-5">The Solution</p>
                  <TextReveal tag="h2" text="One Calm Space." className="font-display text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] font-light text-white tracking-tight leading-[1]" />
                </div>
                <motion.a
                  href={FIGMA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white text-white hover:text-ink px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 backdrop-blur-md transition-colors duration-300 shadow-glow"
                >
                  <FigmaLogo className="w-4 h-4" />
                  View Prototype <ArrowUpRight size={16} strokeWidth={2} />
                </motion.a>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6 auto-rows-[325px]">
              
              {/* TEXT CARD */}
              <Reveal className="md:col-span-3 md:row-span-1">
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 h-full flex flex-col justify-center shadow-soft">
                  <div className="mb-6"><DrawCheckmark inView={solInView} /></div>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-4 leading-tight tracking-tight">
                    Centralizing the <span className="text-accent font-medium">Post‑Purchase</span> Journey.
                  </h3>
                  <TextReveal tag="p" text="A unified, intelligent hub pulling data from emails and messages to track orders, return timelines, and suggest outfits." className="text-sm md:text-base text-white/50 font-light leading-relaxed" />
                </div>
              </Reveal>

              {/* HOME IMAGE */}
              <Reveal delay={0.1} className="md:col-span-3 md:row-span-2">
                <div className="rounded-3xl overflow-hidden border border-white/[0.08] h-full bg-white/5 flex flex-col items-center justify-end p-8 pb-0 group relative">
                  <img src={homeImage} alt="Home Dashboard" className="w-[85%] h-auto object-contain object-bottom group-hover:-translate-y-3 transition-transform duration-700 ease-out" />
                </div>
              </Reveal>

              {/* HISTORY IMAGE */}
              <Reveal delay={0.2} className="md:col-span-3 md:row-span-1">
                <div className="rounded-3xl overflow-hidden border border-white/[0.08] h-full bg-white/5 flex flex-col items-end justify-center group relative">
                  <img src={historyImage} alt="History View" className=" object-cover group-hover:-translate-x-3 transition-transform duration-700 ease-out" />
                </div>
              </Reveal>

              {/* HERO IMAGE */}
              <Reveal delay={0.3} className="md:col-span-2 md:row-span-2">
                <div className="rounded-3xl overflow-hidden border border-white/[0.08] h-full bg-white/5 flex items-center justify-center p-6 group relative">
                  <img src={heroImgOld} alt="App Overview" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
              </Reveal>

              {/* BANNER IMAGE */}
              <Reveal delay={0.4} className="md:col-span-4 md:row-span-2">
                <div className="rounded-3xl overflow-hidden border border-white/[0.08] h-full bg-white/5 group relative flex flex-col items-center justify-end">
                  <img src={bannerImage} alt="Banner Graphic" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ════════════ BRILLIANT FOOTER ════════════ */}
        <footer className="bg-ink text-white pt-24 pb-10 relative overflow-hidden border-t border-white/[0.05]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] rounded-[100%] bg-accent/10 blur-[120px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
            <Reveal><img src={logoImage} alt="Orders Logo" className="h-12 w-auto mb-8 opacity-80" /></Reveal>
            <div className="mb-16">
              <TextReveal tag="h2" text="orders." className="font-display text-[clamp(4rem,15vw,12rem)] font-light tracking-[-0.05em] leading-none text-center opacity-90" />
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/[0.1]">
              <div className="flex items-center gap-6 text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">
                <span>© 2026 Orders Inc.</span>
                <span className="hidden md:inline">·</span>
                <span className="hidden md:inline">UX/UI Case Study</span>
              </div>
              <motion.button onClick={scrollToTop} className="flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors" whileHover={{ y: -3 }}>
                Back to Top <ChevronUp size={14} />
              </motion.button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}