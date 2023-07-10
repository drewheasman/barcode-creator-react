import { BarcodeType } from "../enum/BarcodeType";

export type CalculateFromBarcodeType = (barcodeType: BarcodeType) => void;

export type CalculateFromCheckDigit = (checkDigitChecked: boolean) => void;

export type CalculateFromInputText = (inputText: string) => void;
