import { CalculatedBarcodeData } from "../interface/CalculatedBarcodeData";

export function getInitialData(): CalculatedBarcodeData {
  return {
    outputString: "Barcode output data",
    outputLength: "0",
    barcodeLinesBits: "",
    barcodeText: "",
    messages: [],
  };
}
