export function formatMileage(km) {
  if (km === null || km === undefined) return '—';
  return `${Number(km).toLocaleString('en-US')} km`;
}