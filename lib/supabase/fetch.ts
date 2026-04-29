const SUPABASE_FETCH_TIMEOUT_MS = 1200;

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const timeoutSignal = AbortSignal.timeout(SUPABASE_FETCH_TIMEOUT_MS);
  const signal = init?.signal
    ? AbortSignal.any([init.signal, timeoutSignal])
    : timeoutSignal;

  return fetch(input, {
    ...init,
    signal
  });
}
