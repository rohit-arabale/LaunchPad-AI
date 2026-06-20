import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInterview } from "./useInterview.js";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2,
  Users,
  AlertTriangle,
  MapPin,
  Check,
  Sparkles,
  Loader,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";

// ─── Design tokens (mirror Home.jsx exactly) ────────────────────────────────
const BG       = "#020202";
const FONT     = "'Geist Variable', 'Geist', sans-serif";
const CYAN     = "#06b6d4";
const CYAN_06  = "rgba(6,182,212,0.06)";
const CYAN_10  = "rgba(6,182,212,0.10)";
const CYAN_20  = "rgba(6,182,212,0.20)";
const CYAN_35  = "rgba(6,182,212,0.35)";
const W_80     = "rgba(255,255,255,0.80)";
const W_45     = "rgba(255,255,255,0.45)";
const W_30     = "rgba(255,255,255,0.30)";
const W_10     = "rgba(255,255,255,0.10)";
const W_08     = "rgba(255,255,255,0.08)";
const W_05     = "rgba(255,255,255,0.05)";
const W_03     = "rgba(255,255,255,0.03)";

// ─── TABS config ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "technical",  label: "Technical",  icon: Code2         },
  { id: "behavioral", label: "Behavioral", icon: Users         },
  { id: "gaps",       label: "Skill Gaps", icon: AlertTriangle },
  { id: "roadmap",    label: "Roadmap",    icon: MapPin        },
];

// ─── Severity color map ───────────────────────────────────────────────────────
const SEV = {
  high:   { badge: "rgba(239,68,68,0.12)",   text: "#f87171", border: "rgba(239,68,68,0.30)"  },
  medium: { badge: "rgba(245,158,11,0.12)",  text: "#fbbf24", border: "rgba(245,158,11,0.30)" },
  low:    { badge: "rgba(16,185,129,0.12)",  text: "#34d399", border: "rgba(16,185,129,0.30)" },
};

// ────────────────────────────────────────────────────────────────────────────
// ROOT
// ────────────────────────────────────────────────────────────────────────────
export default function InterviewResult() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { report, loading, fetchReportById } = useInterview();
  const [activeTab, setActiveTab] = useState("technical");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hydration: fetch if context is empty OR belongs to a different report
  useEffect(() => {
    if (!report || report._id !== interviewId) {
      fetchReportById(interviewId);
    }
  }, [interviewId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close sidebar on tab change (mobile)
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  // ── Loading / skeleton ──
  if (loading || !report || report._id !== interviewId) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          LaunchPad AIItems: "center",
          justifyContent: "center",
          background: BG,
          fontFamily: FONT,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", LaunchPad AIItems: "center", gap: "16px" }}>
          <Loader
            size={36}
            style={{ color: CYAN, animation: "spin 1s linear infinite" }}
          />
          <p style={{ color: W_45, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
            Loading your report…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: BG,
        fontFamily: FONT,
        color: W_80,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Ambient background dots (same as Home) ── */}
      <BackgroundLayer />

      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setSidebarOpen(true)}
        style={{
          display: "none",
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 50,
          padding: "8px",
          borderRadius: "10px",
          background: "rgba(10,10,10,0.9)",
          border: `1px solid ${W_10}`,
          color: W_80,
          cursor: "pointer",
          backdropFilter: "blur(12px)",
        }}
        className="ir-mobile-menu-btn"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 40,
              backdropFilter: "blur(4px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          SIDEBAR (fixed desktop / slide-in mobile)
      ══════════════════════════════════════════ */}
      <aside
        style={{
          position: "fixed",
          left: "12px",
          top: "12px",
          bottom: "12px",
          width: "272px",
          background: "rgba(10,10,10,0.95)",
          border: `1px solid ${W_10}`,
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          zIndex: 45,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        className={`ir-sidebar${sidebarOpen ? " open" : ""}`}
      >
        {/* ── Brand ── */}
        <div
          style={{
            padding: "24px 24px 20px",
            borderBottom: `1px solid ${W_08}`,
          }}
        >
          <div style={{ display: "flex", LaunchPad AIItems: "center", gap: "10px", marginBottom: "24px" }}>
            <img
              src="/favicon.png"
              alt="LaunchPad AI logo"
              style={{
                width: "36px",
                height: "36px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 8px rgba(6,182,212,0.4))",
              }}
            />
            <span
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.03em",
              }}
            >
              LaunchPad AI
            </span>
          </div>

          {/* ── Match Score Gauge ── */}
          <div style={{ display: "flex", flexDirection: "column", LaunchPad AIItems: "center", gap: "12px" }}>
            <div style={{ position: "relative", width: "120px", height: "120px" }}>
              <ScoreGauge score={report.matchScore} size={120} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  LaunchPad AIItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 900,
                    color: "#ffffff",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {report.matchScore}%
                </span>
                <span
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: W_30,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginTop: "4px",
                  }}
                >
                  Match Score
                </span>
              </div>
            </div>

            {/* Score label badge */}
            <div
              style={{
                padding: "4px 14px",
                borderRadius: "999px",
                background: "rgba(245,158,11,0.10)",
                border: "1px solid rgba(245,158,11,0.25)",
              }}
            >
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "#f59e0b",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {report.matchScore >= 70
                  ? "Strong Match"
                  : report.matchScore >= 40
                  ? "Partial Match"
                  : "Needs Work"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Mobile close ── */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="ir-sidebar-close"
          style={{
            display: "none",
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "6px",
            borderRadius: "8px",
            background: "transparent",
            border: `1px solid ${W_10}`,
            color: W_45,
            cursor: "pointer",
          }}
          aria-label="Close navigation"
        >
          <X size={16} />
        </button>

        {/* ── Nav ── */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: "flex",
                  LaunchPad AIItems: "center",
                  gap: "12px",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  border: active ? `1px solid ${CYAN_20}` : "1px solid transparent",
                  background: active ? CYAN_06 : "transparent",
                  color: active ? "#ffffff" : W_45,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  textLaunchPad AI: "left",
                  position: "relative",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = W_05;
                    e.currentTarget.style.color = W_80;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = W_45;
                  }
                }}
              >
                <Icon size={16} color={active ? CYAN : "currentColor"} />
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tab.label}
                </span>
                {active && (
                  <div
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: CYAN,
                      boxShadow: `0 0 8px ${CYAN_35}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Role footer ── */}
        <div
          style={{
            padding: "16px 24px 20px",
            borderTop: `1px solid ${W_08}`,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                color: W_30,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "6px",
              }}
            >
              Preparing for
            </p>
            <p
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {report.title || "Target Position"}
            </p>
          </div>

          {/* ── Back to Home ── */}
          <button
            id="ir-back-home-btn"
            onClick={() => navigate("/home")}
            style={{
              display: "flex",
              LaunchPad AIItems: "center",
              gap: "8px",
              width: "100%",
              padding: "9px 14px",
              borderRadius: "12px",
              fontFamily: "'Geist Mono', 'ui-monospace', monospace",
              fontWeight: 600,
              fontSize: "0.78rem",
              background: "transparent",
              border: `1px solid ${W_10}`,
              color: W_45,
              cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = W_10;
              e.currentTarget.style.color = W_45;
            }}
          >
            <ArrowLeft size={13} />
            Back to Home
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════════
          MAIN SCROLL AREA
      ══════════════════════════════════════════ */}
      <main
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "auto",
          position: "relative",
          zIndex: 10,
        }}
        className="ir-scrollbar ir-main"
      >
        {/* Section heading */}
        <div
          style={{
            display: "flex",
            LaunchPad AIItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: CYAN,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                marginBottom: "6px",
              }}
            >
              LaunchPad AI — AI Career Engine
            </p>
            <h1
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              {TABS.find((t) => t.id === activeTab)?.label}
            </h1>
          </div>
          {/* Status pill */}
          <div
            style={{
              display: "flex",
              LaunchPad AIItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.20)",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px rgba(16,185,129,0.6)",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#34d399",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Analysis Complete
            </span>
          </div>
        </div>

        {/* ── Animated content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {activeTab === "technical"  && <QuestionsView questions={report.technicalQuestions}  />}
            {activeTab === "behavioral" && <QuestionsView questions={report.behavioralQuestions} />}
            {activeTab === "gaps"       && <GapsView gaps={report.skillgaps} />}
            {activeTab === "roadmap"    && <RoadmapView plan={report.preparationPlans} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCORE GAUGE (SVG)
// ────────────────────────────────────────────────────────────────────────────
function ScoreGauge({ score, size = 120 }) {
  const sw = 9;
  const r  = (size - sw) / 2;
  const c  = 2 * Math.PI * r;
  const offset = c - (Math.min(Math.max(score, 0), 100) / 100) * c;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <defs>
        <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke="url(#amberGrad)"
        strokeWidth={sw}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// QUESTIONS VIEW (Technical + Behavioral)
// ────────────────────────────────────────────────────────────────────────────
function QuestionsView({ questions }) {
  if (!questions?.length) {
    return <EmptyState message="No questions available." />;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
      {questions.map((q, idx) => (
        <QuestionCard key={idx} question={q} index={idx + 1} />
      ))}
    </div>
  );
}

function QuestionCard({ question, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderRadius: "16px",
        background: W_03,
        border: `1px solid ${open ? "rgba(6,182,212,0.20)" : W_08}`,
        overflow: "hidden",
        transition: "border-color 0.2s ease",
        boxShadow: open ? `0 0 28px rgba(6,182,212,0.05)` : "none",
      }}
    >
      {/* Question row */}
      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "flex", LaunchPad AIItems: "flex-start", gap: "16px" }}>
          {/* Index badge */}
          <div
            style={{
              flexShrink: 0,
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              background: open ? CYAN_10 : W_05,
              border: `1px solid ${open ? CYAN_20 : W_10}`,
              display: "flex",
              LaunchPad AIItems: "center",
              justifyContent: "center",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: open ? CYAN : W_45,
              transition: "all 0.2s ease",
            }}
          >
            {index}
          </div>

          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: W_80,
                lineHeight: 1.55,
                letterSpacing: "-0.01em",
                marginBottom: "14px",
              }}
            >
              {question.question}
            </p>

            <button
              onClick={() => setOpen((p) => !p)}
              style={{
                display: "inline-flex",
                LaunchPad AIItems: "center",
                gap: "7px",
                padding: "8px 18px",
                borderRadius: "999px",
                background: open ? CYAN_10 : "rgba(255,255,255,0.06)",
                border: `1px solid ${open ? CYAN_35 : W_10}`,
                color: open ? CYAN : W_45,
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                if (!open) {
                  e.currentTarget.style.background = W_08;
                  e.currentTarget.style.color = W_80;
                }
              }}
              onMouseLeave={(e) => {
                if (!open) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = W_45;
                }
              }}
            >
              {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {open ? "Hide Answer" : "Reveal Answer"}
            </button>
          </div>
        </div>
      </div>

      {/* Revealed answer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 24px 24px",
                borderTop: `1px solid ${W_08}`,
                paddingTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Intention */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "12px",
                  background: CYAN_06,
                  border: `1px solid rgba(6,182,212,0.15)`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    LaunchPad AIItems: "center",
                    gap: "7px",
                    marginBottom: "8px",
                  }}
                >
                  <Sparkles size={12} color={CYAN} />
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 800,
                      color: CYAN,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                    }}
                  >
                    Interviewer's Intention
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: W_80,
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  {question.intention}
                </p>
              </div>

              {/* Answer */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "12px",
                  background: W_03,
                  border: `1px solid ${W_08}`,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "0.62rem",
                    fontWeight: 800,
                    color: W_30,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: "10px",
                  }}
                >
                  Sample Answer Approach
                </span>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: W_80,
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {question.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// GAPS VIEW
// ────────────────────────────────────────────────────────────────────────────
function GapsView({ gaps }) {
  if (!gaps?.length) return <EmptyState message="No skill gaps identified." />;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "16px",
        maxWidth: "960px",
      }}
    >
      {gaps.map((gap, idx) => {
        const sev = SEV[gap.severity] ?? SEV.low;
        const isHigh = gap.severity === "high";
        return (
          <div
            key={idx}
            style={{
              position: "relative",
              padding: "20px",
              borderRadius: "16px",
              background: isHigh ? "rgba(239,68,68,0.03)" : W_03,
              border: `1px solid ${isHigh ? sev.border : W_08}`,
              boxShadow: isHigh
                ? "0 0 24px rgba(239,68,68,0.07), inset 0 1px 0 rgba(239,68,68,0.05)"
                : "none",
              transition: "box-shadow 0.2s ease",
            }}
          >
            {/* Severity badge */}
            <div
              style={{
                display: "inline-flex",
                LaunchPad AIItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "999px",
                background: sev.badge,
                border: `1px solid ${sev.border}`,
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: sev.text,
                }}
              />
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  color: sev.text,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {gap.severity} priority
              </span>
            </div>

            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
                marginBottom: "6px",
              }}
            >
              {gap.skill}
            </h3>
            <p
              style={{
                fontSize: "0.8rem",
                color: W_45,
                lineHeight: 1.55,
              }}
            >
              Address this gap to strengthen your candidacy and match the role requirements.
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// ROADMAP VIEW
// ────────────────────────────────────────────────────────────────────────────
function RoadmapView({ plan }) {
  if (!plan?.length) return <EmptyState message="No preparation plan available." />;

  const sorted = [...plan].sort((a, b) => a.day - b.day);

  return (
    <div style={{ maxWidth: "760px", position: "relative", paddingLeft: "32px" }}>
      {/* Vertical line */}
      <div
        style={{
          position: "absolute",
          left: "10px",
          top: "12px",
          bottom: "12px",
          width: "1px",
          background: `linear-gradient(to bottom, transparent, ${W_10} 10%, ${W_10} 90%, transparent)`,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {sorted.map((day, idx) => (
          <DayCard key={idx} dayData={day} />
        ))}
      </div>
    </div>
  );
}

function DayCard({ dayData }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Node */}
      <div
        style={{
          position: "absolute",
          left: "-26px",
          top: "4px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: BG,
          border: `2px solid ${CYAN_35}`,
          display: "flex",
          LaunchPad AIItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: CYAN,
            boxShadow: `0 0 6px ${CYAN}`,
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          padding: "20px 24px",
          borderRadius: "16px",
          background: W_03,
          border: `1px solid ${W_08}`,
        }}
      >
        {/* Day label + focus */}
        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 800,
              color: CYAN,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Day {dayData.day}
          </span>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            {dayData.focus}
          </h3>
        </div>

        {/* Tasks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {dayData.tasks?.map((task, tidx) => (
            <TaskRow key={tidx} task={task} dayId={dayData.day} taskId={tidx} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task, dayId, taskId }) {
  const [done, setDone] = useState(false);
  return (
    <div
      style={{ display: "flex", LaunchPad AIItems: "flex-start", gap: "12px", cursor: "pointer" }}
      onClick={() => setDone((p) => !p)}
    >
      {/* Custom checkbox */}
      <div
        style={{
          flexShrink: 0,
          width: "18px",
          height: "18px",
          borderRadius: "6px",
          border: `2px solid ${done ? CYAN : W_30}`,
          background: done ? CYAN : "transparent",
          display: "flex",
          LaunchPad AIItems: "center",
          justifyContent: "center",
          marginTop: "2px",
          transition: "all 0.18s ease",
          boxShadow: done ? `0 0 10px ${CYAN_35}` : "none",
        }}
      >
        {done && <Check size={11} color="#ffffff" strokeWidth={3} />}
      </div>

      <p
        style={{
          fontSize: "0.85rem",
          color: done ? W_30 : W_80,
          lineHeight: 1.55,
          textDecoration: done ? "line-through" : "none",
          transition: "all 0.18s ease",
          flex: 1,
        }}
      >
        {task}
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// EMPTY STATE
// ────────────────────────────────────────────────────────────────────────────
function EmptyState({ message }) {
  return (
    <div
      style={{
        padding: "60px 40px",
        textLaunchPad AI: "center",
        color: W_30,
        fontSize: "0.9rem",
      }}
    >
      {message}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// BACKGROUND (same dots + glows as Home.jsx)
// ────────────────────────────────────────────────────────────────────────────
function BackgroundLayer() {
  return (
    <>
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.05,
        }}
      />
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          zIndex: 0,
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%) translateZ(0)",
          width: "60vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          zIndex: 0,
          bottom: "-10%",
          right: "-10%",
          width: "40vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateZ(0)",
        }}
      />
    </>
  );
}
