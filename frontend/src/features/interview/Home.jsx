import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  History,
  LogOut,
} from "lucide-react";
import { useInterview } from "./useInterview.js";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuth } from "../auth/useAuth.js";


export default function Home() {
  const { loading, handleReportGeneration } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { handleLogout } = useAuth();
  // ref to trigger the hidden file input when dropzone is clicked
  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };

  const handleGenerateReport = async () => {
    const data = await handleReportGeneration({
      jobDescription,
      selfDescription,
      resumeFile: selectedFile,
    });
    navigate(`/interview/${data._id}`);
  };

  const handleAllReports = () => {
    navigate("/interview/reports");
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/")
  }

  if (loading) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground animate-pulse">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        background: "#020202",
        fontFamily: "'Geist Variable', 'Geist', sans-serif",
        overflowX: "clip",
      }}
    >
      {/* ── Ambient background ── */}
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
            color: "#06b6d4",
            background: "rgba(6,182,212,0.06)",
          }}
        >
          <Sparkles size={12} />
          LaunchPad AI — AI Career Engine
        </motion.div>

        {/* ── Page heading with action buttons ── */}
        <div className="w-full max-w-5xl flex items-start justify-between mb-3 page-header-row">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.07 }}
            className="text-center font-bold leading-tight flex-1"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Create Your{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Custom Plan
            </span>
          </motion.h1>

          {/* ── Header action buttons ── */}
          <div className="flex items-center gap-2">
            {/* View All Reports */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm"
              onClick={handleAllReports}
              style={{
                fontFamily: "'Geist Mono', monospace",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                transition: "border-color 0.18s, color 0.18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <History size={16} />
              View All Reports
            </motion.button>

            {/* Logout */}
            <motion.button
              id="logout-btn"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm"
              onClick={handleLogoutClick}
              style={{
                fontFamily: "'Geist Mono', monospace",
                background: "transparent",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "rgba(239,68,68,0.7)",
                transition: "border-color 0.18s, color 0.18s, background 0.18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
                e.currentTarget.style.color = "rgba(239,68,68,1)";
                e.currentTarget.style.background = "rgba(239,68,68,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
                e.currentTarget.style.color = "rgba(239,68,68,0.7)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <LogOut size={15} />
              Log Out
            </motion.button>
          </div>
        </div>

        {/* ── Sub-heading ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="text-center mb-12 w-full max-w-5xl"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
          }}
        >
          Paste the job description, upload your résumé, and let LaunchPad AI generate
          a personalised career roadmap in seconds.
        </motion.p>

        {/* ── 2-Column Split Layout ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          {/* ══════════════════════════════════
              LEFT — Job Description (glass textarea)
          ══════════════════════════════════ */}
          <GlassPanel className="flex flex-col gap-4">
            <FieldLabel label="Job Description" hint="Paste the full JD" />

            <textarea
              id="jobDescription"
              className="w-full resize-none rounded-xl px-4 py-3.5 text-sm leading-relaxed outline-none min-h-85"
              style={{
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
                caretColor: "#06b6d4",
                transition: "border-color 0.18s",
              }}
              placeholder="Paste the full job description here — role responsibilities, required skills, company context..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(6,182,212,0.45)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
          </GlassPanel>

          {/* ══════════════════════════════════
              RIGHT — PDF upload + Self description
          ══════════════════════════════════ */}
          <div className="flex flex-col gap-5">
            {/* ── PDF Dropzone (empty / default state) ── */}
            <GlassPanel>
              <FieldLabel
                label="Résumé / CV"
                hint="PDF format only · up to 5 MB"
              />

              {/* Hidden file input — always in DOM so ref stays valid */}
              <input
                ref={resumeInputRef}
                id="resume-file-input"
                type="file"
                accept="application/pdf"
                className="hidden"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {/* Default dropzone — hidden once a file is chosen */}
              {!selectedFile && (
                <motion.div
                  id="resumeDropzone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-10 text-center cursor-pointer mt-2"
                  style={{
                    border: "1.5px dashed rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.025)",
                    transition: "border-color 0.18s, background 0.18s",
                  }}
                  onClick={() => resumeInputRef.current?.click()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
                    e.currentTarget.style.background = "rgba(6,182,212,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)";
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.025)";
                  }}
                >
                  {/* Upload icon */}
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: "rgba(6,182,212,0.1)",
                      border: "1px solid rgba(6,182,212,0.2)",
                    }}
                  >
                    <UploadCloud size={22} color="#06b6d4" />
                  </div>

                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Drag &amp; drop your résumé
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      or click to browse
                    </p>
                  </div>

                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(6,182,212,0.1)",
                      color: "#06b6d4",
                      border: "1px solid rgba(6,182,212,0.25)",
                    }}
                  >
                    PDF format only · up to 5 MB
                  </span>
                </motion.div>
              )}

              {/* ── File-selected card ── */}
              {selectedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl p-4 flex flex-col gap-3 mt-2"
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(6,182,212,0.25)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ background: "rgba(6,182,212,0.1)" }}
                    >
                      <FileText size={18} color="#06b6d4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {selectedFile.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {selectedFile.size < 1024 * 1024
                          ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                          : `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`}
                      </p>
                    </div>
                    <CheckCircle2 size={18} color="#06b6d4" />
                    <button
                      id="remove-file-btn"
                      className="p-1 rounded-md"
                      style={{ transition: "background 0.15s" }}
                      onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                      onClick={handleRemoveFile}
                    >
                      <X size={15} color="rgba(255,255,255,0.4)" />
                    </button>
                  </div>

                  <ProgressBar progress={100} />

                  <div className="flex justify-between">
                    <span
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Ready to submit
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#06b6d4" }}
                    >
                      100%
                    </span>
                  </div>
                </motion.div>
              )}
            </GlassPanel>

            {/* ── Self Description ── */}
            <GlassPanel>
              <FieldLabel
                label="Self Description"
                hint="Your background in a nutshell"
              />

              <textarea
                id="selfDescription"
                rows={7}
                className="w-full resize-none rounded-xl px-4 py-3.5 text-sm leading-relaxed outline-none mt-2"
                style={{
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.85)",
                  caretColor: "#06b6d4",
                  transition: "border-color 0.18s",
                }}
                placeholder="Briefly describe your experience, skills, and goals — e.g. '3 years in frontend dev, strong in React & TypeScript, aiming for senior roles at product-led startups.'"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(6,182,212,0.45)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </GlassPanel>
          </div>
        </motion.div>

        {/* ── Generate Report Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <motion.button
            id="generate-report-btn"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="relative flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-base overflow-hidden cursor-pointer"
            onClick={handleGenerateReport}
            style={{
              background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
              color: "#ffffff",
              border: "none",
              boxShadow:
                "0 0 32px rgba(6,182,212,0.35), 0 2px 12px rgba(0,0,0,0.4)",
              letterSpacing: "-0.01em",
            }}
          >
            <Sparkles size={17} />
            Generate Report
            <ArrowRight size={16} />
          </motion.button>

          <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            Fill in all fields and upload a PDF to continue
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/** Glass card container */
function GlassPanel({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </div>
  );
}

/** Field label row */
function FieldLabel({ label, hint }) {
  return (
    <div className="flex items-center justify-between mb-1">
      <label
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </label>
      {hint && (
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}

/** Animated cyan-to-blue progress bar — pass a 0–100 number */
function ProgressBar({ progress = 0 }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
          boxShadow: "0 0 10px rgba(6,182,212,0.55)",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

/** Ambient background decorations — fixed so they never repaint on scroll */
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
