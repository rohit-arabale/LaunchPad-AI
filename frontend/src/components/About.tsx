import React, { useRef, useEffect, useState } from 'react'

const CARDS = [
  {
    number: '01',
    title: 'Decode the Job Description',
    description:
      'Our GenAI performs a deep semantic analysis of your resume against any JD to reveal your true compatibility score and identify critical skill gaps.',
    icon: '⌖',
    accent: 'rgba(0, 229, 194, 0.7)',   // cyan — logo start colour
  },
  {
    number: '02',
    title: 'Anticipate the Interview',
    description:
      "Get a curated list of technical and behavioral challenges generated specifically from the intersection of your experience and the role's requirements.",
    icon: '◈',
    accent: 'rgba(56, 152, 255, 0.7)',   // mid blue
  },
  {
    number: '03',
    title: 'Bridge the Gap',
    description:
      "LaunchPad AI provides a prioritized task list—from refining specific resume bullet points to mastering missing concepts—ensuring you're 100% ready by interview day.",
    icon: '⟡',
    accent: 'rgba(0, 102, 255, 0.7)',    // blue — logo end colour
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect() }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function Card({ number, title, description, icon, accent, inView, delay }: {
  number: string; title: string; description: string;
  icon: string; accent: string; inView: boolean; delay: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col gap-5 rounded-2xl p-7 cursor-default overflow-hidden"
      style={{
        background: hovered
          ? `rgba(255,255,255,0.05)`
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? accent.replace('0.7', '0.35') : 'rgba(255,255,255,0.08)'}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.98)',
        transition: `opacity 0.6s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     transform 0.6s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     border-color 0.35s ease,
                     background 0.35s ease`,
        boxShadow: hovered
          ? `0 0 0 1px ${accent.replace('0.7', '0.15')}, 0 20px 60px -12px ${accent.replace('0.7', '0.15')}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : '0 0 0 0 transparent',
      }}
    >
      {/* Top glow — accent colour on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${accent.replace('0.7', '0.08')} 0%, transparent 70%)`,
        }}
      />

      {/* Number + Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="font-mono text-xs font-medium tracking-widest transition-colors duration-300"
          style={{ color: hovered ? accent : 'rgba(255,255,255,0.22)' }}
        >
          {number}
        </span>
        <span
          className="text-xl transition-all duration-300"
          style={{
            color: hovered ? accent : 'rgba(255,255,255,0.22)',
            transform: hovered ? 'scale(1.18) rotate(-6deg)' : 'scale(1) rotate(0deg)',
            filter: hovered ? `drop-shadow(0 0 6px ${accent.replace('0.7', '0.5')})` : 'none',
          }}
        >
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3
        className="relative z-10 font-semibold leading-snug transition-colors duration-300"
        style={{
          fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
          letterSpacing: '-0.02em',
          color: hovered ? '#ffffff' : 'rgba(255,255,255,0.9)',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="relative z-10 leading-relaxed text-sm transition-colors duration-300"
        style={{ color: hovered ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.4)' }}
      >
        {description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none transition-all duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(to right, transparent, ${accent.replace('0.7', '0.4')}, transparent)`,
        }}
      />
    </div>
  )
}

function About() {
  const { ref, inView } = useInView()

  return (
    <section
      id="features"
      ref={ref}
      className="relative z-10 w-full pt-4 pb-24 px-4 sm:px-6"
      style={{ fontFamily: "'Geist Variable', 'Geist', sans-serif" }}
    >
      {/* ── Subtle divider ── */}
      <div className="max-w-5xl mx-auto mb-16">
        <div
          className="w-full h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
          }}
        />
      </div>

      {/* ── Section header ── */}
      <div className="max-w-5xl mx-auto mb-12 flex flex-col items-center text-center gap-3">
        <h2
          className="font-semibold text-white leading-none tracking-tight"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          Eliminate the guesswork.
        </h2>
        <p
          className="font-medium"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            color: 'rgba(255,255,255,0.38)',
            letterSpacing: '-0.01em',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(18px)',
            transition:
              'opacity 0.6s 0.12s cubic-bezier(0.16,1,0.3,1), transform 0.6s 0.12s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          Take the first step with us.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {CARDS.map(({ number, title, description, icon, accent }, i) => (
          <Card
            key={number}
            number={number}
            title={title}
            description={description}
            icon={icon}
            accent={accent}
            inView={inView}
            delay={0.22 + i * 0.12}
          />
        ))}
      </div>
    </section>
  )
}

export default About