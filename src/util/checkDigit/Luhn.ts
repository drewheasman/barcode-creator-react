import { CalculatedCheckDigit } from "../../interface/CalculatedCheckDigit";

export function calculateLuhn(input: string): CalculatedCheckDigit {
  if (input === "") {
    return { checkDigit: "" };
  }

  const calcArray: number[] = [];

  // Map characters to luhn numbers
  for (let i = 0; i < input.length; i++) {
    calcArray.push(mapLuhnCharacter(input.charAt(i)));
  }

  // Double every other digit from right
  let shouldDouble = true;
  for (let i = input.length - 1; i >= 0; i--) {
    if (shouldDouble === true) {
      calcArray[i] *= 2;
      // Sum digits if greater than 9
      while (calcArray[i] > 9) {
        calcArray[i] -= 9;
      }
    }
    shouldDouble = !shouldDouble;
  }

  // Sum digits
  let checkDigit = 0;
  for (let i = 0; i < calcArray.length; i++) {
    checkDigit += calcArray[i];
  }

  // *9 mod 10
  return { checkDigit: ((checkDigit * 9) % 10).toString() };
}

function mapLuhnCharacter(char: string) {
  const luhnChar = luhnMap[char];
  return luhnChar === undefined ? 0 : luhnChar;
}

const luhnMap: { [key: string]: number } = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  g: 16,
  h: 17,
  i: 18,
  j: 19,
  k: 20,
  l: 21,
  m: 22,
  n: 23,
  o: 24,
  p: 25,
  q: 26,
  r: 27,
  s: 28,
  t: 29,
  u: 30,
  v: 31,
  w: 32,
  x: 33,
  y: 34,
  z: 35,
  A: 36,
  B: 37,
  C: 38,
  D: 39,
  E: 40,
  F: 41,
  G: 42,
  H: 43,
  I: 44,
  J: 45,
  K: 46,
  L: 47,
  M: 48,
  N: 49,
  O: 50,
  P: 51,
  Q: 52,
  R: 53,
  S: 54,
  T: 55,
  U: 56,
  V: 57,
  W: 58,
  Y: 59,
  Z: 60,
};

export const testExport = {
  mapLuhnCharacter,
  luhnMap,
};
