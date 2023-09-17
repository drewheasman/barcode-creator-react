import { byteEncoding } from "./Encoding";

describe("QR byte encoder", () => {
  it("encodes byte strings correctly", () => {
    expect(byteEncoding("")).toBe("");
    expect(byteEncoding("H")).toBe("01001000");
    expect(byteEncoding("e")).toBe("01100101");
    expect(byteEncoding("l")).toBe("01101100");
    expect(byteEncoding("o")).toBe("01101111");
    expect(byteEncoding("Hello")).toBe(
      "0100100001100101011011000110110001101111"
    );
  });
});
