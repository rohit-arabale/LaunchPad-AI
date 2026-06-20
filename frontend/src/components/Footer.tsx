import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Github, Twitter, Linkedin } from 'lucide-react'

const COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', to: '#features' },
      { label: 'How it Works', to: '#how-it-works' },
      { label: 'Pricing', to: '#pricing' },
      { label: 'Changelog', to: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '#' },
      { label: 'Blog', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Contact', to: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Service', to: '#' },
      { label: 'Cookie Policy', to: '#' },
      { label: 'GDPR', to: '#' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'API Docs', to: '#' },
      { label: 'Status', to: '#' },
      { label: 'GitHub', to: '#' },
      { label: 'Community', to: '#' },
    ],
  },
]

const SOCIALS = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer
      className="relative z-10 w-full px-4 sm:px-6 pt-16 pb-10"
      style={{ fontFamily: "'Geist Variable', 'Geist', sans-serif" }}
    >
      {/* Top divider */}
      <div
        className="w-full h-px mb-14"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />

      <div className="max-w-5xl mx-auto">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8 mb-14">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-5">
            {/* Logo + name */}
            <Link to="/" className="flex items-center gap-2.5 w-fit group">
              <img
                src="/favicon.png"
                alt="LaunchPad AI"
                className="h-8 w-8 group-hover:scale-105 transition-transform duration-300"
                style={{ objectFit: 'contain' }}
              />
              <span
                className="font-semibold text-white text-base"
                style={{ letterSpacing: '-0.03em' }}
              >
                LaunchPad AI
              </span>
            </Link>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">
              AI-powered career acceleration for professionals who aim high.
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-[200px]">
              Designed and developed by Rohit.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/8 hover:text-white text-zinc-600"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">
              <p
                className="text-xs font-semibold text-white uppercase tracking-widest"
                style={{ letterSpacing: '0.1em' }}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-xs text-zinc-500 hover:text-white transition-colors duration-150"
                      style={{ fontFamily: "'Geist Variable', sans-serif" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Security note ── */}
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3.5 mb-10"
          style={{
            background: 'rgba(0, 229, 194, 0.04)',
            border: '1px solid rgba(0, 229, 194, 0.12)',
          }}
        >
          <Shield size={14} color="#00e5c2" className="mt-0.5 shrink-0" />
          <p className="text-xs text-zinc-500 leading-relaxed">
            <span className="text-white font-medium">Security note: </span>
            LaunchPad AI uses{' '}
            <span className="text-zinc-300">JWT-based secure sessions</span> with
            HTTP-only cookies and token rotation on every refresh. Your data is
            encrypted at rest and in transit. We never store your resume on our
            servers beyond your active session.
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} LaunchPad AI. Developed by Rohit.
          </p>

          <div className="flex items-center gap-4">
            <span
              className="text-xs text-zinc-700"
              style={{ fontFamily: "'Geist Mono', 'Geist Variable', monospace" }}
            >
              v1.0.0
            </span>
            <span className="w-px h-3 bg-white/8" />

          </div>
        </div>

      </div>
    </footer>
  )
}
