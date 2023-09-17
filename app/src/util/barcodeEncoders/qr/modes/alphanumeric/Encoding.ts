import { dec2bin } from "../Util";
import { alphanumericMap } from "./Characters";

export function alphanumericEncoding(data: string) {
  const chunks = data.match(/.{1,2}/g);

  if (!chunks) {
    return "";
  }

  let encodedString = "";
  for (const c of chunks) {
    if (c.length == 2) {
      encodedString += dec2bin(
        alphanumericMap[c[0]] * 45 + alphanumericMap[c[1]],
        11
      );
    } else {
      encodedString += dec2bin(alphanumericMap[c[0]], 6);
    }
  }

  return encodedString;
}
