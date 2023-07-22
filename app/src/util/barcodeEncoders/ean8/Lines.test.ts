import { ean8Lines } from "./Lines";

test("EAN8 lines", () => {
  expect(ean8Lines("40123455")).toBe(
    "000101001000110001101001100100100110101010000101011100100111010011101010000"
  );
});
