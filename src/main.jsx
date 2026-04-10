import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/app.css";
import posthog from "posthog-js";

// ── PostHog initialization ──────────────────────────────────────────────────
const PH_TOKEN = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const PH_HOST  = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

if (PH_TOKEN) {
  posthog.init(PH_TOKEN, {
    api_host:              PH_HOST || "https://app.posthog.com",
    capture_pageview:      true,   // auto-capture page views
    capture_pageleave:     true,   // auto-capture page exits
    autocapture:           true,   // auto-capture clicks, inputs, form submits
    session_recording:     { maskAllInputs: false },
    loaded: (ph) => {
      // In development: log every event to the console for easy debugging
      if (import.meta.env.DEV) {
        ph.debug();
        console.log("[PostHog] Initialized ✓ | host:", PH_HOST, "| token:", PH_TOKEN?.slice(0, 12) + "...");
      }
    },
  });
} else {
  console.warn("[PostHog] VITE_PUBLIC_POSTHOG_PROJECT_TOKEN not set — tracking disabled.");
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
