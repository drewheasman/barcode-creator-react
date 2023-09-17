import { ErrorCorrectionLevel } from "./ErrorCorrectionLevel";
import { QRMode } from "./Mode";
import { dec2bin } from "./modes/Util";
import { alphanumericEncoding } from "./modes/alphanumeric/Encoding";

export function encodeQR(data: string, level: ErrorCorrectionLevel): string {
  data = "HELLO WORLD";

  const version = 2; // TODO: calculate/lookup
  const moduleSize = 4 * (version - 1) + 21;
  const codewordLength = 16; // TODO: calculate/lookup
  const codewordBits = 16 * 8;

  const characterCountIndicator = dec2bin(
    data.length,
    QRMode.Alphanumeric.verLengthBits1to9
  );
  const encoding = alphanumericEncoding(data);

  let encodedData =
    QRMode.Alphanumeric.indicator + characterCountIndicator + encoding;

  if (encodedData.length > codewordBits) {
    throw new Error("Wrong encoding length"); // TODO: set error properly
  }

  // Add terminator
  if (encodedData.length < codewordBits) {
    encodedData += QRMode.Terminator.indicator;
    if (encodedData.length > codewordBits) {
      // Trim to byte
      encodedData.substring(0, codewordBits);
    } else {
      // Pad to byte
      encodedData += "0".repeat(8 - (encodedData.length % 8));
    }
  }

  const pad1 = "11101100";
  const pad2 = "00010001";
  let nextPad = pad1;
  while (encodedData.length < codewordBits) {
    encodedData += nextPad;
    nextPad = nextPad == pad1 ? pad2 : pad1;
  }

  console.log(encodedData);

  return "";
}
