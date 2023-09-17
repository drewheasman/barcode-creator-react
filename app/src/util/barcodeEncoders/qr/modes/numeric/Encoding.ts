import { dec2bin } from "../Util";

export function numericEncoding(data: string) {
  let chunks = data.match(/.{1,3}/g);

  if (!chunks) {
    return "";
  }

  let encodedString = "";
  for (const c of chunks) {
    const num = parseInt(c);

    if (c.length > 2) {
      encodedString += dec2bin(num, 10);
    } else if (c.length > 1) {
      encodedString += dec2bin(num, 7);
    } else {
      encodedString += dec2bin(num, 4);
    }
  }

  return encodedString;
}
