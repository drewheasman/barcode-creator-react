import { MessageLevel } from "../../../enum/MessageLevel";
import { encodeITF } from "./Encode";

test("Encode ITF success", () => {
  expect(encodeITF("602003")).toStrictEqual({
    outputString: "602003",
    outputLength: "6",
    barcodeLinesBits:
      "101010111011100001000010101110100001000011101000010000111011101011101",
    barcodeText: "602003",
    messages: [],
  });
});

test("Encode ITF invalid characters", () => {
  expect(encodeITF("401234512abc")).toStrictEqual({
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [
      {
        level: MessageLevel.Error,
        message: "ITF barcodes are numeric only",
      },
    ],
  });
});

test("Encode ITF odd length input", () => {
  expect(encodeITF("6020034")).toStrictEqual({
    outputString: "06020034",
    outputLength: "8",
    barcodeLinesBits:
      "10101010000111000011101010100001110111010000101011100001110000101110111010000101000011101",
    barcodeText: "06020034",
    messages: [
      {
        level: MessageLevel.Info,
        message: "Input padded, ITF barcodes have input length that is even",
      },
    ],
  });
});
