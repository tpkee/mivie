export function hToMs(hours: number): number {
  return hours * Math.pow(60, 2) * Math.pow(10, 3)
}
