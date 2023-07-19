import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { numericOnlyMessage } from "../../Messages";
import { invalidNumericInput } from "../InvalidInput";
import { ean8Lines } from "./Lines";
import { BarcodeType } from "../../../enum/BarcodeType";
import { getInitialData } from "../../Constants";

export function encodeEan8(data: string) {
  const returnData: CalculatedBarcodeData = getInitialData();

  if (invalidNumericInput(data)) {
    returnData.messages.push(numericOnlyMessage(BarcodeType.EAN8));
    return returnData;
  }

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = ean8Lines(data);

  return returnData;
}
