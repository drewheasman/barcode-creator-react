import { CalculatedBarcodeData } from "../interface/CalculatedBarcodeData";

export function getInitialData(): CalculatedBarcodeData {
  return {
    outputString: "",
    outputLength: "",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [],
  };
}
