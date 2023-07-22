import { code128Characters, testExport } from "./Characters";

test("Convert string to Code 128 character array", () => {
  expect(code128Characters("1")).toStrictEqual([104, 17, 18, 106]);
  expect(code128Characters("12")).toStrictEqual([105, 12, 14, 106]);
  expect(code128Characters("123")).toStrictEqual([105, 12, 100, 19, 65, 106]);
  expect(code128Characters("a")).toStrictEqual([104, 65, 66, 106]);
  expect(code128Characters("ab")).toStrictEqual([104, 65, 66, 95, 106]);
  expect(code128Characters("abc")).toStrictEqual([104, 65, 66, 67, 90, 106]);
});

test("Convert string to Code B characters", () => {
  expect(testExport.charactersCodeB("abcdef")).toStrictEqual([
    104, 65, 66, 67, 68, 69, 70,
  ]);
});

test("Convert string to Code C characters", () => {
  expect(testExport.charactersCodeC("123456")).toStrictEqual([105, 12, 34, 56]);
  expect(testExport.charactersCodeC("1234567")).toStrictEqual([
    105, 12, 34, 56, 100, 23,
  ]);
});

test("Check digit calculation", () => {
  expect(testExport.checkDigit([105, 1, 2, 3, 4, 5])).toBe(57);
});

test("Lookup Code C characters", () => {
  expect(testExport.codeBMap[" "]).toBe(0);
  expect(testExport.codeBMap["1"]).toBe(17);
  expect(testExport.codeBMap["a"]).toBe(65);
  expect(testExport.codeBMap["|"]).toBe(92);
  expect(testExport.codeBMap["¬"]).toBe(undefined);
});
