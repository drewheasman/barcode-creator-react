import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { numericOnlyMessage, paddedEvenDataMessage } from "../../Messages";
import { invalidNumericInput } from "../InvalidInput";
import { itfLines } from "./Lines";
import { BarcodeType } from "../../../enum/BarcodeType";
import { getInitialData } from "../../Constants";

export function encodeITF(data: string) {
  const returnData: CalculatedBarcodeData = getInitialData();

  if (invalidNumericInput(data)) {
    returnData.messages.push(numericOnlyMessage(BarcodeType.ITF));
    return returnData;
  }

  if (data.length % 2 != 0) {
    data = "0" + data;
    returnData.messages.push(paddedEvenDataMessage(BarcodeType.ITF));
  }

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = itfLines(data);

  return returnData;
}
