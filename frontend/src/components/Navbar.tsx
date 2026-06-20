import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",         href: "/",            sectionId: null          },
  { label: "Features",     href: "#features",    sectionId: "features"    },
  { label: "How it Works", href: "#how-it-works", sectionId: "how-it-works" },
  { label: "Pricing",      href: "#pricing",     sectionId: "pricing"     },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const location  = useLocation();
  const navigate  = useNavigate();

  // Track scroll position for styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When route changes to "/" (landing) handle any pending hash scroll
  useEffect(() => {
    setActiveHash("");
  }, [location.pathname]);

  // Handle nav link click — home goes to /, section links smooth-scroll
  function handleNavClick(
    e: React.MouseEvent,
    sectionId: string | null,
    href: string
  ) {
    if (!sectionId) {
      // Plain page link — let router handle it normally
      setActiveHash("");
      setMenuOpen(false);
      return;
    }

    e.preventDefault();
    setActiveHash(href);
    setMenuOpen(false);

    if (location.pathname !== "/") {
      // Navigate to landing page first, then scroll after mount
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  }

  // Handle cross-page scroll: if we just landed on "/" and have a scrollTo state
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (location.pathname === "/" && state?.scrollTo) {
      // Small delay to let the page render its sections
      const timer = setTimeout(() => scrollToSection(state.scrollTo!), 80);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 mt-3">
      <nav
        className={`
          w-full max-w-5xl rounded-full px-6 py-3
          flex items-center justify-between
          transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "bg-white/5 border border-white/20 backdrop-blur-xl"
              : "bg-white/8 border border-white/15 backdrop-blur-md"
          }
        `}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-all duration-300 hover:opacity-80 group"
          aria-label="Home"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/favicon.png"
              alt="LaunchPad AI logo"
              className="h-10 w-10 relative z-10 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              style={{ objectFit: "contain" }}
            />
          </div>
          <span
            className="font-bold text-xl tracking-tighter text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            LaunchPad AI
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href, sectionId }) => {
            const isActive = sectionId
              ? activeHash === href
              : location.pathname === href && !activeHash;
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, sectionId, href)}
                  className={`
                    text-sm font-medium transition-colors duration-200 relative cursor-pointer
                    after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px
                    after:bg-white after:transition-all after:duration-300
                    ${
                      isActive
                        ? "text-white after:w-full"
                        : "text-white/50 hover:text-white after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right: Auth Buttons ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold text-black bg-white hover:bg-white/90 rounded-full px-5 py-2 transition-all duration-200"
          >
            Get started
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile Dropdown ── */}
      {menuOpen && (
        <div
          className="
            absolute top-[72px] left-4 right-4
            bg-black/90 backdrop-blur-xl border border-white/10
            rounded-2xl p-5 flex flex-col gap-4
            md:hidden
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          {NAV_LINKS.map(({ label, href, sectionId }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, sectionId, href)}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              {label}
            </a>
          ))}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-center text-sm font-medium text-white/70 border border-white/15 rounded-xl px-5 py-2 hover:bg-white/5 transition-all"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="block text-center text-sm font-semibold text-black bg-white rounded-xl px-5 py-2 hover:bg-white/90 transition-all"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;