import React, { useState } from "react";

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;
  return score;
}

const strengthLabels = [
  "Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"
];
const strengthColors = [
  "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-blue-400", "bg-green-400", "bg-green-600"
];

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const score = getStrength(password);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-xl mx-auto mt-8"
      style={{
        fontFamily: "'Montserrat', 'Poppins', sans-serif",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid #e0eafc",
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-cyan-300">🔒 Password Strength Checker</h2>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
        style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
      />
      {password && (
        <div>
          <div className={`h-3 rounded ${strengthColors[score]} mb-2 transition-all`} />
          <div className="font-semibold text-lg" style={{ color: score < 3 ? "#e53e3e" : score < 5 ? "#f6ad55" : "#38a169" }}>
            {strengthLabels[score]}
          </div>
          <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
            <li>At least 8 characters</li>
            <li>Uppercase & lowercase letters</li>
            <li>Numbers</li>
            <li>Special characters</li>
            <li>12+ characters for best security</li>
          </ul>
        </div>
      )}
    </div>
  );
}