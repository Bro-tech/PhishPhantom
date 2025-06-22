import React, { useState } from "react";
import { toast } from "react-toastify";

const suspiciousTLDs = [".tk", ".xyz", ".pw", ".top", ".gq", ".ml", ".cf"];

function getRedFlags(url) {
  const flags = [];
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") flags.push("No HTTPS");
    if (suspiciousTLDs.some(tld => u.hostname.endsWith(tld))) flags.push("Suspicious domain (" + u.hostname.split('.').pop() + ")");
    // Add more checks as needed
  } catch {
    flags.push("Invalid URL");
  }
  return flags;
}

export default function ScanForm({ darkMode }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [redFlags, setRedFlags] = useState([]);
  const [result, setResult] = useState(null);

  const sanitizeUrl = (input) => input.replace(/[^\w-.:/?#=&]/g, "");

  const handleScan = async (e) => {
    e.preventDefault();
    const cleanUrl = sanitizeUrl(url);
    if (!cleanUrl) {
      toast.error("Please enter a valid URL to scan.");
      return;
    }
    setLoading(true);
    setScreenshot(null);
    setRedFlags([]);
    setResult(null);

    // Red flag checks
    const flags = getRedFlags(cleanUrl);
    setRedFlags(flags);

    // Simulate phishing detection (replace with real API if available)
    const isPhishing = cleanUrl.includes("phishing");
    setTimeout(() => {
      setResult(isPhishing ? "Phishing Detected" : "Safe");
      toast[isPhishing ? "error" : "success"](
        isPhishing ? "Phishing detected!" : "Scan complete! No phishing detected."
      );

      // Save to localStorage for history
      const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
      history.unshift({
        url: cleanUrl,
        result: isPhishing ? "Phishing Detected" : "Safe",
        date: new Date().toISOString().slice(0, 10),
      });
      localStorage.setItem("scanHistory", JSON.stringify(history));

      setLoading(false);
    }, 1500);

    // Fetch screenshot from urlscan.io
    try {
      const res = await fetch(`https://api.urlscan.io/screenshots/?url=${encodeURIComponent(cleanUrl)}`);
      if (res.ok) {
        const data = await res.json();
        setScreenshot(data.screenshot || null);
      }
    } catch {
      setScreenshot(null);
    }
  };

  return (
    <form
      onSubmit={handleScan}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-4"
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: darkMode ? "1px solid #444" : "1px solid #e0eafc",
        fontFamily: "'Montserrat', 'Poppins', sans-serif",
        transition: "background 0.5s, color 0.5s",
      }}
    >
      <label htmlFor="url" className="font-semibold text-lg">
        Enter URL to scan:
      </label>
      <input
        id="url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="p-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        required
        autoComplete="off"
        style={{
          fontFamily: "'Montserrat', 'Poppins', sans-serif",
        }}
      />
      <button
        className={`font-bold px-6 py-2 rounded-xl shadow transition flex items-center justify-center
          ${darkMode
            ? "bg-cyan-900 text-cyan-200 hover:bg-cyan-800"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"}
        `}
        type="submit"
        disabled={loading}
        style={{
          fontFamily: "'Montserrat', 'Poppins', sans-serif",
          minHeight: "44px",
        }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Scanning...
          </span>
        ) : (
          "Scan"
        )}
      </button>

      {/* Result & Preview */}
      {(result || screenshot || redFlags.length > 0) && (
        <div className="mt-6">
          {result && (
            <div className={`mb-2 font-bold text-lg ${result === "Safe" ? "text-green-600" : "text-red-600"}`}>
              {result}
            </div>
          )}
          {redFlags.length > 0 && (
            <div className="mb-2">
              {redFlags.map((flag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
                >
                  ⚠️ {flag}
                </span>
              ))}
            </div>
          )}
          {screenshot && (
            <div className="mt-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-2">Website Preview</span>
              <img
                src={screenshot}
                alt="Website preview"
                className="rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-full"
                style={{ maxHeight: 300 }}
              />
            </div>
          )}
        </div>
      )}
    </form>
  );
}