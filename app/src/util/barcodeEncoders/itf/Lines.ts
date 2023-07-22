export function itfLines(data: string) {
  const startBits = "1010";
  const stopBits = "11101";

  let lines = startBits;

  for (let i = 0; i < data.length; i += 2) {
    lines += digitsToLines(data.charAt(i), data.charAt(i + 1));
  }

  lines += stopBits;

  return lines;
}

function digitsToLines(digitOne: string, digitTwo: string) {
  const lineWidths = interleavedWidths(digitOne, digitTwo);

  let lines = "";

  for (let i = 0; i < 10; i++) {
    if (lineWidths.charAt(i) === "n") {
      if (i % 2 === 0) {
        lines += "1";
      } else {
        lines += "0";
      }
    } else if (lineWidths.charAt(i) === "W") {
      if (i % 2 === 0) {
        lines += "111";
      } else {
        lines += "0000";
      }
    }
  }

  return lines;
}

function interleavedWidths(digitOne: string, digitTwo: string) {
  const digitOneWidths = widthsMap[digitOne];
  const digitTwoWidths = widthsMap[digitTwo];

  let calculatedWidths = "";

  for (let i = 0; i < 5; i++) {
    calculatedWidths += digitOneWidths.charAt(i);
    calculatedWidths += digitTwoWidths.charAt(i);
  }

  return calculatedWidths;
}

const widthsMap: { [key: string]: string } = {
  "0": "nnWWn",
  "1": "WnnnW",
  "2": "nWnnW",
  "3": "WWnnn",
  "4": "nnWnW",
  "5": "WnWnn",
  "6": "nWWnn",
  "7": "nnnWW",
  "8": "WnnWn",
  "9": "nWnWn",
};
