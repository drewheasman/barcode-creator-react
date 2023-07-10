import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { numericOnlyMessage } from "../../Messages";
import { invalidNumericInput } from "../InvalidInput";
import { ean13Lines } from "./Lines";
import { BarcodeType } from "../../../enum/BarcodeType";
import { getInitialData } from "../../Constants";

export function encodeCode39(data: string) {
  const returnData: CalculatedBarcodeData = getInitialData();

  if (invalidNumericInput(data)) {
    returnData.messages = [numericOnlyMessage(BarcodeType.EAN13)];
    return returnData;
  }

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = ean13Lines(data);

  return returnData;
}
