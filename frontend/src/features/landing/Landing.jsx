import React from 'react'
import Navbar from '../../components/Navbar'
import About from '../../components/About'
import Working from '../../components/Working'
import Pricing from '../../components/Pricing'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-white selection:text-black">

      {/* ── Background: top white gradient touch ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />

      {/* ── Background: center radial vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(255,255,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Background: dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.12,
        }}
      />

      <Navbar />

      {/* ── Hero Section ── */}
      <section
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6"
        style={{ fontFamily: "'Geist Variable', 'Geist', sans-serif" }}
      >
        <div className="flex flex-col items-center gap-5 max-w-4xl mx-auto">

          {/* ── Heading Line 1 — solid white ── */}
          <h1
            className="text-white font-semibold leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              animation: 'fadeSlideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0ms',
              letterSpacing: '-0.03em',
            }}
          >
            Analyze deeper.
          </h1>

          {/* ── Heading Line 2 — faded white ── */}
          <h2
            className="font-semibold leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              color: 'rgba(255,255,255,0.35)',
              animation: 'fadeSlideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '120ms',
              letterSpacing: '-0.03em',
              marginTop: '-0.15em',
            }}
          >
            Scale higher.
          </h2>

          {/* ── Supporting paragraph ── */}
          <p
            className="max-w-2xl leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.45)',
              animation: 'fadeSlideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '240ms',
              marginTop: '0.5rem',
            }}
          >
            An AI-powered engine for professionals who aim high. Built for clarity
            and designed for growth. Everything you need to bridge skill gaps,
            master behavioral rounds, and grow your career.
          </p>

          <p
            className="text-xs font-medium uppercase"
            style={{
              color: 'rgba(255,255,255,0.32)',
              letterSpacing: '0.12em',
              animation: 'fadeSlideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '300ms',
            }}
          >
            Developed by Rohit
          </p>

          {/* ── CTA Button ── */}
          <div
            style={{
              animation: 'fadeSlideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '360ms',
              marginTop: '0.75rem',
            }}
          >
            <Link
              to="/register"
              className="
                inline-flex items-center gap-2
                bg-white text-black font-semibold
                rounded-full
                px-8 py-3.5
                text-base
                mt-4
                transition-all duration-200
                hover:bg-white/90 hover:scale-[1.03]
                active:scale-[0.98]
              "
              style={{ letterSpacing: '-0.01em' }}
            >
              Get started for free
              <span className="text-lg leading-none">→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ── About Section ── */}
      <About />

      {/* ── How it Works Section ── */}
      <Working />

      {/* ── Pricing Section ── */}
      <Pricing />

      {/* ── Footer ── */}
      <Footer />

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Landing
