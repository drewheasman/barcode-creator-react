export function code128Characters(input: string): number[] {
  const numericInput: boolean = !new RegExp("[^0-9]").test(input);

  let characters: number[];
  if (numericInput && input.length > 1) {
    characters = charactersCodeC(input);
  } else {
    characters = charactersCodeB(input);
  }

  characters.push(checkDigit(characters));
  characters.push(stopChar);

  return characters;
}

function charactersCodeB(input: string) {
  let characters = [startB];
  for (let i = 0; i < input.length; i++) {
    const l = input.charAt(i);
    const c = codeBMap[l];
    characters.push(c);
  }

  return characters;
}

function charactersCodeC(input: string) {
  let characters = [startC];
  for (let i = 0; i < input.length; i++) {
    // 2 characters at a time
    if (i + 1 < input.length) {
      let c = parseInt(input[i] + input[i + 1]);
      characters.push(c);
      i++;
    }
    // If one character left
    if (i + 1 === input.length && input.length % 2 !== 0) {
      characters.push(cToB);
      characters.push(codeBMap[input[i]]);
    }
  }

  return characters;
}

function checkDigit(input: number[]) {
  let checkDigit = input[0];

  for (let i = 1; i < input.length; i++) {
    checkDigit += input[i] * i;
  }

  checkDigit %= 103;

  return checkDigit;
}

// Special characters not in map
const startC = 105;
const startB = 104;
// const abToC = 99; // Not currently used
const cToB = 100;
// const cToA = 101; // Not currently used
export const stopChar = 106;

const codeBMap: { [key: string]: number } = {
  " ": 0,
  "!": 1,
  '"': 2,
  "#": 3,
  $: 4,
  "%": 5,
  "&": 6,
  "'": 7,
  "(": 8,
  ")": 9,
  "*": 10,
  "+": 11,
  ",": 12,
  "-": 13,
  ".": 14,
  "/": 15,
  "0": 16,
  "1": 17,
  "2": 18,
  "3": 19,
  "4": 20,
  "5": 21,
  "6": 22,
  "7": 23,
  "8": 24,
  "9": 25,
  ":": 26,
  ";": 27,
  "<": 28,
  "=": 29,
  ">": 30,
  "?": 31,
  "@": 32,
  A: 33,
  B: 34,
  C: 35,
  D: 36,
  E: 37,
  F: 38,
  G: 39,
  H: 40,
  I: 41,
  J: 42,
  K: 43,
  L: 44,
  M: 45,
  N: 46,
  O: 47,
  P: 48,
  Q: 49,
  R: 50,
  S: 51,
  T: 52,
  U: 53,
  V: 54,
  W: 55,
  X: 56,
  Y: 57,
  Z: 58,
  "[": 59,
  "\\": 60,
  "]": 61,
  "^": 62,
  _: 63,
  "`": 64,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  "{": 91,
  "|": 92,
  "}": 93,
  "~": 94,
};

export const testExport = {
  charactersCodeB,
  charactersCodeC,
  checkDigit,
  codeBMap,
};
