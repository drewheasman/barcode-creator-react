import { MessageLevel } from "../../../enum/MessageLevel";
import { encodeEan8 } from "./Encode";

test("Encode EAN8 success", () => {
  expect(encodeEan8("4012345")).toStrictEqual({
    outputString: "40123455",
    outputLength: "8",
    barcodeLinesBits:
      "000101001000110001101001100100100110101010000101011100100111010011101010000",
    barcodeText: "40123455",
    messages: [],
  });
});

test("Encode EAN8 invalid characters", () => {
  expect(encodeEan8("401234512abc")).toStrictEqual({
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [
      {
        level: MessageLevel.Error,
        message: "EAN-8 barcodes are numeric only",
      },
    ],
  });
});

test("Encode EAN8 short input", () => {
  expect(encodeEan8("4012")).toStrictEqual({
    outputString: "00040129",
    outputLength: "8",
    barcodeLinesBits:
      "000101000011010001101000110101000110101011100101100110110110011101001010000",
    barcodeText: "00040129",
    messages: [
      {
        level: MessageLevel.Warn,
        message: "Input padded, EAN-8 barcodes have input length 7",
      },
    ],
  });
});

test("Encode EAN8 long input", () => {
  expect(encodeEan8("4012345123456")).toStrictEqual({
    outputString: "40123455",
    outputLength: "8",
    barcodeLinesBits:
      "000101001000110001101001100100100110101010000101011100100111010011101010000",
    barcodeText: "40123455",
    messages: [
      {
        level: MessageLevel.Warn,
        message: "Input truncated, EAN-8 barcodes have max input length 7",
      },
    ],
  });
});
