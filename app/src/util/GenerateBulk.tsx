import ReactDOM from "react-dom/client";
import { BarcodeImage } from "../component/Barcode/BarcodeImage";
import { BarcodeType } from "../enum/BarcodeType";
import { MessageLevel } from "../enum/MessageLevel";
import { calculateBarcodeData } from "./Calculate";
import React from "react";
import { CalculatedBarcodeData } from "../interface/CalculatedBarcodeData";
import JSZip from "jszip";

export async function generateBulk(fileContent: string) {
  const inputs = fileContent.split(/,|\n/);
  const zip = new JSZip();
  const date = new Date().toISOString();
  const zipFilename = `barcodes-${date}.zip`;

  for (let input of inputs) {

    if (input == "") {
      continue;
    }

    if (input.charAt(0) == '"' && input.charAt(input.length - 1) == '"') {
      input = input.substring(1, input.length - 1);
    }

    const calcResult = calculateBarcodeData(input, false, false, BarcodeType.Code128);

    if (calcResult.inputLevel == MessageLevel.Error) {
      console.log("problem with this barcode", `"${input}"`, `"${calcResult}"`);
      continue;
    }

    const imageData = await renderBarcodeOffScreen(calcResult);
    const imageBase64 = imageData.split(',')[1];

    zip.file(`${calcResult.barcodeText}.png`, imageBase64, { base64: true });
  }

  zip.generateAsync({ type: 'blob' }).then(content => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = zipFilename;
    document.body.appendChild(link).click();
    document.body.removeChild(link);
  });
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
