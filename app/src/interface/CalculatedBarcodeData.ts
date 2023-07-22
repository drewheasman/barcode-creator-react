import { Message } from "./Message";

export interface CalculatedBarcodeData {
  outputString: string;
  outputLength: string;
  barcodeLinesBits: string;
  barcodeText: string;
  messages: Message[];
}
