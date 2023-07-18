import { code93CheckCharacters, testExport } from "./CheckCharacters";

test("Calculate Code93 check character C", () => {
  expect(testExport.cCheckCharacter("1")).toBe("1");
  expect(testExport.cCheckCharacter("CODE 93")).toBe("E");
  expect(testExport.cCheckCharacter("STRING OVER 20 CHARACTERS")).toBe("G");
});

test("Calculate Code93 check character K", () => {
  expect(testExport.kCheckCharacter("1")).toBe("1");
  expect(testExport.kCheckCharacter("CODE 93E")).toBe("0");
  expect(testExport.kCheckCharacter("STRING OVER 15 CHARACTERS")).toBe("I");
});

test("Calculate Code93 check characters", () => {
  expect(code93CheckCharacters("CODE 93")).toBe("E0");
});
