export function normalizeApiTimestamp(apiTimestamp: number): Date {
  return new Date(apiTimestamp * 1000);
}

export const PHONE_MAX_DIGITS = 15;
export const PHONE_MIN_DIGITS = 10;

export function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, PHONE_MAX_DIGITS);

  if (!digits) {
    return raw.trimStart().startsWith('+') ? '+' : '';
  }

  return `+${digits}`;
}
