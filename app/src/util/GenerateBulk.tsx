import ReactDOM from "react-dom/client";
import { BarcodeImage } from "../component/Barcode/BarcodeImage";
import { BarcodeType } from "../enum/BarcodeType";
import { MessageLevel } from "../enum/MessageLevel";
import { calculateBarcodeData } from "./Calculate";
import React from "react";
import { CalculatedBarcodeData } from "../interface/CalculatedBarcodeData";
import JSZip from "jszip";
import { Message } from "../interface/Message";

export async function generateBulk(
  fileContent: string,
  symbology: BarcodeType,
  luhn: boolean,
  ucpa: boolean,
) {
  const inputs = fileContent.split(/,|\n/);
  const zip = new JSZip();
  const date = new Date().toISOString().substring(0, 19);
  const zipFilename = `barcodes-${date}.zip`;
  let zipFileCount = 0;
  const messages: Message[] = [];

  for (let input of inputs) {

    if (input == "") {
      continue;
    }

    if (input.charAt(0) == '"' && input.charAt(input.length - 1) == '"') {
      input = input.substring(1, input.length - 1);
    }

    const calcResult = calculateBarcodeData(input, luhn, ucpa, symbology);

    if (calcResult.inputLevel == MessageLevel.Error) {
      messages.push(
        {
          level: MessageLevel.Warn,
          message: `problem with input "${input}"`
        });
      messages.push(...calcResult.messages);
      continue;
    }

    const imageData = await renderBarcodeOffScreen(calcResult);
    if (!imageData) {
      messages.push(
        {
          level: MessageLevel.Error,
          message: `problem rendering input "${input}", "${calcResult}"`
        });
      continue;
    }
    const imageBase64 = imageData.split(',')[1];

    zip.file(`${calcResult.barcodeText}.png`, imageBase64, { base64: true });
    zipFileCount++;
  }

  if (zipFileCount == 0) {
    return messages;
  }

  zip.generateAsync({ type: 'blob' }).then(content => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = zipFilename;
    document.body.appendChild(link).click();
    document.body.removeChild(link);
  });

  return messages;
}

function renderBarcodeOffScreen(data: CalculatedBarcodeData) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  const canvasRef = React.createRef<HTMLCanvasElement>();

  return new Promise<string>((resolve) => {
    root.render(
      <BarcodeImage
        barcodeLinesBits={data.barcodeLinesBits}
        barcodeText={data.barcodeText}
        canvasRef={canvasRef}
        hidden={true}
      />);

    setTimeout(() => {
      if (canvasRef.current) {
        resolve(canvasRef.current.toDataURL("image/png"));
      }

      root.unmount();
      document.body.removeChild(container);
    }, 100);
  });
}
