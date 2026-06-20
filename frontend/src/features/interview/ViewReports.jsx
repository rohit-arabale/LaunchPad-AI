import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "./useInterview.js";
import {
  History,
  ArrowLeft,
  Sparkles,
  FileText,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { Loader } from "lucide-react";

// ─── Design tokens (mirror Home.jsx & InterviewResult.jsx exactly) ──────────
const BG       = "#020202";
const FONT     = "'Geist Variable', 'Geist', sans-serif";
const MONO     = "'Geist Mono', 'ui-monospace', 'SFMono-Regular', monospace";
const CYAN     = "#06b6d4";
const CYAN_06  = "rgba(6,182,212,0.06)";
const CYAN_10  = "rgba(6,182,212,0.10)";
const CYAN_35  = "rgba(6,182,212,0.35)";
const W_80     = "rgba(255,255,255,0.80)";
const W_45     = "rgba(255,255,255,0.45)";
const W_30     = "rgba(255,255,255,0.30)";
const W_10     = "rgba(255,255,255,0.10)";
const W_08     = "rgba(255,255,255,0.08)";
const W_05     = "rgba(255,255,255,0.05)";
const W_03     = "rgba(255,255,255,0.03)";

// ─── Score → colour palette ──────────────────────────────────────────────────
function getScorePalette(score) {
  if (score >= 75) {
    // High match — very subtle cyan tint
    return {
      ring: "#06b6d4",
      ringBg: "rgba(6,182,212,0.07)",
      ringTrack: "rgba(6,182,212,0.08)",
      glow: "rgba(6,182,212,0.06)",
      glowHover: "rgba(6,182,212,0.13)",
      border: "rgba(6,182,212,0.12)",
      borderHover: "rgba(6,182,212,0.28)",
      label: "High Match",
      labelColor: CYAN,
      labelBg: "rgba(6,182,212,0.04)",
      labelBorder: "rgba(6,182,212,0.15)",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    };
  } else if (score >= 45) {
    // Medium match — very subtle amber tint
    return {
      ring: "#f59e0b",
      ringBg: "rgba(245,158,11,0.07)",
      ringTrack: "rgba(245,158,11,0.08)",
      glow: "rgba(245,158,11,0.06)",
      glowHover: "rgba(245,158,11,0.13)",
      border: "rgba(245,158,11,0.12)",
      borderHover: "rgba(245,158,11,0.28)",
      label: "Partial Match",
      labelColor: "#fbbf24",
      labelBg: "rgba(245,158,11,0.04)",
      labelBorder: "rgba(245,158,11,0.15)",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    };
  } else {
    // Low match — very subtle red tint
    return {
      ring: "#f87171",
      ringBg: "rgba(239,68,68,0.07)",
      ringTrack: "rgba(239,68,68,0.08)",
      glow: "rgba(239,68,68,0.06)",
      glowHover: "rgba(239,68,68,0.13)",
      border: "rgba(239,68,68,0.12)",
      borderHover: "rgba(239,68,68,0.28)",
      label: "Low Match",
      labelColor: "#f87171",
      labelBg: "rgba(239,68,68,0.04)",
      labelBorder: "rgba(239,68,68,0.15)",
      gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
    };
  }
}

// ─── Format date as "MMM DD, YYYY" ──────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

// ─── Extract target role from jobDescription string ─────────────────────────
function extractRole(report) {
  // Use report.title if available (set by AI service)
  if (report?.title && report.title.trim()) return report.title.trim();
  // Fall back to first line of jobDescription
  if (report?.jobDescription) {
    const first = report.jobDescription.split("\n")[0].trim();
    if (first.length > 0 && first.length < 80) return first;
    return first.slice(0, 60) + "…";
  }
  return "Target Position";
}

// ─── Circular SVG Score Gauge (pill) ────────────────────────────────────────
function ScorePill({ score, palette, size = 80 }) {
  const sw   = 7;
  const r    = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(Math.max(score, 0), 100) / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        aria-label={`Match score: ${score}%`}
      >
        <defs>
          <linearGradient id={`scoreGrad-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={palette.ring} />
            <stop offset="100%" stopColor={palette.ring} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={palette.ringTrack}
          strokeWidth={sw}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={`url(#scoreGrad-${score})`}
          strokeWidth={sw}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      {/* Centred label */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          LaunchPad AIItems: "center",
          justifyContent: "center",
          gap: "1px",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: "1.05rem",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {score}%
        </span>
      </div>
    </div>
  );
}

// ─── Report Card ─────────────────────────────────────────────────────────────
function ReportCard({ report, index, onClick }) {
  const score   = report.matchScore ?? 0;
  const palette = getScorePalette(score);
  const role    = extractRole(report);
  const date    = formatDate(report.createdAt);

  return (
    <motion.div
      id={`report-card-${report._id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        y: -4,
        boxShadow: `0 8px 32px ${palette.glowHover}, 0 4px 16px rgba(0,0,0,0.4)`,
        borderColor: palette.borderHover,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${palette.border}`,
        borderRadius: "20px",
        padding: "24px",
        cursor: "pointer",
        boxShadow: `0 2px 16px ${palette.glow}, 0 1px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: "border-color 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top colour hint bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "1px",
          background: palette.gradient,
          opacity: 0.6,
          borderRadius: "0 0 4px 4px",
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", LaunchPad AIItems: "flex-start", gap: "16px" }}>
        {/* Icon badge */}
        <div
          style={{
            flexShrink: 0,
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: palette.ringBg,
            border: `1px solid ${palette.border}`,
            display: "flex",
            LaunchPad AIItems: "center",
            justifyContent: "center",
          }}
        >
          <FileText size={18} color={palette.ring} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Target role */}
          <p
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
              marginBottom: "6px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {role}
          </p>

          {/* Status badge */}
          <span
            style={{
              display: "inline-block",
              padding: "2px 10px",
              borderRadius: "999px",
              fontSize: "0.62rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: palette.labelColor,
              background: palette.labelBg,
              border: `1px solid ${palette.labelBorder}`,
            }}
          >
            {palette.label}
          </span>
        </div>
      </div>

      {/* Metric — circular score pill */}
      <div
        style={{
          display: "flex",
          LaunchPad AIItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.025)",
          border: `1px solid ${W_08}`,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: MONO,
              fontSize: "0.6rem",
              fontWeight: 700,
              color: W_30,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "4px",
            }}
          >
            Match Score
          </p>
          <div style={{ display: "flex", LaunchPad AIItems: "center", gap: "8px" }}>
            <TrendingUp size={14} color={palette.ring} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {score}%
            </span>
          </div>
        </div>

        {/* SVG circular pill */}
        <ScorePill score={score} palette={palette} size={72} />
      </div>

      {/* Footer — date */}
      <div
        style={{
          display: "flex",
          LaunchPad AIItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", LaunchPad AIItems: "center", gap: "6px" }}>
          <CalendarDays size={12} color={W_30} />
          <span
            style={{
              fontFamily: MONO,
              fontSize: "0.72rem",
              color: W_45,
              letterSpacing: "0.03em",
            }}
          >
            {date}
          </span>
        </div>

        {/* Arrow hint */}
        <span
          style={{
            fontFamily: MONO,
            fontSize: "0.65rem",
            fontWeight: 700,
            color: palette.ring,
            letterSpacing: "0.04em",
            opacity: 0.8,
          }}
        >
          View →
        </span>
      </div>
    </motion.div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState({ onGoHome }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        LaunchPad AIItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "80px 24px",
        textLaunchPad AI: "center",
      }}
    >
      {/* Ghost icon */}
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "20px",
          background: CYAN_06,
          border: `1px solid rgba(6,182,212,0.18)`,
          display: "flex",
          LaunchPad AIItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 32px rgba(6,182,212,0.08)`,
        }}
      >
        <History size={30} color={CYAN} />
      </div>

      <div>
        <h2
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: "1.45rem",
            color: "#ffffff",
            letterSpacing: "-0.035em",
            marginBottom: "10px",
          }}
        >
          No Reports Yet
        </h2>
        <p
          style={{
            fontFamily: FONT,
            fontSize: "0.9rem",
            color: W_45,
            lineHeight: 1.65,
            maxWidth: "340px",
          }}
        >
          Generate your first personalised career report by pasting a job
          description and uploading your résumé.
        </p>
      </div>

      <motion.button
        id="empty-state-home-btn"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onGoHome}
        style={{
          display: "flex",
          LaunchPad AIItems: "center",
          gap: "8px",
          padding: "12px 28px",
          borderRadius: "14px",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: "0.88rem",
          color: "#ffffff",
          background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 28px rgba(6,182,212,0.30), 0 2px 12px rgba(0,0,0,0.4)",
          letterSpacing: "-0.01em",
        }}
      >
        <Sparkles size={15} />
        Create Your First Report
      </motion.button>
    </motion.div>
  );
}

// ─── Ambient Background (mirrors Home.jsx) ───────────────────────────────────
function BackgroundLayer() {
  return (
    <>
      {/* Dot grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.07,
        }}
      />
      {/* Top cyan glow */}
      <div
        className="pointer-events-none fixed z-0"
        style={{
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%) translateZ(0)",
          width: "60vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Bottom-right blue glow */}
      <div
        className="pointer-events-none fixed z-0"
        style={{
          bottom: "-10%",
          right: "-10%",
          width: "40vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateZ(0)",
        }}
      />
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ViewReports() {
  const { reports, loading, fetchAllReports } = useInterview();
  const navigate = useNavigate();

  // Fetch on mount (also works on hard refresh)
  useEffect(() => {
    fetchAllReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (report) => {
    navigate(`/interview/${report._id}`);
  };

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: BG,
          display: "flex",
          LaunchPad AIItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", LaunchPad AIItems: "center", gap: "16px" }}>
          <Loader size={32} color={CYAN} style={{ animation: "spin 1s linear infinite" }} />
          <p style={{ color: W_45, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
            Loading your reports…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full"
      style={{ background: BG, fontFamily: FONT, overflowX: "clip" }}
    >
      <BackgroundLayer />

      <div className="relative z-10 flex flex-col items-center px-6 py-14 min-h-screen">

        {/* ── Brand badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide"
          style={{
            borderColor: "rgba(6,182,212,0.35)",
            color: CYAN,
            background: CYAN_06,
          }}
        >
          <Sparkles size={12} />
          LaunchPad AI — AI Career Engine
        </motion.div>

        {/* ── Page header ── */}
        <div className="w-full max-w-5xl flex items-start justify-between mb-3 page-header-row">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.07 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Report{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Library
            </span>
          </motion.h1>

          {/* ── Back to Home ── */}
          <motion.button
            id="back-to-home-btn"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.07 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/home")}
            style={{
              display: "flex",
              LaunchPad AIItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "12px",
              fontFamily: MONO,
              fontWeight: 600,
              fontSize: "0.82rem",
              background: "transparent",
              border: `1px solid ${W_10}`,
              color: W_45,
              cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = W_80;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = W_10;
              e.currentTarget.style.color = W_45;
            }}
          >
            <ArrowLeft size={14} />
            Back to Home
          </motion.button>
        </div>

        {/* ── Sub-heading / count ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="w-full max-w-5xl mb-10"
          style={{
            color: W_45,
            fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
          }}
        >
          {reports && reports.length > 0
            ? `${reports.length} report${reports.length === 1 ? "" : "s"} · click any card to review your full analysis`
            : "Your personalised career analyses will appear here."}
        </motion.p>

        {/* ── Content ── */}
        {(!reports || reports.length === 0) ? (
          <EmptyState onGoHome={() => navigate("/home")} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              width: "100%",
              maxWidth: "1100px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {reports.map((report, idx) => (
              <ReportCard
                key={report._id ?? idx}
                report={report}
                index={idx}
                onClick={() => handleCardClick(report)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}