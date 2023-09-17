import { alphanumericEncoding } from "./Encoding";

describe("QR alphanumeric encoder", () => {
  it("encodes alphanumeric strings correctly", () => {
    expect(alphanumericEncoding("")).toBe("");
    expect(alphanumericEncoding("HE")).toBe("01100001011");
    expect(alphanumericEncoding("D")).toBe("001101");
    expect(alphanumericEncoding("HED")).toBe("01100001011001101");
  });
});
