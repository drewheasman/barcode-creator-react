import {
  eanLMap,
  eanRMap,
  endLines,
  middleLines,
  startLines,
} from "../eanCommon/EanLines";

export function ean8Lines(data: string) {
  let lines = startLines;

  for (let i = 0; i < 4; i++) {
    lines += eanLMap[data.charAt(i)];
  }

  lines += middleLines;

  for (let i = 4; i < 8; i++) {
    lines += eanRMap[data.charAt(i)];
  }

  lines += endLines;

  return lines;
}
