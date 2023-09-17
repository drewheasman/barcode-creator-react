import { encodeQR } from "./Encode";
import { ErrorCorrectionLevel } from "./ErrorCorrectionLevel";

describe("QR encoder", () => {
  it("encodes 'HELLO WORLD' correctly", () => {
    expect(encodeQR("HELLO WORLD", ErrorCorrectionLevel.Low)).toBe("");
  });
});
