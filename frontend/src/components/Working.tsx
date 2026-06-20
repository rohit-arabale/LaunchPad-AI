import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'motion/react'
import { Upload, FileText, Sparkles } from 'lucide-react'

/* ─── Step definitions ──────────────────────────────────────── */
const STEPS = [
  {
    number: '01',
    label: 'Source Ingestion',
    headline: 'Drop your resume. We handle the rest.',
    body: 'Our parser extracts every signal from your PDF—roles, skills, achievements, tenure—building a rich semantic profile that forms the foundation of your analysis.',
    accent: '#00e5c2',
    ui: 'upload',
  },
  {
    number: '02',
    label: 'Neural Analysis',
    headline: 'Gemini 2.5 Flash at the core.',
    body: 'Your profile is matched against the target JD by our Gemini 2.5 Flash engine, surfacing a precise compatibility score and mapping every gap with contextual clarity.',
    accent: '#3898ff',
    ui: 'orb',
  },
  {
    number: '03',
    label: 'Plan LaunchPad AIment',
    headline: 'Your personalised roadmap, ready.',
    body: 'LaunchPad AI synthesises the analysis into a ranked preparation checklist with your match score—so you walk into every interview knowing exactly where you stand.',
    accent: '#0066ff',
    ui: 'checklist',
  },
]

/* ─── Mini UI: Upload card ──────────────────────────────────── */
function UploadCard({ accent }: { accent: string }) {
  return (
    <div
      className="w-full rounded-xl p-5 flex flex-col items-center gap-3"
      style={{
        border: `1px dashed ${accent}55`,
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent}0d 0%, transparent 70%)`,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}
      >
        <Upload size={18} color={accent} />
      </div>
      <p className="text-xs text-zinc-400 text-center leading-relaxed">
        Drop your <span className="text-white font-medium">resume.pdf</span> here<br />
        or <span style={{ color: accent }}>browse files</span>
      </p>
      <div className="w-full flex items-center gap-2 mt-1">
        <FileText size={13} className="text-zinc-600 shrink-0" />
        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${accent}, #0066ff)` }}
            initial={{ width: '0%' }}
            animate={{ width: '78%' }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="text-xs text-zinc-500">78%</span>
      </div>
    </div>
  )
}

/* ─── Mini UI: Neural Orb ───────────────────────────────────── */
function NeuralOrb({ accent }: { accent: string }) {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        {/* Outer pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${accent}33` }}
            animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        {/* Core orb */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${accent}, #0066ff 60%, #001133)`,
            boxShadow: `0 0 28px ${accent}66, 0 0 60px ${accent}33`,
          }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Sparkle */}
        <motion.div
          className="absolute top-1 right-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles size={14} color={accent} />
        </motion.div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-zinc-500 font-mono">Gemini 2.5 Flash · active</span>
      </div>
    </div>
  )
}

/* ─── Mini UI: Checklist ────────────────────────────────────── */
const CHECKLIST = [
  { done: true,  text: 'Optimise System Design bullet points' },
  { done: true,  text: 'Study STAR format for PM experience' },
  { done: false, text: 'Deep-dive: Kubernetes orchestration' },
  { done: false, text: 'Practice 3 behavioural scenarios' },
]

function ChecklistPreview({ accent }: { accent: string }) {
  return (
    <div
      className="w-full rounded-xl p-4 flex flex-col gap-2"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-zinc-500">Match score</span>
        <span className="text-xs font-semibold" style={{ color: accent }}>82 / 100</span>
      </div>
      {CHECKLIST.map(({ done, text }, i) => (
        <motion.div
          key={i}
          className="flex items-start gap-2.5"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="mt-0.5 w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center"
            style={{
              background: done ? `${accent}22` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${done ? accent + '66' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            {done && (
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                <path d="M1 3.5L2.8 5.5L6 1.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className={`text-xs leading-relaxed ${done ? 'text-zinc-500 line-through decoration-zinc-600' : 'text-zinc-300'}`}>
            {text}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Single step row ───────────────────────────────────────── */
function Step({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {/* ── Text side ── */}
      <div className={`flex flex-col gap-4 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        {/* Step badge */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-xs tracking-widest font-semibold"
            style={{ color: step.accent }}
          >
            {step.number}
          </span>
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(to right, ${step.accent}44, transparent)` }}
          />
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              color: step.accent,
              background: `${step.accent}15`,
              border: `1px solid ${step.accent}30`,
            }}
          >
            {step.label}
          </span>
        </div>

        {/* Headline */}
        <h3
          className="font-semibold text-white leading-tight"
          style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            letterSpacing: '-0.025em',
          }}
        >
          {step.headline}
        </h3>

        {/* Body */}
        <p className="text-zinc-400 leading-relaxed text-sm max-w-sm">
          {step.body}
        </p>
      </div>

      {/* ── UI side ── */}
      <div
        className={`flex items-center justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}
      >
        <div
          className="w-full max-w-xs rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: `0 20px 60px -16px ${step.accent}22`,
          }}
        >
          {step.ui === 'upload'    && <UploadCard    accent={step.accent} />}
          {step.ui === 'orb'       && <NeuralOrb      accent={step.accent} />}
          {step.ui === 'checklist' && <ChecklistPreview accent={step.accent} />}
        </div>
      </div>

      {/* ── Timeline dot (desktop) ── */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{
            background: step.accent,
            boxShadow: `0 0 0 4px ${step.accent}22, 0 0 16px ${step.accent}66`,
          }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}

/* ─── Scrolling timeline line ───────────────────────────────── */
function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] })
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 80, damping: 20,
  })

  return (
    <div
      ref={ref}
      className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      <motion.div
        className="w-full origin-top"
        style={{
          scaleY,
          height: '100%',
          background: 'linear-gradient(to bottom, #00e5c2, #3898ff, #0066ff)',
          boxShadow: '0 0 12px #00e5c280',
        }}
      />
    </div>
  )
}

/* ─── Main export ───────────────────────────────────────────── */
export default function Working() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative z-10 w-full pt-10 pb-20 px-4 sm:px-6"
      style={{ fontFamily: "'Geist Variable', 'Geist', sans-serif" }}
    >
      {/* Divider */}
      <div className="max-w-5xl mx-auto mb-20">
        <div
          className="w-full h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
          }}
        />
      </div>

      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-20 flex flex-col items-center text-center gap-3">
        <motion.h2
          className="font-semibold text-white leading-none tracking-tight"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          How it works.
        </motion.h2>
        <motion.p
          className="font-medium"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            color: 'rgba(255,255,255,0.38)',
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          Three steps. Zero guesswork.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto relative">
        <TimelineLine />
        <div className="flex flex-col gap-14 md:gap-24">
          {STEPS.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}