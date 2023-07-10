import { linesMap } from "../code93/Lines";

export function code93ExtendedLines(data: string) {
  let lines = "";

  for (let i = 0; i < data.length; i++) {
    lines += linesLookup(data.charAt(i));
  }

  return `10${lines}1`;
}

function linesLookup(char: string) {
  const dollar = "100100110"; // å
  const percentage = "111011010"; // ∫
  const fslash = "111010110"; // ç
  const plus = "100110010"; // ∂

  if (char == "å") {
    return dollar;
  } else if (char == "∫") {
    return percentage;
  } else if (char == "ç") {
    return fslash;
  } else if (char == "∂") {
    return plus;
  } else {
    return linesMap[char];
  }
}
