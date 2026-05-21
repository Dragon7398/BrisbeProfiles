// Firebase keys cannot contain '.'. RPelago encodes '.' as '_' in handleIndex keys.
// Discord usernames are forced lowercase, so normalise before lookup.
export function encodeHandle(handle: string): string {
  return handle.toLowerCase().replace(/\./g, '_');
}

export function fmtDate(ms: number | null | undefined): string {
  if (ms == null) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(ms));
}
