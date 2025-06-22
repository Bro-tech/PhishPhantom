import React from "react";
import ReactDOM from "react-dom/client"; // Note the '/client' import
import App from "./app.jsx";
import "./index.css";

// Get the root element from your HTML (e.g., public/index.html)
const rootElement = document.getElementById("root");

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render your app within the created root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);