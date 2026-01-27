export type AnalyticsEventName = "cta_click" | "lead_submit" | "pricing_view" | "lead_magnet_download";

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

const STORAGE_KEY = "kindai_utm_params";
const EVENT_STORAGE_KEY = "kindai_analytics_events";

const parseUtmParams = (url: string): UtmParams => {
  const params = new URL(url).searchParams;
  return UTM_KEYS.reduce<UtmParams>((acc, key) => {
    const value = params.get(key);
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const storeUtmParamsFromUrl = (url: string = window.location.href) => {
  if (typeof window === "undefined") return;
  const utm = parseUtmParams(url);
  if (Object.keys(utm).length === 0) return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
};

export const getUtmParams = (): UtmParams => {
  if (typeof window === "undefined") return {};
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored) as UtmParams;
  } catch {
    return {};
  }
};

export const trackEvent = (
  event: AnalyticsEventName,
  payload: Record<string, unknown> = {},
) => {
  if (typeof window === "undefined") return;
  const eventPayload = {
    event,
    timestamp: new Date().toISOString(),
    ...getUtmParams(),
    ...payload,
  };

  try {
    const existing = localStorage.getItem(EVENT_STORAGE_KEY);
    const events = existing ? JSON.parse(existing) : [];
    events.push(eventPayload);
    localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events));
  } catch {
    // Ignore storage errors.
  }

  window.dispatchEvent(new CustomEvent("kindai-analytics", { detail: eventPayload }));

  if (import.meta.env.DEV) {
    console.info("[analytics]", eventPayload);
  }
};
