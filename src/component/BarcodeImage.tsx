import { RefObject, useEffect, useRef, useState } from "react";

export function BarcodeImage({
  barcodeLinesBits,
  barcodeText,
}: {
  barcodeLinesBits: string;
  barcodeText: string;
}) {
  const [canvasRef] = useState(useRef<HTMLCanvasElement>(null));
  const [showButtons, setShowButtons] = useState(false);

  const mouseEnterHandler = () => {
    if (barcodeLinesBits.length > 0) setShowButtons(true);
  };
  const mouseLeaveHandler = () => {
    setShowButtons(false);
  };

  const divClass = `barcode-canvas${
    barcodeLinesBits ? "" : " barcode-canvas-invisible"
  }`;

  const hiddenButtonClass = `hidden-button${
    showButtons ? "" : " hidden-button-invisible"
  }`;

  return (
    <div
      className={divClass}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div id="hidden-buttons" className="hidden-buttons">
        <button
          id="copy-button"
          aria-label="copy-button"
          className={hiddenButtonClass}
        >
          <span
            id="copy"
            className="material-icons-outlined icon-button"
            onClick={() => {
              copyCanvas(canvasRef);
            }}
          >
            content_copy
          </span>
        </button>
        <button
          id="download-button"
          aria-label="download-button"
          className={hiddenButtonClass}
        >
          <span
            id="download"
            className="material-icons-outlined icon-button"
            onClick={() => {
              downloadCanvas(canvasRef, barcodeText);
            }}
          >
            file_download
          </span>
        </button>
      </div>
      {DrawBarcode(canvasRef, barcodeLinesBits, barcodeText)}
    </div>
  );
}

function DrawBarcode(
  canvasRef: RefObject<HTMLCanvasElement>,
  linesBits: string,
  text: string
) {
  const barcodeWidth = 2;
  const barcodeHeight = 100;
  const textHeight = 20;
  const padding = 10;
  const canvasWidth = (linesBits.length + padding) * barcodeWidth;
  const canvasHeight = barcodeHeight + textHeight + padding * 2;

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context != null) {
      if (linesBits === "" && text === "") {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        return;
      }
      context.canvas.width = canvasWidth;
      context.canvas.height = canvasHeight;
      context.fillStyle = "#FFF";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      for (let i = 0; i < linesBits.length; i++) {
        if (linesBits.charAt(i) === "1") {
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
        text,
        canvasWidth * 0.5,
        barcodeHeight + textHeight + padding
      );
    }
  });

  return <canvas className="action" ref={canvasRef} />;
}

function copyCanvas(canvasRef: RefObject<HTMLCanvasElement>) {
  if (canvasRef.current) {
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
      }
    });
  }
}

function downloadCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  filename: string
) {
  if (canvasRef.current) {
    const image = canvasRef.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const a = document.createElement("a");
    a.href = image;
    a.download = `${filename}.png`;
    a.click();
  }
}
