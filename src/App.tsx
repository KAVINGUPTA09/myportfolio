import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronsDown, Download, Github, Linkedin, Mail, Phone, Code2, Instagram } from "lucide-react";

const GH = "https://github.com/KAVINGUPTA09";
const MARQUEE_SKILLS = [
  "Python", "Java", "C", "JavaScript", "SQL",
  "LangChain", "LangGraph", "Agno", "LLMs", "Generative AI", "RAG", "Vector Search", "OCR", "OpenCV",
  "XGBoost", "Scikit-learn", "Transformers", "NLP", "CNN", "RNN", "SHAP", "SMOTE",
  "Pandas", "NumPy", "Tableau", "ETL",
  "FastAPI", "Flask", "SQLAlchemy", "REST APIs", "Microservices", "React", "Next.js", "Streamlit",
  "PostgreSQL", "pgvector", "ChromaDB", "Redis", "MinIO",
  "Docker", "CI/CD", "Git", "Linux", "AWS", "JWT", "RBAC", "Solidity",
];
const LI = "https://www.linkedin.com/in/kavin-gupta-509b8a321/";
const IG = "https://instagram.com/kavin_rs_45";
const LC = "https://leetcode.com/u/kavin_rs_45/";
const EMAIL = "guptakavin6@gmail.com";
const EASE = [0.16, 1, 0.3, 1] as const;
const roles = ["AI & ML Engineer", "RAG Systems Builder", "Backend Developer", "Data Analyst"];

type L = [string, string];
const work: { n: string; cat: string; name: string; body: string; stack: string[]; links: L[] }[] = [
  { n: "01", cat: "Enterprise B2B", name: "ProcureMind AI",
    body: "Full-stack procurement platform that ranks vendor quotations on price, SLA compliance and warranties. High-concurrency FastAPI microservices with Redis caching and JWT-based RBAC across Buyer, Approver and Admin tiers, plus LangChain-driven contract risk assessment and what-if analysis. Serving 100+ users.",
    stack: ["FastAPI", "React", "PostgreSQL", "Redis", "LangChain"],
    links: [["Check it out", "https://procurewise-insight.onrender.com/"], ["Backend Live", "https://procuremind-ai-backend.onrender.com/"], ["Frontend GitHub", "https://github.com/KAVINGUPTA09/procurewise-insight"], ["Backend GitHub", "https://github.com/KAVINGUPTA09/procuremind-ai-backend"]] },
  { n: "02", cat: "GovTech · SIH 2026", name: "Tathya — Secure Evidence Platform",
    body: "Engineered the RAG layer for a secure case and evidence platform: OpenCV/OCR ingestion, pgvector embeddings and permission-aware bilingual semantic search across 5 institutional roles. Tamper-evident evidence via SHA-256 and three-way hash verification anchored to a local Ethereum ledger.",
    stack: ["FastAPI", "Next.js", "pgvector", "MinIO", "Solidity"],
    links: [["Video Explanation", "https://jumpshare.com/share/WmYGfmILiv5ZQVWko305"], ["GitHub", "https://github.com/KAVINGUPTA09/TATHYA--sih26-"]] },
  { n: "03", cat: "Generative AI", name: "InsightTube v3.3",
    body: "Autonomous AI engine that turns long-form video into executive briefs, action checklists and timestamped chapter breakdowns, with resilient extraction, SQLite sessions and PDF/Markdown export.",
    stack: ["Agno", "Llama 3.3", "Groq", "SQLite", "Streamlit"],
    links: [["Check it out", "https://youtube-link-analyzer-using-agno-agents-erggp6b3gxgxtb8xn9dz2n.streamlit.app/"], ["GitHub", "https://github.com/KAVINGUPTA09/YOUTUBE-LINK-ANALYZER-USING-AGNO-AGENTS"]] },
  { n: "04", cat: "Healthcare Analytics", name: "Heart Disease Analytics Engine",
    body: "Clinical analytics pipeline uncovering cardiovascular risk correlations across multi-variable patient biomarkers, with interactive Tableau dashboards and a deployed web app showing risk-factor distributions.",
    stack: ["Tableau", "Python", "Scikit-learn", "Render"],
    links: [["Check it out", "https://heartdisease-da-1.onrender.com/"], ["GitHub", "https://github.com/KAVINGUPTA09/HeartDisease_DA"]] },
  { n: "05", cat: "FinTech · Internship", name: "FraudGuard AI",
    body: "End-to-end fraud classification engine on heavily skewed transactions (0.16% fraud rate). SMOTE and XGBoost reach 94% recall, served through async Flask APIs with batch inference and a Streamlit dashboard with real-time SHAP explainability.",
    stack: ["XGBoost", "SMOTE", "Flask", "Streamlit", "SHAP"],
    links: [["Check it out", "https://fraud-detection-dashboard-54hq.onrender.com/"], ["Backend Live", "https://mlproject-1eie.onrender.com/"], ["GitHub", "https://github.com/KAVINGUPTA09/MLPROJECT"]] },
];

const skills: [string, string[]][] = [
  ["AI & Data", ["LangChain, LangGraph, Agno", "LLMs, Generative AI, RAG", "Vector Search, OCR, OpenCV", "Pandas, NumPy, Tableau, ETL"]],
  ["ML & Deep Learning", ["XGBoost, Scikit-learn", "Transformers, NLP, CNN, RNN", "SHAP, SMOTE", "Feature Eng., Cross-Validation"]],
  ["Backend & Systems", ["FastAPI, Flask, SQLAlchemy", "REST APIs, Microservices", "React, Next.js, Streamlit", "PostgreSQL, pgvector, Redis, MinIO"]],
  ["Languages & DevOps", ["Python, Java, C, JavaScript, SQL", "Docker, CI/CD, Git, Linux", "AWS, Render, JWT, RBAC", "Hardhat, Solidity"]],
];

const exp = [
  { when: "Jul – Sep 2026", role: "Machine Learning Intern", org: "FlyRank Corp.", pts: ["Architected and deployed production MLOps pipelines for ProcureMind AI: multi-source ingestion, automated feature engineering and continuous training.", "Supported 100+ users with controlled API latency; tuned hyperparameters and benchmarked with cross-validation for accuracy and throughput."] },
  { when: "Apr – Jun 2026", role: "AI & Data Analyst Intern", org: "Xylofy AI", pts: ["Built FraudGuard AI end to end, reaching 94% recall on a 0.16% fraud-rate dataset.", "Shipped async REST APIs with schema validation and batch inference, plus a dashboard with real-time SHAP explainability."] },
];

const awards: [string, string][] = [
  ["Top 200", "HCLTech AIthon — out of 10,000+ participants nationwide, and Top 3 across KIET Group of Institutions."],
  ["SIH 2026", "Qualified the institutional round; shortlisted for national screening (NCRB / MHA track)."],
  ["200+", "Data Structures & Algorithms problems solved on LeetCode."],
  ["Certified", "AWS Cloud Practitioner · Oracle SQL Database · Red Hat Linux Fundamentals · Deloitte Simulation."],
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0, big = false;
    const mv = (e: MouseEvent) => { x = e.clientX; y = e.clientY; big = !!(e.target as HTMLElement).closest("a,button"); };
    const tick = () => {
      cx += (x - cx) * 0.16; cy += (y - cy) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${big ? 3 : 1})`;
      if (halo.current) halo.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener("mousemove", mv);
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("mousemove", mv); cancelAnimationFrame(raf); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <>
      <div ref={halo} aria-hidden className="hidden [@media(pointer:fine)]:block fixed top-0 left-0 z-0 size-[240px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.8 0.1 82 / .16), transparent 70%)" }} />
      <div ref={dot} aria-hidden className="hidden [@media(pointer:fine)]:block fixed top-0 left-0 z-50 size-4 rounded-full bg-white mix-blend-difference pointer-events-none" />
    </>
  );
}

function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, g = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, mx = -999, my = -999;
    const pts = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00012, vy: (Math.random() - .5) * .00012 }));
    const rs = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    rs(); addEventListener("resize", rs);
    const mm = (e: MouseEvent) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    addEventListener("mousemove", mm);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      g.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!still) { p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1; }
        const px = p.x * w, py = p.y * h, d = Math.hypot(px - mx, py - my);
        g.fillStyle = `rgba(241,215,154,${d < 160 ? 0.9 : 0.3})`;
        g.beginPath(); g.arc(px, py, d < 160 ? 2 : 1.2, 0, 7); g.fill();
        if (d < 160) { g.strokeStyle = `rgba(241,215,154,${(1 - d / 160) * .5})`; g.beginPath(); g.moveTo(px, py); g.lineTo(mx, my); g.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", rs); removeEventListener("mousemove", mm); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full pointer-events-none" />;
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span ref={ref} className="inline-block transition-transform duration-300 ease-out"
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`; }}
      onMouseLeave={() => { ref.current!.style.transform = ""; }}>{children}</span>
  );
}

function Typer() {
  const [t, setT] = useState(roles[0]);
  useEffect(() => {
    let del = false, n = roles[0].length, idx = 0, id: number;
    const step = () => {
      const w = roles[idx]; n += del ? -1 : 1; setT(w.slice(0, n));
      let d = del ? 30 : 70;
      if (!del && n === w.length) { del = true; d = 1600; } else if (del && n === 0) { del = false; idx = (idx + 1) % roles.length; d = 250; }
      id = window.setTimeout(step, d);
    };
    id = window.setTimeout(step, 1600);
    return () => clearTimeout(id);
  }, []);
  return <span>{t}<span className="caret text-(--color-gold)">|</span></span>;
}

function Count({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const run = (t: number) => { const p = Math.min((t - t0) / 1500, 1); el.textContent = prefix + Math.round(to * (1 - Math.pow(1 - p, 4))) + suffix; if (p < 1) requestAnimationFrame(run); };
      requestAnimationFrame(run);
    });
    io.observe(el); return () => io.disconnect();
  }, [to, suffix, prefix]);
  return <span ref={ref}>{prefix}{to}{suffix}</span>;
}

function Letters({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span key={i} aria-hidden className="inline-block" initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.045 }}>
          {ch === " " ? "\u00a0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={`card ${className}`}
      onMouseMove={(e) => {
        const el = ref.current!, r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}>{children}</div>
  );
}

function SecHead({ eyebrow, a, b, note }: { eyebrow: string; a: string; b: string; note?: string }) {
  return (
    <div className="reveal mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 text-center md:text-left">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="h2">{a} <em>{b}</em></h2>
      </div>
      {note && <p className="eyebrow !tracking-[0.18em] max-w-md md:text-right normal-case !text-[0.8rem] leading-relaxed">{note}</p>}
    </div>
  );
}

export default function App() {
  useReveal();
  const { scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const wrap = "relative z-10 mx-auto max-w-[1240px] px-5 md:px-10";

  return (
    <div className="relative overflow-x-clip">
      <Cursor />
      <motion.div style={{ scaleX: prog }} className="fixed top-0 inset-x-0 h-[3px] origin-left z-40 bg-gradient-to-r from-[#c79b4d] to-[#f1d79a]" />

      <header className="fixed top-0 inset-x-0 z-30 backdrop-blur-md bg-black/40 border-b border-(--color-line)">
        <div className={`${wrap} !max-w-[1400px] flex items-center justify-between py-4`}>
          <a href="#top" className="font-display text-xl font-semibold tracking-wide">KG<span className="text-(--color-gold)">.</span></a>
          <nav className="hidden md:flex gap-9 eyebrow !tracking-[0.2em]">
            {["About", "Skills", "Work", "Experience", "Contact"].map((s) => (<a key={s} href={`#${s.toLowerCase()}`} className="hover:text-white transition-colors">{s}</a>))}
          </nav>
          <a href="#contact" className="btn-gold text-xs font-semibold tracking-widest uppercase px-5 py-3 rounded-sm focus-visible:ring-2 focus-visible:ring-white">Hire me</a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-5 pt-24 pb-16">
          <Stars />
          <div className="relative z-10 max-w-4xl">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="eyebrow !text-[0.8rem] min-h-6">
              <Typer />
            </motion.p>
            <h1 className="font-display glow-name text-[clamp(3.2rem,11vw,8.5rem)] leading-[1.02] font-medium mt-6">
              <Letters text="Kavin" delay={0.2} /><br className="md:hidden" /> <Letters text="Gupta" delay={0.5} />
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }} className="mt-10 text-base md:text-lg text-(--color-mute) max-w-2xl mx-auto leading-relaxed">
              I build AI systems that work in production, combining <b className="text-white/80">RAG pipelines, machine learning</b>, and <b className="text-white/80">strong backend engineering.</b>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.9, ease: EASE }} className="mt-10 flex flex-wrap justify-center gap-5">
              <Magnetic><a href="#contact" className="btn-gold inline-block text-xs font-semibold tracking-[0.18em] uppercase px-9 py-4 rounded-sm focus-visible:ring-2 focus-visible:ring-white">Hire me</a></Magnetic>
              <Magnetic><a href="#work" className="btn-silver inline-block text-xs font-semibold tracking-[0.18em] uppercase px-9 py-4 rounded-sm focus-visible:ring-2 focus-visible:ring-white">View work</a></Magnetic>
            </motion.div>
            <a href="#about" className="mt-16 inline-flex flex-col items-center gap-1 eyebrow !text-[0.65rem] hover:text-white">Scroll<ChevronsDown size={16} className="bob" /></a>
          </div>
        </section>

        <section aria-hidden className="border-y border-(--color-line) py-7 overflow-hidden select-none min-h-[110px]">
          <div className="marquee font-display text-4xl md:text-5xl whitespace-nowrap">
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center gap-10 pr-10">
                {MARQUEE_SKILLS.map((t, i) => (
                  <span key={t} className="flex items-center gap-10"><span className={i % 2 ? "outline" : ""}>{t}</span><span className="text-(--color-gold) text-2xl">✦</span></span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="about" className={`${wrap} py-28 md:py-36 scroll-mt-10`}>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="reveal photo-wrap relative mx-auto w-full max-w-[460px] aspect-square">
              <div className="ring absolute -inset-[3px] rounded-full opacity-80" />
              <div className="absolute inset-0 rounded-full bg-black" />
              <img src="/img/kavin.png" alt="Portrait of Kavin Gupta" width={600} height={600} className="photo relative size-full rounded-full object-cover" />
            </div>
            <div className="reveal">
              <p className="eyebrow mb-3">About</p>
              <h2 className="h2">Engineering with <em>Precision</em></h2>
              <div className="mt-8 space-y-5 text-(--color-mute) leading-relaxed">
                <p>I’m a Computer Science student at KIET Group of Institutions (CGPA 8.3, batch 2028) who believes useful AI is born where data science meets solid software engineering.</p>
                <p>From fraud detection with 94% recall to a procurement platform serving 100+ users and a blockchain-anchored evidence system for Smart India Hackathon, I take models out of notebooks and into production.</p>
                <p>My approach is simple: understand the problem deeply, design for scale, and ship systems that are explainable, secure and fast.</p>
              </div>
              <div className="mt-10 pt-8 border-t border-(--color-line) grid grid-cols-3 text-center">
                {[[<Count to={94} suffix="%" />, "Fraud recall"], [<Count to={100} suffix="+" />, "Production users"], [<Count to={5} />, "Projects shipped"]].map(([a, b], i) => (
                  <div key={i}><div className="font-display text-3xl md:text-4xl">{a}</div><div className="text-xs text-(--color-mute) mt-1">{b}</div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className={`${wrap} pb-28 md:pb-36 scroll-mt-10`}>
          <SecHead eyebrow="Expertise" a="Skills &" b="Capabilities" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map(([t, items]) => (
              <Tilt key={t} className="reveal p-7">
                <h3 className="font-display text-2xl font-semibold">{t}</h3>
                <ul className="mt-5 space-y-2.5 text-sm text-white/75 list-disc pl-5 marker:text-(--color-gold)">
                  {items.map((i) => (<li key={i}>{i}</li>))}
                </ul>
              </Tilt>
            ))}
          </div>
        </section>

        <section id="work" className={`${wrap} pb-28 md:pb-36 scroll-mt-10`}>
          <SecHead eyebrow="Portfolio" a="Featured" b="Work" note="A selection of projects that showcase how I solve complex problems with elegant, deployed solutions." />
          <div className="space-y-6">
            {work.map((w) => (
              <Tilt key={w.n} className="reveal p-6 md:p-9">
                <div className="relative grid md:grid-cols-12 gap-6">
                  <span className="font-display text-4xl md:text-5xl text-white/35 md:col-span-1">{w.n}</span>
                  <div className="md:col-span-8">
                    <p className="eyebrow !text-[0.68rem]">{w.cat} <span className="mx-1">•</span> 2026</p>
                    <h3 className="font-display text-2xl md:text-4xl font-semibold mt-3">{w.name}</h3>
                    <p className="mt-4 text-sm md:text-[0.95rem] text-(--color-mute) leading-relaxed max-w-2xl">{w.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-3">{w.stack.map((s) => (<li key={s} className="pill">{s}</li>))}</ul>
                  </div>
                  <div className="md:col-span-3 flex flex-col md:items-end gap-3">
                    <Magnetic>
                      <a href={w.links[0][1]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold tracking-wider uppercase px-5 py-3 rounded-sm shadow-[0_0_28px_rgba(255,255,255,.3)] hover:shadow-[0_0_44px_rgba(255,255,255,.55)] transition-shadow focus-visible:ring-2 focus-visible:ring-(--color-gold)">
                        {w.links[0][0]} <ArrowRight size={14} />
                      </a>
                    </Magnetic>
                    <div className="flex flex-wrap md:justify-end gap-x-5 gap-y-1 mt-1">
                      {w.links.slice(1).map(([l, u]) => (<a key={l} href={u} target="_blank" rel="noreferrer" className="lnk-sm">{l}<ArrowUpRight size={12} /></a>))}
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </section>

        <section id="experience" className={`${wrap} pb-28 md:pb-36 scroll-mt-10`}>
          <SecHead eyebrow="Journey" a="Experience &" b="Recognition" />
          <div className="grid lg:grid-cols-2 gap-6">
            {exp.map((e) => (
              <Tilt key={e.org} className="reveal p-8">
                <p className="eyebrow !text-[0.68rem] !text-(--color-gold)">{e.when} · Remote</p>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mt-3">{e.role}</h3>
                <p className="text-white/70 italic font-display mt-1">{e.org}</p>
                <ul className="mt-5 space-y-3 text-sm text-(--color-mute) leading-relaxed">{e.pts.map((p) => (<li key={p} className="flex gap-3"><span className="text-(--color-gold)">—</span>{p}</li>))}</ul>
              </Tilt>
            ))}
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awards.map(([a, b]) => (
              <Tilt key={a} className="reveal p-7">
                <div className="font-display text-3xl italic text-(--color-gold)">{a}</div>
                <p className="mt-3 text-sm text-(--color-mute) leading-relaxed">{b}</p>
              </Tilt>
            ))}
          </div>
        </section>

        <section id="contact" className="relative bg-black border-t border-(--color-line) overflow-hidden scroll-mt-10">
          <div className={`${wrap} pt-24 pb-10 grid md:grid-cols-2 gap-14`}>
            <div className="reveal">
              <p className="eyebrow mb-3">Contact</p>
              <h2 className="h2">Let’s Create <br /><em>Together</em></h2>
              <p className="mt-6 text-(--color-mute) max-w-md leading-relaxed">Hiring for an ML, data or backend role, or have a project in mind? I’d love to hear about it.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Magnetic><a href={`mailto:${EMAIL}`} className="btn-gold inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase px-7 py-4 rounded-sm focus-visible:ring-2 focus-visible:ring-white"><Mail size={15} /> Email me</a></Magnetic>
                <Magnetic><a href="/Kavin-Gupta-Resume.pdf" download className="btn-silver inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase px-7 py-4 rounded-sm focus-visible:ring-2 focus-visible:ring-white"><Download size={15} /> Resume</a></Magnetic>
              </div>
            </div>
            <ul className="reveal space-y-6 md:pt-10">
              {[
                [<Mail />, "Email", EMAIL, `mailto:${EMAIL}`],
                [<Phone />, "Phone", "+91 91199 85914", "tel:+919119985914"],
                [<Linkedin />, "LinkedIn", "kavin-gupta-509b8a321", LI],
                [<Github />, "GitHub", "KAVINGUPTA09", GH],
                [<Instagram />, "Instagram", "kavin_rs_45", IG],
                [<Code2 />, "LeetCode", "kavin_rs_45", LC],
              ].map(([ic, l, v, u], i) => (
                <li key={i}>
                  <a href={u as string} target={(u as string).startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-5">
                    <span className="size-7 text-white [&>svg]:size-full group-hover:text-(--color-gold) transition-colors">{ic}</span>
                    <span><span className="block font-display text-sm text-white/60">{l as string}</span><span className="block text-sm font-semibold group-hover:text-(--color-gold) transition-colors break-all">{v as string}</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden className="ghost font-display font-semibold text-center leading-none select-none text-[clamp(3.5rem,15vw,13rem)] pb-6 whitespace-nowrap">Kavin Gupta</div>
          <footer className="relative z-10 border-t border-(--color-line) py-5 text-center text-xs text-(--color-mute)"><b className="text-white">KG</b> © 2026 Kavin Gupta</footer>
        </section>
      </main>
    </div>
  );
}
