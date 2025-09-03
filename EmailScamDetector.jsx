import React, { useState } from "react";
function detectScam(emailText) {
  
  const redFlags = [];
  
  const lower = emailText.toLowerCase();

  // 1. Urgent language
  if (/urgent|immediately|action required|verify|suspend|reset/i.test(emailText)) {
    redFlags.push("Urgent or threatening language");
  }

  // 2. Requests sensitive info via link
  if (
    /(password|account|login|verify|bank|credit card)/i.test(emailText) &&
    /(click|link|here|below)/i.test(emailText)
  ) {
    redFlags.push("Requests sensitive info via link");
  }

  // 3. Suspicious links (non-mainstream TLDs or IPs)
  if (
    /http[s]?:\/\/[^\s]+/i.test(emailText) &&
    /\.(tk|xyz|cf|gq|ml|top|pw|info|cc|ru|cn|biz|win|work|zip|review|country|stream|download|men|party|click|link|loan|date|trade|science|webcam|faith|racing|account|support|secure|login|signin|reset|update|verify)/i.test(emailText)
  ) {
    redFlags.push("Suspicious or unusual link");
  }

  // 4. Too good to be true
  if (/congratulations|winner|prize|lottery|free|selected|gift|reward/i.test(emailText)) {
    redFlags.push("Too good to be true offer");
  }

  // 5. Unusual sender domain (extract from "From:" line)
  const fromMatch = emailText.match(/from:\s*([^\s]+)/i);
  if (fromMatch) {
    const sender = fromMatch[1].toLowerCase();
    if (
      !(
        sender.endsWith("@gmail.com") ||
        sender.endsWith("@outlook.com") ||
        sender.endsWith("@yahoo.com") ||
        sender.endsWith("@hotmail.com") ||
        sender.endsWith("@icloud.com") ||
        sender.endsWith("@protonmail.com")
      )
    ) {
      redFlags.push("Unusual sender domain: " + sender.split("@")[1]);
    }
  }

  // 6. Generic greeting
  if (/dear (customer|user|client|member)/i.test(emailText)) {
    redFlags.push("Generic greeting");
  }

  // 7. Spelling/grammar errors (very basic check)
  if (/( recieve | recieve | acheive | adress | seperate | definately | occured | untill | thier | recieve )/i.test(emailText)) {
    redFlags.push("Possible spelling/grammar errors");
  }

  return redFlags;
}

import { useTranslation } from "react-i18next";

export default function EmailScamDetector() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [flags, setFlags] = useState([]);

  const handleCheck = (e) => {
    e.preventDefault();
    setFlags(detectScam(email));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-xl mx-auto mt-8"
      style={{
        fontFamily: "'Montserrat', 'Poppins', sans-serif",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid #e0eafc",
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-cyan-300">📧 {t("Email Scam Detector")}</h2>
      <form onSubmit={handleCheck}>
        <textarea
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t("Paste suspicious email text here...")}
          rows={6}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
          style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
        />
        <button
          type="submit"
          className="font-bold px-6 py-2 rounded-xl shadow transition bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-800"
        >
          {t("Check for Scams")}
        </button>
      </form>
      {flags.length > 0 && (
        <div className="mt-4">
          <div className="font-semibold text-lg text-red-600 mb-2">{t("Red Flags Detected:")}</div>
          <ul>
            {flags.map((flag, idx) => (
              <li key={idx} className="mb-1">
                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold mr-2">
                  ⚠️ {flag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {flags.length === 0 && email && (
        <div className="mt-4 font-semibold text-green-600">{t("No obvious scam signs detected.")}</div>
      )}
    </div>
  );
}
