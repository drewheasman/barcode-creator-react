import { dec2bin } from "../Util";

export function byteEncoding(data: string) {
  let encodedString = "";
  for (const element of data) {
    encodedString += dec2bin(element.charCodeAt(0), 8);
  }

  return encodedString;
}
