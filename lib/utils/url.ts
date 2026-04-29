export function normalizeUrlInput(value: string) {
  const normalized = value.trim();

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(normalized);
  } catch {
    throw new Error("Invalid URL.");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Invalid URL protocol.");
  }

  return parsedUrl.toString();
}

export function isValidHttpUrl(value: string) {
  try {
    normalizeUrlInput(value);
    return true;
  } catch {
    return false;
  }
}

