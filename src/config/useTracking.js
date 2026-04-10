/**
 * useTracking — thin wrapper around posthog.capture for consistent event tracking.
 *
 * Usage:
 *   const { track } = useTracking();
 *   track("file_uploaded", { filename: "report.xlsx", size_kb: 42 });
 */
import { usePostHog } from "posthog-js/react";

export const useTracking = () => {
  const posthog = usePostHog();

  const track = (eventName, properties = {}) => {
    if (!posthog) return;
    posthog.capture(eventName, properties);
    // Always log in dev so you can verify in the browser console
    if (import.meta.env.DEV) {
      console.log(`[PostHog] capture → "${eventName}"`, properties);
    }
  };

  return { track, posthog };
};
