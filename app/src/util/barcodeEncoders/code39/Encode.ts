import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { getInitialData } from "../../Constants";
import { invalidCharactersMessage } from "../../Messages";
import { invalidInput } from "../InvalidInput";
import { code39Lines } from "./Lines";

export function encodeCode39(data: string) {
  const returnData: CalculatedBarcodeData = getInitialData();

  data = data.toUpperCase();

  if (invalidInput(data, "0-9A-Z-.$/+% ")) {
    returnData.messages.push(invalidCharactersMessage);
    return returnData;
  }

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = code39Lines(data);

  return returnData;
}
