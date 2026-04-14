export type FetchError =
  | { type: "network"; message: string }
  | { type: "http"; status: number; statusText: string }
  | { type: "parse"; message: string };

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: FetchError };

export async function fetchJsonUnknown(
  url: string,
  signal?: AbortSignal,
): Promise<Result<unknown>> {
  let res: Response;

  try {
    res = await fetch(url, { signal });
  } catch (err) {
    return {
      ok: false,
      error: {
        type: "network",
        message: err instanceof Error ? err.message : "Network error",
      },
    };
  }

  if (!res.ok) {
    return {
      ok: false,
      error: {
        type: "http",
        status: res.status,
        statusText: res.statusText,
      },
    };
  }

  try {
    const data = await res.json();
    return {
      ok: true,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      error: {
        type: "parse",
        message: err instanceof Error ? err.message : "Invalid JSON",
      },
    };
  }
}
