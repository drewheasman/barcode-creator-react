import { BarcodeType } from "../../../enum/BarcodeType";
import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { MessageLevel } from "../../../interface/Message";
import { getInitialData } from "../../Constants";
import {
  invalidDataCharactersMessage,
  invalidStartStopCharactersMessage,
} from "../../Messages";
import { invalidInput } from "../InvalidInput";
import { nw7Lines } from "./Lines";

export function encodeNW7(data: string) {
  const returnData: CalculatedBarcodeData = getInitialData();

  if (invalidInput(data.charAt(0) + data.charAt(data.length - 1), "A-ENT*")) {
    returnData.messages.push(
      invalidStartStopCharactersMessage(BarcodeType.NW7, "ABCDENT*")
    );
    return returnData;
  }

  if (invalidInput(data.substring(1, data.length - 1), "0-9$:/.+-")) {
    returnData.messages.push(
      invalidDataCharactersMessage(BarcodeType.NW7, "0-9$:/.+-")
    );
    return returnData;
  }

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data.substring(1, data.length - 1);
  returnData.barcodeLinesBits = nw7Lines(data);

  return returnData;
}
