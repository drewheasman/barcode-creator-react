import { CalculatedBarcodeData } from "../../../interface/CalculatedBarcodeData";
import { MessageLevel } from "../../../interface/Message";
import { getInitialData } from "../../Constants";
import { invalidInput } from "../InvalidInput";
import { nw7Lines } from "./Lines";

export function encodeCode39(data: string) {
  const returnData: CalculatedBarcodeData = getInitialData();

  if (invalidInput(data.charAt(0) + data.charAt(data.length - 1), "A-ENT*")) {
    returnData.messages = [
      {
        level: MessageLevel.Error,
        message: "Start and stop characters must be A B C D E N T or *",
      },
    ];
    return returnData;
  }

  if (invalidInput(data.substring(1, data.length - 2), "0-9$:/.+-")) {
    returnData.messages = [
      {
        level: MessageLevel.Error,
        message: "Data must be 0-9 $ : / . + or -",
      },
    ];
    return returnData;
  }

  returnData.outputString = data;
  returnData.outputLength = returnData.outputString.length.toString();
  returnData.barcodeText = data;
  returnData.barcodeLinesBits = nw7Lines(data);

  return returnData;
}
