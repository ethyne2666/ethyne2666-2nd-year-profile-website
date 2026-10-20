// Tiny browser-side JWT helpers. These only READ/REBUILD tokens for the demo -
// they never verify anything. Verification happens on the Spring Boot server.

const fromB64Url = (s: string) => {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const toB64Url = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export interface JwtParts {
  header: string;
  payload: string;
  signature: string;
}

export const splitToken = (token: string): JwtParts | null => {
  const p = token.split(".");
  return p.length === 3 ? { header: p[0], payload: p[1], signature: p[2] } : null;
};

export const decodePart = (part: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(fromB64Url(part));
  } catch {
    return null;
  }
};

// Rewrites the payload to claim sub = "admin" but keeps the ORIGINAL signature.
// The server recomputes the signature, sees it no longer matches, and rejects it.
export const tamperToken = (token: string): string => {
  const parts = splitToken(token);
  const payload = parts && decodePart(parts.payload);
  if (!parts || !payload) return token;
  return `${parts.header}.${toB64Url(JSON.stringify({ ...payload, sub: "admin" }))}.${parts.signature}`;
};

export const shorten = (token: string, head = 18, tail = 8) =>
  token.length > head + tail + 3 ? `${token.slice(0, head)}…${token.slice(-tail)}` : token;