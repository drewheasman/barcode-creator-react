import { MessageLevel } from "../../../enum/MessageLevel";
import { encodeEan13 } from "./Encode";

test("Encode EAN13 success", () => {
  expect(encodeEan13("401234512345")).toStrictEqual({
    outputString: "4012345123456",
    outputLength: "13",
    barcodeLinesBits:
      "0001010000110101100110010011011110100111010111001010101100110110110010000101011100100111010100001010000",
    barcodeText: "4012345123456",
    messages: [],
  });
});

test("Encode EAN13 invalid characters", () => {
  expect(encodeEan13("401234512abc")).toStrictEqual({
    outputString: "",
    outputLength: "",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [
      {
        level: MessageLevel.Error,
        message: "EAN-13 barcodes are numeric only",
      },
    ],
  });
});

test("Encode EAN13 short input", () => {
  expect(encodeEan13("4012345")).toStrictEqual({
    outputString: "0000040123455",
    outputLength: "13",
    barcodeLinesBits:
      "0001010000110100011010001101000110101000110001101010101100110110110010000101011100100111010011101010000",
    barcodeText: "0000040123455",
    messages: [
      {
        level: MessageLevel.Warn,
        message: "Input padded, EAN-13 barcodes have input length 12",
      },
    ],
  });
});

test("Encode EAN13 long input", () => {
  expect(encodeEan13("4012345123456")).toStrictEqual({
    outputString: "4012345123456",
    outputLength: "13",
    barcodeLinesBits:
      "0001010000110101100110010011011110100111010111001010101100110110110010000101011100100111010100001010000",
    barcodeText: "4012345123456",
    messages: [
      {
        level: MessageLevel.Warn,
        message: "Input truncated, EAN-13 barcodes have max input length 12",
      },
    ],
  });
});
