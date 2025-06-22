import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScanForm from "./components/ScanForm";
import ScanHistory from "./components/ScanHistory";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Privacy from "./components/Privacy";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import CyberQuest from "./components/CyberQuest";
import PasswordChecker from "./components/PasswordChecker";
import EmailScamDetector from "./components/EmailScamDetector";
import "./components/i18n";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Main App component
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "light" ? false : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Glassmorphism background style
  const backgroundStyle = {
    minHeight: "100vh",
    width: "100vw",
    background: darkMode
      ? "linear-gradient(135deg, #232526 0%, #414345 100%)"
      : "linear-gradient(135deg,rgb(89, 130, 206) 0%,rgb(64, 129, 219) 100%)",
    fontFamily: "'Montserrat', 'Poppins', sans-serif",
    transition: "background 0.5s, color 0.5s",
  };

  return (
    <Router>
      <div style={backgroundStyle} className={darkMode ? "text-whitne" : "text-gray-900"}>
        {/* Glass effect overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background:
              "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "background 0.5s",
            ...(darkMode && {
              background: "rgba(36, 37, 42, 0.25)",
            }),
          }}
        />
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="flex-1 max-w-3xl mx-auto p-4 w-full">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/scan" element={<ScanForm />} />
              <Route path="/history" element={<ScanHistory />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cyberquest" element={<CyberQuest />} />
              <Route path="/password-checker" element={<PasswordChecker />} />
              <Route path="/email-scam-detector" element={<EmailScamDetector />} />
            </Routes>
          </main>
          <Footer darkMode={darkMode} />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </Router>
  );
}