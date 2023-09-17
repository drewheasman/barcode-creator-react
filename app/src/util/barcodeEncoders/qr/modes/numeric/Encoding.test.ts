import { numericEncoding } from "./Encoding";

describe("QR numeric encoder", () => {
  it("encodes numeric strings correctly", () => {
    expect(numericEncoding("")).toBe("");
    expect(numericEncoding("291")).toBe("0100100011");
    expect(numericEncoding("76")).toBe("1001100");
    expect(numericEncoding("4")).toBe("0100");
  });
});
