import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, LoaderCircle, Play } from "lucide-react";
import { apiGet, apiPost } from "../api/client";

interface PlaygroundEndpoint {
  id: string;
  method: string;
  path: string;
  description: string;
}

interface ExecutionResult {
  endpointId: string;
  method: string;
  path: string;
  statusCode: number;
  responseBody: unknown;
  responseTimeMs: number;
}

const formatResponseBody = (body: unknown): string => {
  if (body === null || body === undefined) {
    return "The request completed without a response body.";
  }

  if (typeof body === "string") {
    try {
      return JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      return body;
    }
  }

  try {
    return JSON.stringify(body, null, 2) ?? String(body);
  } catch {
    return String(body);
  }
};

const RequestConsole = () => {
  const [endpoints, setEndpoints] = useState<PlaygroundEndpoint[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [loadingEndpoints, setLoadingEndpoints] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const loadEndpoints = async () => {
      setLoadingEndpoints(true);
      setError(null);

      try {
        const data = await apiGet<PlaygroundEndpoint[]>(
          "/api/lab/postman/endpoints"
        );

        if (cancelled) return;

        const availableEndpoints = Array.isArray(data) ? data : [];
        setEndpoints(availableEndpoints);

        if (availableEndpoints.length > 0) {
          setSelectedId(availableEndpoints[0].id);
        }
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load the available requests."
        );
      } finally {
        if (!cancelled) setLoadingEndpoints(false);
      }
    };

    void loadEndpoints();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleExecute = async () => {
    if (!selectedId || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await apiPost<ExecutionResult>(
        "/api/lab/postman/execute",
        { endpointId: selectedId }
      );

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "The request could not be run."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedEndpoint = endpoints.find(
    (endpoint) => endpoint.id === selectedId
  );

  const responseIsSuccessful =
    result !== null && result.statusCode >= 200 && result.statusCode < 300;

  return (
    <section className="w-full min-w-0">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
        ~/playground/request-console
      </p>

      <h2 className="text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl">
        Pick a request. Run it for real.
      </h2>

      <p className="mb-6 mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
        These requests call the backend API. Select an endpoint to inspect it,
        then run the request and review the response.
      </p>

      {/* Custom request dropdown and run action */}
      <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row">
        <div ref={dropdownRef} className="relative min-w-0 flex-1">
          <button
            type="button"
            aria-label="Select an API request"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            disabled={loadingEndpoints || endpoints.length === 0}
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex min-h-12 w-full min-w-0 items-center gap-3 rounded-lg border border-neutral-400 bg-white px-4 py-3 text-left shadow-sm transition hover:border-neutral-950 focus:border-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-200 disabled:cursor-wait disabled:bg-neutral-100"
          >
            <span
              aria-hidden="true"
              className="flex-shrink-0 font-mono text-sm font-bold text-neutral-950"
            >
              $
            </span>

            <span className="min-w-0 flex-1 truncate font-mono text-sm text-neutral-950">
              {loadingEndpoints
                ? "Loading requests…"
                : selectedEndpoint
                  ? `${selectedEndpoint.method} ${selectedEndpoint.path}`
                  : "No requests available"}
            </span>

            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 flex-shrink-0 text-neutral-700 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && endpoints.length > 0 && (
            <ul
              role="listbox"
              aria-label="Available API requests"
              className="absolute left-0 right-0 top-full z-30 mt-2 max-h-56 w-full min-w-0 overflow-y-auto overscroll-contain rounded-lg border border-neutral-400 bg-white p-1 shadow-xl"
            >
              {endpoints.map((endpoint) => {
                const isSelected = endpoint.id === selectedId;

                return (
                  <li key={endpoint.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(endpoint.id);
                        setResult(null);
                        setError(null);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full min-w-0 items-start gap-3 rounded-md px-3 py-3 text-left font-mono text-sm transition ${
                        isSelected
                          ? "bg-neutral-950 text-white"
                          : "text-neutral-900 hover:bg-neutral-100"
                      }`}
                    >
                      <span className="min-w-0 flex-1 break-all">
                        {endpoint.method} {endpoint.path}
                      </span>

                      {isSelected && (
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={handleExecute}
          disabled={loading || loadingEndpoints || !selectedId}
          className="inline-flex min-h-12 flex-shrink-0 items-center justify-center gap-2 rounded-lg border border-neutral-950 bg-neutral-950 px-6 py-3 font-mono text-sm font-semibold text-white transition hover:bg-white hover:text-neutral-950 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-400"
        >
          {loading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {loading ? "Running…" : "Run request"}
        </button>
      </div>

      {selectedEndpoint && (
        <p className="mb-6 text-sm leading-6 text-neutral-600">
          {selectedEndpoint.description}
        </p>
      )}

      {loadingEndpoints && (
        <div
          role="status"
          className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600"
        >
          Loading available requests…
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-neutral-400 bg-neutral-50 p-4 text-sm text-neutral-800"
        >
          <p className="font-semibold">Request error</p>
          <p className="mt-1 break-words leading-6">{error}</p>
        </div>
      )}

      {!loadingEndpoints && !error && endpoints.length === 0 && (
        <div className="rounded-lg border border-dashed border-neutral-400 bg-neutral-50 p-5 text-sm leading-6 text-neutral-700">
          No endpoints were returned by{" "}
          <code className="break-all rounded bg-white px-1.5 py-0.5 font-mono text-xs text-neutral-950">
            /api/lab/postman/endpoints
          </code>
          . Check that the backend is running and that this route returns an
          array of endpoints.
        </div>
      )}

      {result && (
        <section
          aria-label="Request result"
          className="min-w-0 overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-sm"
        >
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 border-b border-neutral-300 bg-neutral-50 px-4 py-3 font-mono text-xs">
            <span className="font-semibold text-neutral-950">
              {result.method}
            </span>

            <span className="min-w-0 flex-1 break-all text-neutral-700">
              {result.path}
            </span>

            <span className="rounded-md border border-neutral-400 bg-white px-2 py-1 font-semibold text-neutral-950">
              {result.statusCode}
              {responseIsSuccessful ? " OK" : " RESPONSE"}
            </span>

            <span className="text-neutral-600">
              {result.responseTimeMs} ms
            </span>
          </div>

          <div className="border-b border-neutral-200 px-4 py-2">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Response body
            </h3>
          </div>

          <pre className="max-h-[28rem] min-h-28 max-w-full overflow-auto whitespace-pre-wrap break-words bg-white p-4 font-mono text-xs leading-6 text-neutral-900 sm:text-sm">
            {formatResponseBody(result.responseBody)}
          </pre>
        </section>
      )}

      {!result &&
        !error &&
        !loading &&
        !loadingEndpoints &&
        endpoints.length > 0 && (
          <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 text-sm text-neutral-600">
            Select a request above and choose{" "}
            <span className="font-semibold text-neutral-950">Run request</span>{" "}
            to see its status and response data here.
          </div>
        )}
    </section>
  );
};

export default RequestConsole;