import { CalculatedCheckDigit } from "../../interface/CalculatedCheckDigit";
import { MessageLevel } from "../../interface/Message";

export function calculateEan(input: string): CalculatedCheckDigit {
  if (input === "" || /\D/.test(input)) {
    return {
      checkDigit: "",
      message: {
        level: MessageLevel.Warn,
        message: "Could not calculate UPC-A check digit for non-numeric data",
      },
    };
  }

  let data = [];
  for (let i = 0; i < input.length; i++) {
    data[i] = parseInt(input.charAt(i));
  }

  let checkDigit = 10 - (weightAndSum(data) % 10);
  if (checkDigit === 10) {
    checkDigit = 0;
  }

  // Return input string with check digit appended
  return { checkDigit: checkDigit.toString() };
}

function weightAndSum(digits: number[]) {
  let weightedDigit = 0;

  // Weight and sum every other digit by 3, from the right
  let shouldWeight = true;
  for (let i = digits.length - 1; i > -1; i--) {
    if (shouldWeight === true) {
      digits[i] *= 3;
    }

    weightedDigit += digits[i];
    shouldWeight = !shouldWeight;
  }

  return weightedDigit;
}

export const testExport = {
  weightAndSum,
};
