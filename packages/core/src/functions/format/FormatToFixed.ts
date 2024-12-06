export default function FormatToFixed(
  value: number,
  toFixed: number = 2
): number {
  return +value.toFixed(toFixed);
}
