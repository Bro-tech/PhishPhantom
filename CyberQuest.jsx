import React, { useState, useEffect } from "react";

const challenges = [
  {
    type: "url",
    question: "Which of these URLs is safe?",
    options: [
      { text: "https://secure-paypal.com/login", correct: false },
      { text: "https://paypal.com/login", correct: true },
      { text: "https://paypal.secure-login.com", correct: false },
    ],
    explanation: "Always check the real domain. Only 'paypal.com' is safe here.",
  },
  {
    type: "email",
    question: "Spot the red flag in this email:",
    options: [
      { text: "The sender's address is support@paypa1.com", correct: true },
      { text: "The email uses your real name", correct: false },
      { text: "There is a PayPal logo", correct: false },
    ],
    explanation: "The sender's address uses a '1' instead of an 'l' in 'paypal'.",
  },
  {
    type: "login",
    question: "Which login page is safe?",
    options: [
      { text: "Page with URL: https://accounts.google.com/signin", correct: true },
      { text: "Page with URL: https://google.signin-account.com", correct: false },
      { text: "Page with URL: https://accounts.gooogle.com/signin", correct: false },
    ],
    explanation: "Check for typos and subdomains. Only the official domain is safe.",
  },
];

const badges = [
  { threshold: 1, label: "Beginner" },
  { threshold: 2, label: "Cyber Scout" },
  { threshold: 3, label: "PhishPhantom Pro" },
];

export default function CyberQuest() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (showResult) {
      const prev = parseInt(window.localStorage.getItem("cyberQuestHighScore") || "0", 10);
      if (score > prev) {
        window.localStorage.setItem("cyberQuestHighScore", score);
      }
    }
  }, [showResult, score]);

  const handleOption = (idx) => {
    const challenge = challenges[current];
    const isCorrect = challenge.options[idx].correct;
    setAnswers([...answers, { idx, isCorrect }]);
    if (isCorrect) setScore(score + 1);
    if (current + 1 < challenges.length) {
      setTimeout(() => setCurrent(current + 1), 1000);
    } else {
      setTimeout(() => setShowResult(true), 1000);
    }
  };

  const getBadge = () => {
    return badges
      .slice()
      .reverse()
      .find((b) => score >= b.threshold)?.label || "Newbie";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl mx-auto mt-8"
      style={{
        fontFamily: "'Montserrat', 'Poppins', sans-serif",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid #e0eafc",
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-cyan-300 flex items-center gap-2">
        🕵️ Cyber Quests
      </h2>
      {!showResult ? (
        <>
          <div className="mb-4">
            <span className="font-semibold text-lg">{challenges[current].question}</span>
          </div>
          <div className="flex flex-col gap-3">
            {challenges[current].options.map((opt, idx) => {
              const answered = answers[current];
              let btnStyle =
                "px-4 py-2 rounded-lg font-semibold shadow transition border";
              if (answered) {
                if (idx === answered.idx) {
                  btnStyle += opt.correct
                    ? " bg-green-200 border-green-500 text-green-900"
                    : " bg-red-200 border-red-500 text-red-900";
                } else {
                  btnStyle += " bg-gray-100 dark:bg-gray-700";
                }
              } else {
                btnStyle +=
                  " bg-blue-100 dark:bg-cyan-900 hover:bg-blue-200 dark:hover:bg-cyan-800 border-blue-300 dark:border-cyan-700 text-blue-800 dark:text-cyan-200";
              }
              return (
                <button
                  key={idx}
                  className={btnStyle}
                  disabled={!!answered}
                  onClick={() => handleOption(idx)}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
          {answers[current] && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {challenges[current].explanation}
            </div>
          )}
          <div className="mt-6 text-right text-sm text-gray-400">
            Question {current + 1} of {challenges.length}
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="text-3xl font-bold mb-2 text-green-600 dark:text-cyan-300">
            {score} / {challenges.length} correct!
          </div>
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 font-semibold shadow">
              🏅 Badge: {getBadge()}
            </span>
          </div>
          <button
            className="mt-4 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition"
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setAnswers([]);
              setShowResult(false);
            }}
          >
            Play Again
          </button>
        </div>
      )}
      <div className="mt-8 text-center text-xs text-gray-400">
        <span className="font-semibold">Leaderboard (local):</span>
        <br />
        <span>
          Highest Score:{" "}
          {window.localStorage.getItem("cyberQuestHighScore") || 0}
        </span>
      </div>
    </div>
  );
}