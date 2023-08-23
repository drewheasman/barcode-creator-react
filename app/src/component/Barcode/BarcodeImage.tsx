import { RefObject, useEffect, useRef, useState } from "react";

const barcodeWidth = 2;
const barcodeHeight = 100;
const textHeight = 20;
const padding = 10;
export const barcodeCanvasHeight = barcodeHeight + textHeight + padding * 2;

export function BarcodeImage({
  barcodeLinesBits,
  barcodeText,
  canvasRef,
}: {
  barcodeLinesBits: string;
  barcodeText: string;
  canvasRef: RefObject<HTMLCanvasElement>;
}) {
  const canvasWidth = (barcodeLinesBits.length + padding) * barcodeWidth;

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
            context.moveTo(i * barcodeWidth + padding, padding);
            context.lineTo(i * barcodeWidth + padding, barcodeHeight + padding);
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
        barcodeHeight + textHeight + padding
      );
    }
  });

  return (
    <canvas
      ref={canvasRef}
      style={{ maxWidth: "100%", height: barcodeCanvasHeight }}
    />
  );
}
