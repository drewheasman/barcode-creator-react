import { MessageLevel } from "../../interface/Message";
import { calculateEanCheckDigit, testExport } from "./Ean";

test("Weight and sum", () => {
  expect(testExport.weightAndSum([2, 3, 4])).toBe(21);
  expect(testExport.weightAndSum([1, 2, 3, 4])).toBe(22);
});

test("Calculate EAN check digit", () => {
  expect(calculateEanCheckDigit("03600024145")).toStrictEqual({
    checkDigit: "7",
  });
  expect(calculateEanCheckDigit("123231123")).toStrictEqual({
    checkDigit: "0",
  });
  expect(calculateEanCheckDigit("501234567421")).toStrictEqual({
    checkDigit: "6",
  });
  expect(calculateEanCheckDigit("501234567421A")).toStrictEqual({
    checkDigit: "",
    message: {
      level: MessageLevel.Warn,
      message: "Could not calculate UPC-A check digit for non-numeric data",
    },
  });
});
