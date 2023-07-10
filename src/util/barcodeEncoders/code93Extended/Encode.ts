import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { getInitialData } from "../../Constants";
import { invalidCharactersMessage } from "../../Messages";
import { invalidInput } from "../InvalidInput";
import { code93ExtendedLines } from "./Lines";

export function encodeCode39(data: string) {
  const returnData: CalculatedBarcodeData = getInitialData();

  if (invalidInput(data, "0-9A-Za-z!\"#$%&'()*+,-./;:<=>?@[]\\^_`{} ~")) {
    returnData.messages = [invalidCharactersMessage];
    return returnData;
  }

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = code93ExtendedLines(data);

  return returnData;
}