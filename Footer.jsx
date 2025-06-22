import React from "react";

export default function Footer({ darkMode }) {
  return (
    <footer
      className="w-full py-4 text-center text-sm mt-8 rounded-xl shadow"
      style={{
        background: darkMode
          ? "rgba(36, 37, 42, 0.45)"
          : "rgba(255,255,255,0.45)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        fontFamily: "'Montserrat', 'Poppins', sans-serif",
        color: darkMode ? "#b2ebf2" : "#1976d2",
        border: darkMode ? "1px solid #444" : "1px solid #e0eafc",
        transition: "background 0.5s, color 0.5s",
        
      }}
    >
      © {new Date().getFullYear()} PhishPhantom. All rights reserved.
    </footer>
  );
}