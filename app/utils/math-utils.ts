export const MAX_RAND: number = 2147483647

export function RandomInBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
