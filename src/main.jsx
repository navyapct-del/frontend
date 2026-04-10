import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/app.css";
import posthog from "posthog-js";

// ── PostHog initialization ──────────────────────────────────────────────────
const PH_TOKEN = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const PH_HOST  = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

if (PH_TOKEN) {
  posthog.init(PH_TOKEN, {
    api_host:          PH_HOST || "https://app.posthog.com",
    capture_pageview:  true,
    capture_pageleave: true,
    autocapture:       true,
    loaded: (ph) => {
      // Always log so you can verify in production console too
      console.log(
        "%c[PostHog] ✓ Initialized",
        "color: #f3a11a; font-weight: bold;",
        "| host:", PH_HOST,
        "| token:", PH_TOKEN?.slice(0, 16) + "...",
        "| distinct_id:", ph.get_distinct_id()
      );
      // Enable debug mode always so events show in console
      ph.debug(true);
    },
  });
} else {
  console.warn(
    "%c[PostHog] ✗ Not initialized — VITE_PUBLIC_POSTHOG_PROJECT_TOKEN missing",
    "color: red; font-weight: bold;"
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
