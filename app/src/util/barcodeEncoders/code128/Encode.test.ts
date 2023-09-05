import { MessageLevel } from "../../../enum/MessageLevel";
import { encodeCode128 } from "./Encode";

test("Encode Code128 success", () => {
  expect(encodeCode128("401234512345")).toStrictEqual({
    outputString: "401234512345",
    outputLength: "12",
    barcodeLinesBits:
      "11010011100110001010001011001110010001011000110111010001110110111010111011000101100010001100011101011",
    barcodeText: "401234512345",
    messages: [],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
});

test("Encode Code128 invalid characters", () => {
  expect(encodeCode128("401234512abc¬")).toStrictEqual({
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [
      {
        level: MessageLevel.Error,
        message: "Invalid characters detected",
      },
    ],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
});
