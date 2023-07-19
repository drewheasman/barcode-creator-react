import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import {
  numericOnlyMessage,
  paddedDataMessage,
  truncatedDataMessage,
} from "../../Messages";
import { invalidNumericInput } from "../InvalidInput";
import { ean13Lines } from "./Lines";
import { BarcodeType } from "../../../enum/BarcodeType";
import { getInitialData } from "../../Constants";
import { calculateEanCheckDigit } from "../../checkDigit/Ean";

export function encodeEan13(data: string) {
  const allowedDataLength = 12;
  const returnData: CalculatedBarcodeData = getInitialData();

  if (invalidNumericInput(data)) {
    returnData.messages.push(numericOnlyMessage(BarcodeType.EAN13));
    return returnData;
  }

  if (data.length < allowedDataLength) {
    returnData.messages.push(
      paddedDataMessage(BarcodeType.EAN13, allowedDataLength)
    );
    data = data.padStart(allowedDataLength, "0");
  }

  if (data.length > allowedDataLength) {
    returnData.messages.push(
      truncatedDataMessage(BarcodeType.EAN13, allowedDataLength)
    );
    data = data.substring(0, allowedDataLength);
  }

  data += calculateEanCheckDigit(data).checkDigit;

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = ean13Lines(data);

  return returnData;
}
