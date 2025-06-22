import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const { i18n } = useTranslation();

  return (
    <nav
      className="flex items-center justify-between px-8 py-4 mb-6 rounded-xl shadow-lg"
      style={{
        background: darkMode
          ? "rgba(36, 37, 42, 0.55)"
          : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        fontFamily: "'Montserrat', 'Poppins', sans-serif",
        border: darkMode ? "1px solid #444" : "1px solid #e0eafc",
        transition: "background 0.5s, color 0.5s",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold tracking-tight" style={{ color: darkMode ? "#00eaff" : "#1976d2" }}>
          🛡️ PhishPhantom
        </span>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`transition font-semibold ${location.pathname === "/" ? (darkMode ? "text-cyan-300" : "text-blue-700") : ""} hover:text-blue-400`}
          style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
        >
          Home
        </Link>
        <Link
          to="/scan"
          className={`transition font-semibold ${location.pathname === "/scan" ? (darkMode ? "text-cyan-300" : "text-blue-700") : ""} hover:text-blue-400`}
        >
          Scan
        </Link>
        <Link
          to="/history"
          className={`transition font-semibold ${location.pathname === "/history" ? (darkMode ? "text-cyan-300" : "text-blue-700") : ""} hover:text-blue-400`}
        >
          History
        </Link>
        <Link
          to="/password-checker"
          className={`transition font-semibold ${location.pathname === "/password-checker" ? (darkMode ? "text-cyan-300" : "text-blue-700") : ""} hover:text-blue-400`}
        >
          Password Checker
        </Link>
        <Link
          to="/email-scam-detector"
          className={`transition font-semibold ${location.pathname === "/email-scam-detector" ? (darkMode ? "text-cyan-300" : "text-blue-700") : ""} hover:text-blue-400`}
        >
          Email Scam Detector
        </Link>
        <Link
          to="/cyberquest"
          className={`transition font-semibold ${location.pathname === "/cyberquest" ? (darkMode ? "text-cyan-300" : "text-blue-700") : ""} hover:text-blue-400`}
        >
          Cyber Quests
        </Link>
        <Link
          to="/privacy"
          className={`transition font-semibold ${location.pathname === "/privacy" ? (darkMode ? "text-cyan-300" : "text-blue-700") : ""} hover:text-blue-400`}
        >
          Privacy
        </Link>
        <Link
          to="/contact"
          className={`transition font-semibold ${location.pathname === "/contact" ? (darkMode ? "text-cyan-300" : "text-blue-700") : ""} hover:text-blue-400`}
        >
          Contact
        </Link>

 <select
  value={i18n.language}
  onChange={e => i18n.changeLanguage(e.target.value)}
  className="ml-4 px-2 py-1 rounded border"
  style={{
    fontFamily: "'Montserrat', 'Poppins', sans-serif",
    background: darkMode ? "#232526" : "#fff",
    color: darkMode ? "#b2ebf2" : "#1976d2",
    border: darkMode ? "1px solid #444" : "1px solid #e0eafc",
    transition: "background 0.5s, color 0.5s"
  }}
  aria-label="Select language"
>
  <option value="en">EN</option>
  <option value="es">ES</option>
  {/* Add more languages here */}
</select>

        <button
          onClick={() => setDarkMode((d) => !d)}
          className={`ml-4 px-3 py-1 rounded-lg font-bold shadow transition
            ${darkMode
              ? "bg-cyan-900 text-cyan-200 hover:bg-cyan-800"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"}
          `}
          aria-label="Toggle dark mode"
          style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}