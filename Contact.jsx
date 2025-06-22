import React, { useState } from "react";
export default function Contact() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setMessage("");
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      {sent && <div className="mb-4 text-green-600">Thank you for your feedback!</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="p-2 border rounded"
          placeholder="Your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}