"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  Cpu,
  ExternalLink,
  GraduationCap,
  Landmark,
  Menu,
  Network,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const stories = [
  {
    kicker: "01 / JALINAN",
    title: "Platform Komuniti",
    copy: "Mempertemukan profesional teknologi, founder, pelajar, komuniti dan organisasi dalam ruang yang sama supaya bakat yang selama ini terpisah mula saling terlihat.",
    image: "/assets/hero-community.webp",
    imageAlt: "Ahli komuniti teknologi Kedah bergambar bersama selepas satu sesi komuniti",
    metric: "Komuniti",
    metricLabel: "Bakat × Founder × Pelajar",
    tone: "green",
  },
  {
    kicker: "02 / LONJAKKAN",
    title: "Memacu Ekonomi Digital",
    copy: "KTV menggerakkan kesedaran, perbualan dan kolaborasi yang boleh membuka jalan kepada lebih banyak syarikat teknologi, pelaburan, pekerjaan berkemahiran tinggi dan projek digital.",
    image: "/assets/strategy-digital-economy.webp",
    imageAlt: "Sketchnote membesarkan kek ekonomi digital Kedah",
    metric: "4 hasil",
    metricLabel: "Ekonomi digital Kedah",
    tone: "gold",
  },
  {
    kicker: "03 / HUBUNGKAN",
    title: "Industri × Akademia × Agensi",
    copy: "Merapatkan keperluan industri, kekuatan akademia dan keupayaan agensi supaya idea, bakat dan peluang tidak lagi bergerak secara berasingan.",
    image: "/assets/event-speaker-wide.webp",
    imageAlt: "Sesi perkongsian industri dan komuniti di Kedah",
    metric: "3 sektor",
    metricLabel: "Satu meja kolaborasi",
    tone: "cyan",
  },
  {
    kicker: "04 / SELARASKAN",
    title: "Ekosistem Teknologi Strategik",
    copy: "Sebagai connective tissue, KTV membantu menyusun hubungan antara komuniti, syarikat, agensi dan institusi. Jaringan ini kemudian disusun menjadi gerakan yang lebih terarah.",
    image: "/assets/strategy-connective-tissue.webp",
    imageAlt: "Sketchnote Kedah Tech Valley sebagai connective tissue",
    metric: "Ekosistem",
    metricLabel: "Jaringan yang berkembang",
    tone: "violet",
  },
] as const;

const galleryItems = [
  {
    src: "/assets/community-network.webp",
    alt: "Komuniti teknologi Kedah dalam satu acara ekosistem",
    caption: "Komuniti Teknologi Digital Kedah",
  },
  {
    src: "/assets/committee-gathering.webp",
    alt: "Peserta program Kedah Tech Valley bersama peserta dalam talian",
    caption: "Industri × Akademia × Kerajaan",
  },
  {
    src: "/assets/community-portrait.webp",
    alt: "Ahli komuniti Kedah Tech Valley selepas sesi Kedah Tech Talk",
    caption: "Driving Kedah’s Digital Future",
  },
  {
    src: "/assets/ktv-recognition.webp",
    alt: "Wakil Kedah Tech Valley dalam sesi jaringan komuniti",
    caption: "Sokongan Jaringan Komuniti & Agensi",
  },
  {
    src: "/assets/event-audience.webp",
    alt: "Peserta mendengar sesi perkongsian teknologi",
    caption: "Ilmu Yang Menghubungkan",
  },
] as const;

const ecosystemGroups = [
  {
    key: "community",
    eyebrow: "Komuniti",
    title: "Komuniti Terjalin",
    description: "Gerakan akar umbi yang menghimpunkan builder, founder dan warga teknologi.",
    names: ["Amanz Digital", "Kracked Dev", "TechTamu × Noobs", "TechSamana"],
    icon: Users,
    className: "network-node--community",
  },
  {
    key: "agency",
    eyebrow: "Pemudah cara",
    title: "Agensi Penting",
    description: "Rujukan ekosistem untuk dasar, pembangunan wilayah dan peluang sokongan.",
    names: ["Kedah Digital Centre", "Kulim Hi-Tech Park", "MDEC Northern", "Yayasan Kedah Sejahtera", "NCER", "Cradle Fund"],
    icon: Landmark,
    className: "network-node--agency",
  },
  {
    key: "industry",
    eyebrow: "Pelaksana",
    title: "Industri Teknologi",
    description: "Syarikat teknologi dan SME digital yang membina, menggaji dan membawa solusi ke pasaran.",
    names: ["Exabytes", "Local Tech SMEs", "Founders", "Technology Builders"],
    icon: Cpu,
    className: "network-node--industry",
  },
  {
    key: "strategic",
    eyebrow: "Kolaborasi",
    title: "Organisasi Strategik",
    description: "Organisasi yang mahu menyumbang kepakaran, akses, ruang dan peluang kepada ekosistem.",
    names: ["Institusi akademik", "Syarikat korporat", "Komuniti profesional", "Organisasi strategik"],
    icon: Building2,
    className: "network-node--strategic",
  },
] as const;

const memberships = [
  {
    title: "Ahli Profesional",
    label: "Profesional teknologi",
    copy: "Untuk individu berkelayakan dalam IT atau berpengalaman dalam industri teknologi dan digital.",
    detail: "Cadangan: yuran berbayar dan akses pentadbiran.",
    icon: Cpu,
  },
  {
    title: "Ahli Penyokong",
    label: "Penggerak komuniti",
    copy: "Untuk individu yang mahu membantu gerak kerja, program dan pembangunan komuniti PPTDK.",
    detail: "Cadangan: yuran berbayar dan akses pentadbiran.",
    icon: Users,
  },
  {
    title: "Ahli Pelajar",
    label: "Generasi seterusnya",
    copy: "Terbuka kepada pelajar sekolah, kolej dan universiti yang mahu mengenali industri teknologi.",
    detail: "Cadangan: tanpa yuran dan tanpa akses pentadbiran.",
    icon: GraduationCap,
  },
  {
    title: "Organisasi Korporat",
    label: "Pemacu industri",
    copy: "Untuk syarikat atau agensi yang mahu bersama menggerakkan program dan peluang ekosistem.",
    detail: "Cadangan: yuran berbayar dan akses pentadbiran.",
    icon: Building2,
  },
  {
    title: "Ahli Awam",
    label: "Terbuka untuk semua",
    copy: "Bina jaringan, tingkatkan kemahiran, kongsi pengetahuan dan sertai inisiatif teknologi digital.",
    detail: "Struktur semasa: tanpa yuran dan tanpa akses pentadbiran.",
    icon: Sparkles,
  },
  {
    title: "Organisasi Strategik",
    label: "Kolaborator ekosistem",
    copy: "Untuk organisasi yang bekerjasama secara strategik memperkukuh teknologi dan ekonomi digital Kedah.",
    detail: "Struktur semasa: tanpa yuran dan tanpa akses pentadbiran.",
    icon: Network,
  },
] as const;

const navigation = [
  ["Tentang", "#tentang"],
  ["Model KTV", "#model"],
  ["Ekosistem", "#ekosistem"],
  ["Keahlian", "#keahlian"],
  ["Aktiviti", "#aktiviti"],
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) return;
    const duration = 1300;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, inView, reduceMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {reduceMotion ? end : value}
      {suffix}
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Kedah Tech Valley, kembali ke atas">
        <img src="/assets/ktv-logo.png" alt="Kedah Tech Valley" />
      </a>
      <nav className="desktop-nav" aria-label="Navigasi utama">
        {navigation.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-cta shine-button" href="#hubungi">
        Jadi rakan strategik <ArrowRight size={15} />
      </a>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Navigasi mudah alih"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            {navigation.map(([label, href], index) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span>0{index + 1}</span> {label}
              </motion.a>
            ))}
            <a href="#hubungi" onClick={() => setOpen(false)}>
              Hubungi KTV <ArrowRight size={16} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <span
          key={index}
          style={{
            left: `${7 + ((index * 23) % 88)}%`,
            top: `${9 + ((index * 31) % 82)}%`,
            animationDelay: `${(index % 7) * -0.8}s`,
            animationDuration: `${5 + (index % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.85], [1.15, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const gridOpacity = useTransform(scrollYProgress, [0.05, 0.42], [0.08, 0.6]);
  const headlineY = useTransform(scrollYProgress, [0, 0.68], [0, -82]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.92, 0.25]);
  const heroMarkScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.88]);
  const heroMarkOpacity = useTransform(scrollYProgress, [0, 0.75], [0.18, 0.02]);
  const cardOneY = useTransform(scrollYProgress, [0, 1], [0, -125]);
  const cardTwoY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const cardThreeY = useTransform(scrollYProgress, [0, 1], [0, -168]);

  return (
    <section ref={sectionRef} className="hero-scroll" id="top">
      <div className="hero-stage">
        <motion.div
          className="hero-photo-wrap"
          style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
        >
          <img
            className="hero-photo"
            src="/assets/hero-community.webp"
            alt="Komuniti teknologi digital Kedah bersama selepas sesi komuniti"
            fetchPriority="high"
          />
        </motion.div>
        <div className="hero-shade" />
        <motion.div className="digital-grid" style={reduceMotion ? undefined : { opacity: gridOpacity }} />
        
        <ParticleField />
        <motion.img
          className="hero-watermark"
          src="/assets/ktv-logo.png"
          alt=""
          aria-hidden="true"
          style={reduceMotion ? undefined : { scale: heroMarkScale, opacity: heroMarkOpacity }}
        />

        <motion.div
          className="hero-copy"
          style={reduceMotion ? undefined : { y: headlineY, opacity: headlineOpacity }}
        >
          <div className="hero-kicker">
            <span /> PERTUBUHAN PROFESIONAL TEKNOLOGI DIGITAL KEDAH
          </div>
          <h1>
            Merancakkan
            <br />
            <em>Ekonomi Digital</em>
            <br />
            Kedah
          </h1>
          <p>
            Menghubungkan bakat, industri, akademia, agensi dan komuniti untuk memacu masa depan digital Kedah.
          </p>
          <div className="hero-actions">
            <a className="primary-button shine-button" href="#keahlian">
              Sertai komuniti <ArrowRight size={18} />
            </a>
            <a className="text-button" href="#model">
              Teroka ekosistem <ArrowDown size={17} />
            </a>
          </div>
        </motion.div>

        <motion.div className="metric-position metric-position--one" style={reduceMotion ? undefined : { y: cardOneY }}>
          <div className="metric-card-mobile-scale">
            <div className="metric-card float-loop">
              <span className="metric-dot" />
              <strong>Sejak 2020</strong>
              <small>MENYALAKAN CETUSAN TEKNOLOGI NEGERI</small>
            </div>
          </div>
        </motion.div>
        <motion.div className="metric-position metric-position--two" style={reduceMotion ? undefined : { y: cardTwoY }}>
          <div className="metric-card metric-card--gold float-loop float-loop--slow">
            <span>STATUS</span>
            <strong>PPTDK</strong>
            <small>BERDAFTAR PADA · 21.04.2026</small>
          </div>
        </motion.div>
        <motion.div className="metric-position metric-position--three" style={reduceMotion ? undefined : { y: cardThreeY }}>
          <div className="metric-card-mobile-scale">
            <div className="metric-card metric-card--wide float-loop float-loop--reverse">
              <span>ECOSYSTEM SIGNAL</span>
              <strong>3 × 1 = ∞</strong>
              <small>Industri × Akademia × Kerajaan</small>
              <div className="mini-bars" aria-hidden="true">
                <i /><i /><i /><i /><i />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="hero-side-label">DRIVING KEDAH’S DIGITAL FUTURE · 2025 TO NOW</div>
        <div className="hero-scroll-cue">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </div>
    </section>
  );
}

function StoryStep({
  story,
  index,
  active,
  onActive,
}: {
  story: (typeof stories)[number];
  index: number;
  active: boolean;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-36% 0px -44% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <article ref={ref} className={`story-step ${active ? "is-active" : ""}`}>
      <span className="story-number">0{index + 1}</span>
      <div>
        <p className="eyebrow">{story.kicker}</p>
        <h3>{story.title}</h3>
        <p className="story-copy">{story.copy}</p>
        <div className="story-progress"><span /></div>
      </div>
    </article>
  );
}

function StoryDocumentary() {
  const [active, setActive] = useState(0);
  const current = stories[active];

  return (
    <section className="documentary-section" id="tentang">
      <div className="section-intro section-shell">
        <Reveal>
          <p className="eyebrow"><span>01</span> TENTANG KTV</p>
          <h2>Satu platform.<br /><em>Menghubungi seluruh ekosistem.</em></h2>
        </Reveal>
        <Reveal delay={0.12} className="section-lead-wrap">
          <p className="section-lead">
            Kedah mempunyai bakat, organisasi dan peluang. KTV dibina untuk membantu semua titik ini bergerak sebagai satu ekosistem yang lebih terlihat, tersusun dan berimpak.
          </p>
        </Reveal>
      </div>

      <div className="story-layout section-shell">
        <div className={`story-visual story-tone--${current.tone}`}>
          <div className="story-grid" />
          <div className="story-orbit story-orbit--one" />
          <div className="story-orbit story-orbit--two" />
          <AnimatePresence mode="wait">
            <motion.img
              key={current.image}
              src={current.image}
              alt={current.imageAlt}
              initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          <div className="story-visual-shade" />
          <div className="story-signal">
            <span className="signal-live"><i /> EKOSISTEM DINAMIK</span>
            <strong>{current.metric}</strong>
            <small>{current.metricLabel}</small>
          </div>
          <div className="story-data-card">
            <span>TAHAP KETERHUBUNGAN</span>
            <strong>ACTIVE</strong>
            <div className="data-wave"><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="node node--a" />
          <div className="node node--b" />
          <div className="node node--c" />
          <span className="visual-index">0{active + 1} / 04</span>
        </div>
        <div className="story-rail">
          {stories.map((story, index) => (
            <StoryStep
              key={story.title}
              story={story}
              index={index}
              active={active === index}
              onActive={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStrip() {
  return (
    <section className="impact-strip section-shell" aria-label="Ringkasan impak dan struktur KTV">
      <Reveal className="impact-item">
        <strong>Sejak 2020</strong>
        <span>Gerakan yang konsisten</span>
      </Reveal>
      <Reveal className="impact-item" delay={0.08}>
        <strong><CountUp end={4} suffix=" Teras" /></strong>
        <span>Hasil ekonomi disasar</span>
      </Reveal>
      <Reveal className="impact-item" delay={0.16}>
        <strong><CountUp end={6} suffix=" Jenis" /></strong>
        <span>Keahlian dicadang</span>
      </Reveal>
      <Reveal className="impact-item" delay={0.24}>
        <strong><CountUp end={2026} prefix="Tahun " /></strong>
        <span>PPTDK didaftarkan</span>
      </Reveal>
    </section>
  );
}

function StrategyModel() {
  const strategyCards = [
    {
      src: "/assets/strategy-bridge.webp",
      alt: "Sketchnote KTV sebagai jambatan",
      number: "01",
      title: "KTV sebagai jambatan",
      copy: "Menyambungkan bakat yang ada kepada peluang yang ada.",
    },
    {
      src: "/assets/strategy-connective-tissue.webp",
      alt: "Sketchnote KTV sebagai connective tissue",
      number: "02",
      title: "KTV sebagai connective tissue",
      copy: "Menguatkan hubungan antara pemain yang sudah wujud.",
    },
    {
      src: "/assets/strategy-momentum.webp",
      alt: "Visual Roda Momentum Kedah Tech Valley",
      number: "03",
      title: "Roda momentum KTV",
      copy: "Gerakan berulang daripada visibility kepada peluang dan impak.",
    },
  ];

  return (
    <section className="strategy-section" id="model">
      <div className="section-shell">
        <div className="split-heading">
          <Reveal>
            <p className="eyebrow"><span>02</span> MODEL GERAKAN</p>
            <h2>Bukan sekadar acara.<br /><em>Tapi jaringan yang menggerakkan ekosistem.</em></h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-lead">
              Peranan KTV ialah menyelaraskan hubungan dengan membantu bakat, industri, akademia dan agensi menemui konteks serta peluang yang betul.
            </p>
          </Reveal>
        </div>

        <div className="opportunity-panel">
          <Reveal className="opportunity-copy">
            <span className="eyebrow">CABARAN → PELUANG</span>
            <h3>Kedah bukan kurang bakat. Kedah perlukan momentum.</h3>
            <p>
              Daripada isu brain drain kepada peluang membesarkan “kek” ekonomi digital, strategi bermula dengan menjadikan bakat dan keupayaan tempatan lebih terlihat.
            </p>
          </Reveal>
          <div className="opportunity-images">
            <Reveal className="opportunity-image opportunity-image--back" delay={0.08}>
              <img loading="lazy" src="/assets/strategy-brain-drain.webp" alt="Sketchnote brain drain Kedah" />
            </Reveal>
            <Reveal className="opportunity-image opportunity-image--front" delay={0.18}>
              <img loading="lazy" src="/assets/strategy-digital-economy.webp" alt="Sketchnote membesarkan kek ekonomi digital" />
            </Reveal>
          </div>
        </div>

        <div className="strategy-grid">
          {strategyCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.09}>
              <article className="strategy-card" tabIndex={0}>
                <div className="strategy-image">
                  <img loading="lazy" src={card.src} alt={card.alt} />
                  <div className="strategy-overlay">
                    <span>Lihat visual</span><ArrowRight size={17} />
                  </div>
                </div>
                <div className="strategy-card-copy">
                  <span>{card.number}</span>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemNetwork() {
  const [active, setActive] = useState<string | null>("community");

  return (
    <section className="ecosystem-section" id="ekosistem">
      <div className="section-shell">
        <div className="split-heading ecosystem-heading">
          <Reveal>
            <p className="eyebrow"><span>03</span> KEKUATAN & SOKONGAN JARINGAN</p>
            <h2>Satu ekosistem.<br /><em>Satu gelombang kebangkitan.</em></h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-lead">
              Jaringan dan sokongan ekosistem yang sedang berkembang. Senarai ini ialah rujukan ekosistem dan bukan tuntutan endorsement atau perkongsian undang-undang.
            </p>
          </Reveal>
        </div>

        <Reveal className="network-frame">
          <div className={`network-canvas ${active ? "has-active" : ""}`} onMouseLeave={() => setActive(null)}>
            <div className="network-grid" />
            <svg className="network-svg" viewBox="0 0 1000 620" aria-hidden="true">
              <path className={active === "community" ? "is-active" : ""} d="M500 310 C395 280, 310 160, 185 125" />
              <path className={active === "agency" ? "is-active" : ""} d="M500 310 C610 270, 700 145, 825 125" />
              <path className={active === "industry" ? "is-active" : ""} d="M500 310 C395 355, 305 470, 185 505" />
              <path className={active === "strategic" ? "is-active" : ""} d="M500 310 C610 360, 700 480, 825 505" />
            </svg>
            <div className="network-center" aria-label="Kedah Tech Valley, pusat jaringan">
              <img src="/assets/ktv-logo.png" alt="Kedah Tech Valley" />
              <span>TERAS EKOSISTEM</span>
              <div className="center-pulse" />
            </div>

            {ecosystemGroups.map((group) => {
              const Icon = group.icon;
              const isActive = active === group.key;
              return (
                <button
                  key={group.key}
                  type="button"
                  className={`network-node-card ${group.className} ${isActive ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(group.key)}
                  onFocus={() => setActive(group.key)}
                  aria-pressed={isActive}
                >
                  <span className="network-node-icon"><Icon size={20} /></span>
                  <span>
                    <small>{group.eyebrow}</small>
                    <strong>{group.title}</strong>
                  </span>
                  <i />
                </button>
              );
            })}

            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active}
                  className="network-tooltip"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  {ecosystemGroups
                    .filter((group) => group.key === active)
                    .map((group) => (
                      <div key={group.key}>
                        <p>{group.description}</p>
                        <div>
                          {group.names.map((name) => <span key={name}>{name}</span>)}
                        </div>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Membership() {
  return (
    <section className="membership-section" id="keahlian">
      <div className="section-shell">
        <div className="split-heading">
          <Reveal>
            <p className="eyebrow"><span>04</span> KEAHLIAN</p>
            <h2>Bawa kepakaran anda.<br /><em>Kita bina impak bersama.</em></h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="draft-note"><i /><span>Struktur enam kategori masih dalam perbincangan dan tertakluk kepada pemuktamadan PPTDK.</span></div>
          </Reveal>
        </div>

        <div className="membership-grid">
          {memberships.map((membership, index) => {
            const Icon = membership.icon;
            return (
              <Reveal key={membership.title} delay={(index % 3) * 0.07}>
                <article className="membership-card" tabIndex={0}>
                  <div className="membership-topline"><span>0{index + 1}</span><Icon size={21} /></div>
                  <small>{membership.label}</small>
                  <h3>{membership.title}</h3>
                  <p>{membership.copy}</p>
                  <div className="membership-detail">
                    <span><Check size={15} /> {membership.detail}</span>
                  </div>
                  <div className="membership-arrow"><ArrowRight size={17} /></div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery-section" id="aktiviti">
      <div className="section-shell">
        <div className="split-heading">
          <Reveal>
            <p className="eyebrow"><span>05</span> AKTIVITI & PROGRAM</p>
            <h2>Gerakan sebenar.<br /><em>Wajah sebenar.</em></h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-lead">Imej sebenar daripada sesi komuniti, perkongsian industri dan pertemuan ekosistem Kedah Tech Valley.</p>
          </Reveal>
        </div>

        <div className="gallery-feature">
          <Reveal className="gallery-main">
            <figure>
              <img loading="lazy" src="/assets/community-network.webp" alt="Komuniti teknologi digital Kedah" />
              <figcaption><span>01</span> Komuniti Teknologi Digital Kedah</figcaption>
            </figure>
          </Reveal>
          <div className="gallery-stack">
            <Reveal delay={0.08}>
              <figure>
                <img loading="lazy" src="/assets/event-speaker-wide.webp" alt="Sesi perkongsian teknologi di Kedah" />
                <figcaption><span>02</span> Industri × Akademia × Kerajaan</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.16}>
              <figure>
                <img loading="lazy" src="/assets/ktv-recognition.webp" alt="Sesi jaringan Kedah Tech Valley" />
                <figcaption><span>03</span> Jaringan yang berkembang</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="gallery-marquee" aria-label="Galeri bergerak aktiviti Kedah Tech Valley">
        <div className="gallery-track">
          {[...galleryItems, ...galleryItems].map((item, index) => (
            <figure key={`${item.src}-${index}`}>
              <img loading="lazy" src={item.src} alt={index < galleryItems.length ? item.alt : ""} aria-hidden={index >= galleryItems.length} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="section-shell event-grid">
        <Reveal>
          <a className="event-card event-card--portrait" href="/assets/ktt5-poster.webp" target="_blank" rel="noreferrer">
            <img loading="lazy" src="/assets/ktt5-poster.webp" alt="Poster Kedah Tech Talk 5" />
            <div className="event-card-overlay">
              <span>29 MAC 2026 · ALOR SETAR + ONLINE</span>
              <h3>Re-Wiring Kedah: AI, Community & The Future</h3>
              <p>Lihat butiran <ExternalLink size={15} /></p>
            </div>
          </a>
        </Reveal>
        <Reveal delay={0.08}>
          <a className="event-card" href="/assets/nortech-poster.webp" target="_blank" rel="noreferrer">
            <img loading="lazy" src="/assets/nortech-poster.webp" alt="Poster NorTech Mei 2026" />
            <div className="event-card-overlay">
              <span>23 MEI 2026 · SUNGAI PETANI</span>
              <h3>NorTech: A Meetup for Builders & Business Owners</h3>
              <p>Lihat butiran <ExternalLink size={15} /></p>
            </div>
          </a>
        </Reveal>
        <Reveal delay={0.16}>
          <article className="event-card">
            <img loading="lazy" src="/assets/committee-gathering.webp" alt="Peserta sesi Kedah Tech Valley" />
            <div className="event-card-overlay">
              <span>EKOSISTEM KTV</span>
              <h3>Jaringan komuniti, industri dan organisasi strategik</h3>
              <p>Driving Kedah’s Digital Future <ArrowRight size={15} /></p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="hubungi">
      <div className="contact-photo">
        <img loading="lazy" src="/assets/community-portrait.webp" alt="Komuniti Kedah Tech Valley" />
      </div>
      <div className="contact-shade" />
      <div className="contact-grid" />
      <ParticleField />
      <div className="section-shell contact-inner">
        <Reveal>
          <p className="eyebrow"><span>06</span> BINA BERSAMA</p>
          <h2>Bina masa depan digital<br />Kedah <em>bersama kami.</em></h2>
        </Reveal>
        <Reveal delay={0.12} className="contact-copy">
          <p>
            Sama ada anda agensi, institusi akademik, syarikat teknologi, pelabur, founder, pelajar atau komuniti, KTV membuka ruang untuk kolaborasi yang lebih tersusun dan berimpak.
          </p>
          <div className="contact-actions">
            <a className="primary-button shine-button" href="https://linktr.ee/CommitteeOfKedahTechValley" target="_blank" rel="noreferrer">
              Kenali jawatankuasa <ExternalLink size={17} />
            </a>
            <a className="outline-button" href="#keahlian">Teroka keahlian <ArrowRight size={17} /></a>
          </div>
        </Reveal>
        <div className="contact-metric glass-panel">
          <span>OFFICIAL ENTITY</span>
          <strong>PPTDK</strong>
          <small>PPM-010-02-21042026</small>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-mark" aria-hidden="true">KEDAH</div>
      <div className="section-shell footer-grid">
        <div className="footer-brand">
          <img src="/assets/ktv-logo.png" alt="Kedah Tech Valley" />
          <p>Merancakkan Ekonomi Digital Kedah.</p>
        </div>
        <div>
          <span>EXPLORE</span>
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <div>
          <span>CONNECT</span>
          <a href="https://linktr.ee/CommitteeOfKedahTechValley" target="_blank" rel="noreferrer">Jawatankuasa <ExternalLink size={12} /></a>
          <a href="#hubungi">Kerjasama strategik</a>
          <a href="#keahlian">Sertai komuniti</a>
        </div>
        <div className="footer-entity">
          <span>DRIVEN BY</span>
          <strong>PERTUBUHAN PROFESIONAL<br />TEKNOLOGI DIGITAL KEDAH</strong>
          <small>PPM-010-02-21042026</small>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© 2026 Kedah Tech Valley</span>
        <span>Driving Kedah’s Digital Future</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Header />
      <Hero />
      <StoryDocumentary />
      <ImpactStrip />
      <StrategyModel />
      <EcosystemNetwork />
      <Membership />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
