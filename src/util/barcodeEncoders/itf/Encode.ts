import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { numericOnlyMessage } from "../../Messages";
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

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = itfLines(data);

  return returnData;
}
