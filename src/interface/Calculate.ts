import { BarcodeType } from "../enum/BarcodeType";

export interface CalculateFromBarcodeType {
  (barcodeType: BarcodeType): void;
}

export interface CalculateFromCheckDigit {
  (checkDigitChecked: boolean): void;
}

export interface CalculateFromInputText {
  (inputText: string): void;
}
