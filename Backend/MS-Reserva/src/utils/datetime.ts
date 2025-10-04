export function toUTCDate(dateStr: string, timeStr: string): Date {
  const [yStr, moStr, dStr] = dateStr.split("-");
  const [hStr, mStr] = timeStr.split(":");

  const y = Number(yStr) || 0;
  const mo = (Number(moStr) || 1) - 1;
  const d = Number(dStr) || 1;
  const h = Number(hStr) || 0;
  const m = Number(mStr) || 0;

  return new Date(Date.UTC(y, mo, d, h, m, 0));
}

export function hoursBetween(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}
