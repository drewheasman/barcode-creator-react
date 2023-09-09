import { RefObject, useEffect } from "react";

const barcodeWidth = 2;
const barcodeHeight = 100;
const textHeight = 20;
const xPadding = 20;
const yPadding = 10;
export const barcodeCanvasHeight = barcodeHeight + textHeight + yPadding * 2;

export function BarcodeImage({
  barcodeLinesBits,
  barcodeText,
  canvasRef,
}: {
  barcodeLinesBits: string;
  barcodeText: string;
  canvasRef: RefObject<HTMLCanvasElement>;
}) {
  const canvasWidth = (barcodeLinesBits.length + xPadding) * barcodeWidth;

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context != null) {
      if (barcodeLinesBits === "" && barcodeText === "") {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        return;
      }
      context.canvas.width = canvasWidth;
      context.canvas.height = barcodeCanvasHeight;
      context.fillStyle = "#FFF";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      for (let i = 0; i < barcodeLinesBits.length; i++) {
        if (barcodeLinesBits.charAt(i) === "1") {
          if (context != null) {
            context.strokeStyle = "#000";
            context.lineWidth = barcodeWidth;
            context.imageSmoothingEnabled = false;
            context.beginPath();
            context.moveTo(i * barcodeWidth + xPadding, yPadding);
            context.lineTo(
              i * barcodeWidth + xPadding,
              barcodeHeight + yPadding
            );
            context.stroke();
          }
        }
      }

      context.lineWidth = 1;
      context.textAlign = "center";
      context.font = `${textHeight}px "Courier New", Courier, monospace`;
      context.fillStyle = "#000";
      context.fillText(
        barcodeText,
        canvasWidth * 0.5,
        barcodeHeight + textHeight + yPadding
      );
    }
  });

  return (
    <canvas
      data-testid="barcode-canvas"
      ref={canvasRef}
      style={{ maxWidth: "100%", height: barcodeCanvasHeight }}
    />
  );
}
