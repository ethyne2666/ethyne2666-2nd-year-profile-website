// Shared fetch helper for every playground demo.
// Uses the same env var your contact form already uses (VITE_API_BASE_URL).
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:8080" : "");

export type Method = "GET" | "POST";

// What we are about to send. "shown*" fields are shortened copies for the console UI
// (so a 200-character token doesn't wreck the layout) - the real values are sent.
export interface RequestSpec {
  method: Method;
  path: string;
  shownPath?: string;
  headers?: Record<string, string>;
  shownHeaders?: Record<string, string>;
  body?: unknown;
}

export interface Exchange extends RequestSpec {
  id: number;
  pending: boolean;
  status?: number;
  ms?: number;
  response?: unknown;
  networkError?: string;
}

let counter = 0;
export const newId = () => ++counter;

export async function send(spec: RequestSpec): Promise<Pick<Exchange, "status" | "ms" | "response" | "networkError">> {
  const headers: Record<string, string> = {
    ...(spec.body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...spec.headers,
  };
  const started = performance.now();
  try {
    const res = await fetch(`${API_BASE_URL}${spec.path}`, {
      method: spec.method,
      headers,
      body: spec.body !== undefined ? JSON.stringify(spec.body) : undefined,
    });
    const response = await res.json().catch(() => null);
    return { status: res.status, ms: Math.round(performance.now() - started), response };
  } catch {
    return {
      ms: Math.round(performance.now() - started),
      networkError: "Could not reach the server (it may be waking up, or CORS is blocking this origin).",
    };
  }
}