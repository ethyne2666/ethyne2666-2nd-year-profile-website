// One place that knows how to talk to the backend.
// Every Lab component imports `apiGet` / `apiPost` from here instead of calling fetch() directly.

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Request failed");
  return json.data;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Request failed");
  return json.data;
}