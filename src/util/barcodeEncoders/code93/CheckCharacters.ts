export function code93CheckCharacters(data: string) {
  let checkCharacters = cCheckCharacter(data);
  checkCharacters += kCheckCharacter(data + checkCharacters);

  return checkCharacters;
}

function cCheckCharacter(data: string) {
  const checkDigit = weightCharacters(data, 20);
  return reverseCharacterWeightMap()[checkDigit % 47];
}

function kCheckCharacter(data: string) {
  const checkDigit = weightCharacters(data, 15);
  return reverseCharacterWeightMap()[checkDigit % 47];
}

function weightCharacters(data: string, maxWeight: number) {
  let characterWeight = 0;

  let weight = 1;
  for (let i = data.length - 1; i >= 0; i--) {
    if (weight > maxWeight) {
      weight = 1;
    }

    characterWeight += characterWeightMap[data.charAt(i)] * weight;

    weight++;
  }

  return characterWeight;
}

const characterWeightMap: { [key: string]: number } = {
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
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 18,
  J: 19,
  K: 20,
  L: 21,
  M: 22,
  N: 23,
  O: 24,
  P: 25,
  Q: 26,
  R: 27,
  S: 28,
  T: 29,
  U: 30,
  V: 31,
  W: 32,
  X: 33,
  Y: 34,
  Z: 35,
  "-": 36,
  ".": 37,
  " ": 38,
  $: 39,
  "/": 40,
  "+": 41,
  "%": 42,
  å: 43,
  "∫": 44,
  ç: 45,
  "∂": 46,
};

const reverseCharacterWeightMap = () => {
  let reversedMap: { [key: number]: string } = [];

  Object.entries(characterWeightMap).forEach(([key, value]) => {
    reversedMap[value] = key;
  });

  return reversedMap;
};

export const testExport = {
  cCheckCharacter,
  kCheckCharacter,
};
