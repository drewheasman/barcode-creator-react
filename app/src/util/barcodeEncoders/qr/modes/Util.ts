export function dec2bin(dec: number, padStart: number): string {
  return (dec >>> 0).toString(2).padStart(padStart, "0");
}
