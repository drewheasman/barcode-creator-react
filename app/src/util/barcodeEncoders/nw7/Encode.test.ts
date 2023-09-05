import { MessageLevel } from "../../../enum/MessageLevel";
import { encodeNW7 } from "./Encode";

test("Encode NW7 success", () => {
  expect(encodeNW7("*123+-/:$.*")).toStrictEqual({
    outputString: "*123+-/:$.*",
    outputLength: "11",
    barcodeLinesBits:
      "10100100110101011001010100101101100101010101101101101010011010110110101101101011011010110010101101101101010100100110",
    barcodeText: "123+-/:$.",
    messages: [],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
});

test("Encode NW7 invalid start", () => {
  expect(encodeNW7("123+-/:$.*")).toStrictEqual({
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [
      {
        level: MessageLevel.Error,
        message:
          "NW-7 / Codabar first character and last character must be A B C D E N T or *",
      },
    ],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
});

test("Encode NW7 invalid stop", () => {
  expect(encodeNW7("*123+-/:$.")).toStrictEqual({
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [
      {
        level: MessageLevel.Error,
        message:
          "NW-7 / Codabar first character and last character must be A B C D E N T or *",
      },
    ],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
});

test("Encode NW7 invalid data", () => {
  expect(encodeNW7("*123+-/:$.¬*")).toStrictEqual({
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [
      {
        level: MessageLevel.Error,
        message: "NW-7 / Codabar data must be 0 - 9 $ : / . + or -",
      },
    ],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
});

test("Encode NW7 data too short", () => {
  expect(encodeNW7("**")).toStrictEqual({
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [
      {
        level: MessageLevel.Error,
        message: "NW-7 / Codabar barcodes have min input length 3",
      },
    ],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
});
