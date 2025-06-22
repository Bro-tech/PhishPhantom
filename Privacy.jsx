import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-cyan-300">Privacy Policy</h2>
      <p className="mb-2 text-gray-700 dark:text-gray-200">
        Your privacy is important to us. We do not store your scan data or personal information.
      </p>
      <p className="text-gray-700 dark:text-gray-200">
        All scans are processed securely and anonymously. For questions, please contact us via the Contact page.
      </p>
    </div>
  );
}