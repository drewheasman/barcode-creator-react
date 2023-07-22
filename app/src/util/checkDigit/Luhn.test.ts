import { calculateLuhn, testExport } from "./Luhn";

test("Calculate luhn check digit", () => {
  expect(calculateLuhn("7992739871")).toStrictEqual({ checkDigit: "3" });
  expect(calculateLuhn("")).toStrictEqual({ checkDigit: "" });
});

test("Map characters to luhn characters", () => {
  expect(testExport.mapLuhnCharacter("1")).toEqual(1);
  expect(testExport.mapLuhnCharacter("a")).toEqual(10);
  expect(testExport.mapLuhnCharacter("`")).toEqual(0);
});

test("Lookup luhn characters", () => {
  expect(testExport.luhnMap["1"]).toStrictEqual(1);
  expect(testExport.luhnMap["a"]).toStrictEqual(10);
  expect(testExport.luhnMap["`"]).toBe(undefined);
});
