import { MessageLevel } from "../../../enum/MessageLevel";
import { encodeCode93Extended } from "./Encode";

test("Code 93 extended encode success", () => {
  expect(encodeCode93Extended("Code 93 Extended")).toStrictEqual({
    outputString: "Code 93 Extended",
    outputLength: "16",
    barcodeLinesBits:
      "101010111101101000101001100101001011001001100101100101001001100101100100101110100101000010101010000101110100101100100101001100101011001101001100101101001101001100101100100101001100101010001101001100101100101001001100101100100101001100101100101001101100101100101001010111101",
    barcodeText: "Code 93 Extended",
    messages: [],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
  expect(encodeCode93Extended("!\"#&'()*+,:;<=>?@[\\]abc{|} ~")).toStrictEqual({
    outputString: "!\"#&'()*+,:;<=>?@[\\]abc{|} ~",
    outputLength: "28",
    barcodeLinesBits:
      "101010111101110101101101010001110101101101001001110101101101000101110101101100010101110101101011010001110101101011001001110101101011000101110101101001101001011101101110101101010110001110101101001110101110110101100010101110110101011010001110110101011001001110110101011000101110110101001101001110110101100110101110110101000110101110110101010110001110110101010011001001100101101010001001100101101001001001100101101000101110110101000101101110110101101101001110110101101100101110100101110110101101011001100010101000100101010111101",
    barcodeText: "!\"#&'()*+,:;<=>?@[\\]abc{|} ~",
    messages: [],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  });
});

test("Code 93 extended encode invalid characters", () => {
  expect(encodeCode93Extended("Code 93 Extended¬")).toStrictEqual({
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
