import { ean13Lines, testExport } from "./Lines";

test("EAN13 structure map", () => {
  expect(testExport.structureMap["0"]).toBe("LLLLLL");
  expect(testExport.structureMap["4"]).toBe("LGLLGG");
  expect(testExport.structureMap["9"]).toBe("LGGLGL");
});

test("EAN13 lines", () => {
  expect(ean13Lines("4012345123456")).toBe(
    "0001010000110101100110010011011110100111010111001010101100110110110010000101011100100111010100001010000"
  );
});
