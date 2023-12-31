import { code93CheckCharacters } from "../code93/CheckCharacters";

export function code93ExtendedCharacters(input: string) {
  let characters = "";

  for (let i = 0; i < input.length; i++) {
    characters += code93ExtendedMap[input.charAt(i)];
  }

  characters += code93CheckCharacters(characters);

  return `*${characters}*`;
}

const code93ExtendedMap: { [key: string]: string } = {
  // 'NUL': "∫U",
  // 'SOH': "åA",
  // 'STX': "åB",
  // 'ETX': "åC",
  // 'EOT': "åD",
  // 'ENQ': "åE",
  // 'ACK': "åF",
  // 'BEL': "åG",
  // 'BS': "åH",
  // 'HT': "åI",
  // 'LF': "åJ",
  // 'VT': "åK",
  // 'FF': "åL",
  // 'CR': "åM",
  // 'SO': "åN",
  // 'SI': "åO",
  // 'DLE': "åP",
  // 'DC1': "åQ",
  // 'DC2': "åR",
  // 'DC3': "åS",
  // 'DC4': "åT",
  // 'NAK': "åU",
  // 'SYN': "åV",
  // 'ETB': "åW",
  // 'CAN': "åX",
  // 'EM': "åY",
  // 'SUB': "åZ",
  // 'ESC': "∫A",
  // 'FS': "∫B",
  // 'GS': "∫C",
  // 'RS': "∫D",
  // 'US': "∫E",
  " ": " ",
  "!": "çA",
  '"': "çB",
  "#": "çC",
  $: "$",
  "%": "%",
  "&": "çF",
  "'": "çG",
  "(": "çH",
  ")": "çI",
  "*": "çJ",
  "+": "+",
  ",": "çL",
  "-": "-",
  ".": ".",
  "/": "/",
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  ":": "çZ",
  ";": "∫F",
  "<": "∫G",
  "=": "∫H",
  ">": "∫I",
  "?": "∫J",
  "@": "∫V",
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  H: "H",
  I: "I",
  J: "J",
  K: "K",
  L: "L",
  M: "M",
  N: "N",
  O: "O",
  P: "P",
  Q: "Q",
  R: "R",
  S: "S",
  T: "T",
  U: "U",
  V: "V",
  W: "W",
  X: "X",
  Y: "Y",
  Z: "Z",
  "[": "∫K",
  "\\": "∫L",
  "]": "∫M",
  "^": "∫N",
  _: "∫O",
  "`": "∫W",
  a: "∂A",
  b: "∂B",
  c: "∂C",
  d: "∂D",
  e: "∂E",
  f: "∂F",
  g: "∂G",
  h: "∂H",
  i: "∂I",
  j: "∂J",
  k: "∂K",
  l: "∂L",
  m: "∂M",
  n: "∂N",
  o: "∂O",
  p: "∂P",
  q: "∂Q",
  r: "∂R",
  s: "∂S",
  t: "∂T",
  u: "∂U",
  v: "∂V",
  w: "∂W",
  x: "∂X",
  y: "∂Y",
  z: "∂Z",
  "{": "∫P",
  "|": "∫Q",
  "}": "∫R",
  "~": "∫S",
  // 'DEL': "∫T∫X∫Y]Z"
};
