import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Zap, Star, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ─── Tier data ─────────────────────────────────────────────── */
const TIERS = [
  {
    id: 'starter',
    icon: Zap,
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    tagline: 'Explore the basics, no strings attached.',
    accent: 'rgba(255,255,255,0.45)',
    accentHex: '#a1a1aa',
    popular: false,
    cta: 'Get started free',
    ctaVariant: 'ghost' as const,
    features: [
      { text: 'AI Match Score (3 analyses / mo)', included: true },
      { text: 'Personalised Questions (10 / mo)', included: true },
      { text: 'Day-by-Day Roadmap', included: false },
      { text: 'Behavioural Round Prep', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    id: 'professional',
    icon: Star,
    name: 'Professional',
    price: { monthly: 19, annual: 15 },
    tagline: 'Built for the serious job seeker.',
    accent: 'rgba(0, 229, 194, 0.85)',
    accentHex: '#00e5c2',
    popular: true,
    cta: 'Start free trial',
    ctaVariant: 'cyan' as const,
    features: [
      { text: 'AI Match Score (unlimited)', included: true },
      { text: 'Personalised Questions (unlimited)', included: true },
      { text: 'Day-by-Day Roadmap', included: true },
      { text: 'Behavioural Round Prep', included: true },
      { text: 'Priority support', included: false },
    ],
  },
  {
    id: 'elite',
    icon: Crown,
    name: 'Elite',
    price: { monthly: 39, annual: 29 },
    tagline: 'The complete arsenal for top-tier roles.',
    accent: 'rgba(56, 152, 255, 0.85)',
    accentHex: '#3898ff',
    popular: false,
    cta: 'Go Elite',
    ctaVariant: 'blue' as const,
    features: [
      { text: 'AI Match Score (unlimited)', included: true },
      { text: 'Personalised Questions (unlimited)', included: true },
      { text: 'Day-by-Day Roadmap', included: true },
      { text: 'Behavioural Round Prep', included: true },
      { text: 'Priority support', included: true },
    ],
  },
]

type Variant = 'ghost' | 'cyan' | 'blue'

function CtaButton({ label, variant, to }: { label: string; variant: Variant; to: string }) {
  const base = `
    relative w-full py-3 rounded-full text-sm font-semibold
    flex items-center justify-center gap-2 overflow-hidden
    transition-colors duration-200
  `
  const styles: Record<Variant, string> = {
    ghost: 'border border-white/12 text-white/70 hover:text-white hover:border-white/25 bg-white/3',
    cyan:  'bg-[#00e5c2] text-black hover:bg-[#00cead]',
    blue:  'border border-[#3898ff]/40 text-[#3898ff] hover:border-[#3898ff]/70 hover:bg-[#3898ff]/8 bg-transparent',
  }

  return (
    <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}>
      <Link to={to} className={`${base} ${styles[variant]}`}>
        {label}
      </Link>
    </motion.div>
  )
}

/* ─── Single pricing card ───────────────────────────────────── */
function PricingCard({ tier, annual }: { tier: typeof TIERS[0]; annual: boolean }) {
  const Icon = tier.icon
  const price = annual ? tier.price.annual : tier.price.monthly

  return (
    <motion.div
      className="relative flex flex-col gap-6 rounded-2xl p-7"
      style={{
        background: tier.popular
          ? 'rgba(0, 229, 194, 0.04)'
          : 'rgba(255,255,255,0.02)',
        border: tier.popular
          ? '1px solid rgba(0, 229, 194, 0.22)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: tier.popular
          ? '0 0 0 1px rgba(0,229,194,0.08), 0 24px 64px -16px rgba(0,229,194,0.18)'
          : 'none',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #00e5c2, #0066ff)',
            color: '#000',
            fontFamily: "'Geist Variable', sans-serif",
          }}
        >
          Most Popular
        </div>
      )}

      {/* Icon + name */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: `${tier.accentHex}18`,
            border: `1px solid ${tier.accentHex}30`,
          }}
        >
          <Icon size={16} color={tier.accentHex} />
        </div>
        <div>
          <p
            className="font-semibold text-white text-sm"
            style={{ letterSpacing: '-0.01em' }}
          >
            {tier.name}
          </p>
          <p className="text-xs text-zinc-500 leading-snug">{tier.tagline}</p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end gap-1.5">
        <span className="text-zinc-500 text-lg leading-none self-start mt-1">$</span>
        <motion.span
          key={`${tier.id}-${annual}`}
          className="text-white font-semibold leading-none"
          style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {price}
        </motion.span>
        <span className="text-zinc-500 text-sm mb-1">/ mo</span>
        {annual && tier.price.monthly > 0 && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full mb-1 ml-1"
            style={{ background: `${tier.accentHex}18`, color: tier.accentHex }}
          >
            Save ${(tier.price.monthly - tier.price.annual) * 12}/yr
          </span>
        )}
      </div>

      {/* CTA */}
      <CtaButton
        label={tier.cta}
        variant={tier.ctaVariant}
        to={tier.price.monthly === 0 ? '/register' : '/register'}
      />

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-3">
        {tier.features.map(({ text, included }) => (
          <li key={text} className="flex items-start gap-2.5">
            <div
              className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
              style={{
                background: included ? `${tier.accentHex}18` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${included ? tier.accentHex + '40' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {included ? (
                <Check size={9} color={tier.accentHex} strokeWidth={2.5} />
              ) : (
                <span style={{ width: 6, height: 1, background: 'rgba(255,255,255,0.15)', display: 'block' }} />
              )}
            </div>
            <span
              className="text-xs leading-relaxed"
              style={{ color: included ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ─── Main export ───────────────────────────────────────────── */
export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section
      id="pricing"
      className="relative z-10 w-full pt-10 pb-24 px-4 sm:px-6"
      style={{ fontFamily: "'Geist Variable', 'Geist', sans-serif" }}
    >
      {/* Divider */}
      <div className="max-w-5xl mx-auto mb-20">
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
        />
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-14 flex flex-col items-center text-center gap-4">
        <motion.h2
          className="font-semibold text-white leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Simple, honest pricing.
        </motion.h2>
        <motion.p
          className="font-medium"
          style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '-0.01em' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          Start free. Scale when you're ready.
        </motion.p>

        {/* Billing toggle */}
        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm text-zinc-500">Monthly</span>
          <button
            onClick={() => setAnnual(a => !a)}
            className="relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none"
            style={{ background: annual ? '#00e5c2' : 'rgba(255,255,255,0.1)' }}
            aria-label="Toggle annual billing"
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
              animate={{ left: annual ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            />
          </button>
          <span className="text-sm text-zinc-500">
            Annual{' '}
            <span
              className="text-xs font-medium px-1.5 py-0.5 rounded-full"
              style={{ background: '#00e5c218', color: '#00e5c2' }}
            >
              −25%
            </span>
          </span>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 items-start pt-4">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.id}
            transition={{ delay: i * 0.1 }}
          >
            <PricingCard tier={tier} annual={annual} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
