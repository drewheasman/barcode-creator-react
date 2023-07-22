import {
  eanGMap,
  eanLMap,
  eanRMap,
  endLines,
  middleLines,
  startLines,
} from "../eanCommon/EanLines";

export function ean13Lines(data: string) {
  let lines = startLines;

  const middleStructure = structureMap[data.charAt(0)];

  for (let i = 0; i < 6; i++) {
    if (middleStructure.charAt(i) === "L") {
      lines += eanLMap[data.charAt(i + 1)];
    } else if (middleStructure.charAt(i) === "G") {
      lines += eanGMap[data.charAt(i + 1)];
    }
  }

  lines += middleLines;

  for (let i = 7; i < 13; i++) {
    lines += eanRMap[data.charAt(i)];
  }

  lines += endLines;

  return lines;
}

const structureMap: { [key: string]: string } = {
  "0": "LLLLLL",
  "1": "LLGLGG",
  "2": "LLGGLG",
  "3": "LLGGGL",
  "4": "LGLLGG",
  "5": "LGGLLG",
  "6": "LGGGLL",
  "7": "LGLGLG",
  "8": "LGLGGL",
  "9": "LGGLGL",
};

export const testExport = {
  structureMap,
};
