const ALPHABET =
  "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const DEFAULT_SLUG_LENGTH = 6;

export function generateShortSlug(length = DEFAULT_SLUG_LENGTH) {
  const buffer = new Uint8Array(length);
  crypto.getRandomValues(buffer);

  return Array.from(buffer, (value) => ALPHABET[value % ALPHABET.length]).join("");
}

