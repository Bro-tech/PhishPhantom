import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Helper to extract domain name from URL
function getDomain(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ScanHistory({ darkMode }) {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("scanHistory") || "[]");
    setHistory(Array.isArray(data) ? data : []);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-cyan-300">{t("Scan History")}</h2>
      {history.length === 0 ? (
        <div className="text-gray-500">{t("No scan history found.")}</div>
      ) : (
        <div className="space-y-2">
          {history.map((item, idx) => {
            const domain = getDomain(item.url || "");
            // Use item.date if present, otherwise show "Unknown"
            const dateStr = item.date
              ? new Date(item.date).toLocaleString()
              : t("Unknown Date");
            return (
              <div
                key={item.id || idx}
                className="flex items-center justify-between gap-2 py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <a
                  href={item.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold underline transition
                    ${darkMode ? "text-cyan-300 hover:text-cyan-200" : "text-blue-700 hover:text-blue-900"}`}
                  style={{ maxWidth: "70%", wordBreak: "break-all" }}
                  title={item.url}
                >
                  {domain || t("Unknown URL")}
                </a>
                <span
                  className="ml-2 px-3 py-1 rounded-full text-xs font-medium text-center"
                  style={{
                    minWidth: 120,
                    background: darkMode ? "#374151" : "#e5e7eb",
                    color: darkMode ? "#e0e7ef" : "#374151",
                    display: "inline-block"
                  }}
                >
                  {dateStr}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}