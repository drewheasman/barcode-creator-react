import { itfLines } from "./Lines";

test("ITF lines", () => {
  expect(itfLines("602003")).toBe(
    "101010111011100001000010101110100001000011101000010000111011101011101"
  );
});
