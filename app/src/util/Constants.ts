import { MessageLevel } from "../enum/MessageLevel";
import { CalculatedBarcodeData } from "../interface/CalculatedBarcodeData";

export function getInitialData(): CalculatedBarcodeData {
  return {
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [],
    inputLevel: MessageLevel.Info,
    luhnLevel: MessageLevel.Info,
    upcaLevel: MessageLevel.Info,
  };
}
