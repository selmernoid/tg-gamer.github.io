export function TimeToDiscrete(time: number, fraction: number): number {
  return Math.max(1, Math.floor(time / fraction));
}