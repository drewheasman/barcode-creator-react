import { CalculatedBarcodeData } from "../interface/CalculatedBarcodeData";
import { Message } from "../interface/Message";
import { calculateFailMessage, cannotProcessTypeMessage } from "./Messages";
import { encodeCode128 } from "./barcodeEncoders/code128/Encode";
import { encodeCode39 } from "./barcodeEncoders/code39/Encode";
import { encodeCode93Extended } from "./barcodeEncoders/code93Extended/Encode";
import { calculateEanCheckDigit } from "./checkDigit/Ean";
import { calculateLuhn } from "./checkDigit/Luhn";
import { BarcodeType } from "../enum/BarcodeType";
import { getInitialData } from "./Constants";
import { encodeEan13 } from "./barcodeEncoders/ean13/Encode";
import { encodeEan8 } from "./barcodeEncoders/ean8/Encode";
import { encodeITF } from "./barcodeEncoders/itf/Encode";

export function calculateBarcodeData(
  data: string,
  luhn: boolean,
  ucpa: boolean,
  type: BarcodeType
): CalculatedBarcodeData {
  let returnData = getInitialData();

  if (data === "") {
    return returnData;
  }

  let checkDigitMessages: Message[] = [];
  if (luhn) {
    const luhnCheck = calculateLuhn(data);
    data += luhnCheck.checkDigit;
    if (luhnCheck.message) {
      checkDigitMessages.push(luhnCheck.message);
    }
  }
  if (ucpa) {
    const upcaCheck = calculateEanCheckDigit(data);
    data += upcaCheck.checkDigit;
    if (upcaCheck.message) {
      checkDigitMessages.push(upcaCheck.message);
    }
  }

  try {
    switch (type) {
      case BarcodeType.Code128:
        returnData = encodeCode128(data);
        break;
      case BarcodeType.Code39:
        returnData = encodeCode39(data);
        break;
      case BarcodeType.Code93Extended:
        returnData = encodeCode93Extended(data);
        break;
      case BarcodeType.EAN13:
        returnData = encodeEan13(data);
        break;
      case BarcodeType.EAN8:
        returnData = encodeEan8(data);
        break;
      case BarcodeType.ITF:
        returnData = encodeITF(data);
        break;
      case BarcodeType.NW7:
      default:
        returnData.messages.push(cannotProcessTypeMessage);
    }
  } catch (Exception) {
    returnData.messages.push(calculateFailMessage);
  }

  returnData.messages.push(...checkDigitMessages);

  return returnData;
}