import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { getInitialData } from "../../Constants";
import { invalidCharactersMessage } from "../../Messages";
import { invalidInput } from "../InvalidInput";
import { code93ExtendedCharacters } from "./Characters";
import { code93ExtendedLines } from "./Lines";

export function encodeCode93Extended(data: string) {
  const returnData: CalculatedBarcodeData = getInitialData();

  if (
    invalidInput(data, "0-9A-Za-z!\"#$%&'()*+,-./;:<=>?@\\[\\]\\\\^_`{|} ~")
  ) {
    returnData.messages.push(invalidCharactersMessage);
    return returnData;
  }

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = code93ExtendedLines(
    code93ExtendedCharacters(data)
  );

  return returnData;
}
