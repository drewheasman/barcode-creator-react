import { dec2bin } from "./modes/Util";

export const QRMode = {
  Numeric: {
    indicator: dec2bin(1, 4),
    verLengthBits1to9: 10,
    verLengthBits10to26: 12,
    verLengthBits27to40: 14,
  },
  Alphanumeric: {
    indicator: dec2bin(2, 4),
    verLengthBits1to9: 9,
    verLengthBits10to26: 11,
    verLengthBits27to40: 13,
  },
  Byte: {
    indicator: dec2bin(4, 4),
    verLengthBits1to9: 8,
    verLengthBits10to26: 16,
    verLengthBits27to40: 16,
  },
  Kanji: {
    indicator: dec2bin(8, 4),
    verLengthBits1to9: 8,
    verLengthBits10to26: 10,
    verLengthBits27to40: 12,
  },
  StructuredAppend: { indicator: dec2bin(3, 4) },
  ECI: { indicator: dec2bin(7, 4) },
  FNC1_1: { indicator: dec2bin(5, 4) },
  FNC1_2: { indicator: dec2bin(9, 4) },
  Terminator: { indicator: dec2bin(0, 4) },
};
