export function normalizeApiTimestamp(apiTimestamp: number): Date {
  return new Date(apiTimestamp * 1000);
}
