import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import {
  numericOnlyMessage,
  paddedDataMessage,
  truncatedDataMessage,
} from "../../Messages";
import { invalidNumericInput } from "../InvalidInput";
import { ean8Lines } from "./Lines";
import { BarcodeType } from "../../../enum/BarcodeType";
import { getInitialData } from "../../Constants";
import { calculateEanCheckDigit } from "../../checkDigit/Ean";

export function encodeEan8(data: string) {
  const allowedDataLength = 7;
  const returnData: CalculatedBarcodeData = getInitialData();

  if (invalidNumericInput(data)) {
    returnData.messages.push(numericOnlyMessage(BarcodeType.EAN8));
    return returnData;
  }

  if (data.length < allowedDataLength) {
    returnData.messages.push(
      paddedDataMessage(BarcodeType.EAN8, allowedDataLength)
    );
    data = data.padStart(allowedDataLength, "0");
  }

  if (data.length > allowedDataLength) {
    returnData.messages.push(
      truncatedDataMessage(BarcodeType.EAN8, allowedDataLength)
    );
    data = data.substring(0, allowedDataLength);
  }

  data += calculateEanCheckDigit(data).checkDigit;

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = ean8Lines(data);

  return returnData;
}
