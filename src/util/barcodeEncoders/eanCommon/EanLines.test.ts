import { eanGMap, eanLMap, eanRMap } from "./EanLines";

test("EAN L common lines", () => {
  expect(eanLMap["0"]).toBe("0001101");
});

test("EAN G common lines", () => {
  expect(eanGMap["5"]).toBe("0111001");
});

test("EAN R common lines", () => {
  expect(eanRMap["9"]).toBe("1110100");
});
