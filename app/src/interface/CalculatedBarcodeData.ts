import { Message, MessageLevel } from "./Message";

export interface CalculatedBarcodeData {
  outputString: string;
  outputLength: string;
  barcodeLinesBits: string;
  barcodeText: string;
  messages: Message[];
  inputLevel: MessageLevel;
  luhnLevel: MessageLevel;
  upcaLevel: MessageLevel;
}
