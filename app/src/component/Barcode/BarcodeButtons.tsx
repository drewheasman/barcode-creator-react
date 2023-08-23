import { RefObject, useMemo, useState } from "react";
import { Button } from "react-bootstrap";

export function BarcodeButtons({
  canvasRef,
  barcodeText,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  barcodeText: string;
}) {
  const [copyEnabled, setCopyEnabled] = useState(false);
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const [recentCopy, setRecentCopy] = useState(false);
  const [recentDownload, setRecentDownload] = useState(false);

  useMemo(() => {
    setCopyEnabled(barcodeText.length > 0);
    setDownloadEnabled(barcodeText.length > 0);
  }, [barcodeText]);

  return (
    <div className="input-group outline-success justify-content-end">
      <Button
        id="copy-barcode"
        aria-label="Copy barcode"
        onClick={() => {
          copyCanvas(canvasRef);
          setRecentCopy(true);
          setCopyEnabled(false);
          setTimeout(() => {
            setRecentCopy(false);
            setCopyEnabled(true);
          }, 500);
        }}
        disabled={!copyEnabled}
        variant="outline-success"
      >
        <i
          className={
            recentCopy ? "bi bi-clipboard-check-fill" : "bi bi-clipboard"
          }
        />
        {recentCopy ? " Copied " : " Copy "}
      </Button>
      <Button
        id="download-barcode"
        aria-label="Download barcode"
        onClick={() => {
          downloadCanvas(canvasRef, barcodeText);
          setRecentDownload(true);
          setDownloadEnabled(false);
          setTimeout(() => {
            setRecentDownload(false);
            setDownloadEnabled(true);
          }, 500);
        }}
        disabled={!downloadEnabled}
        variant="outline-success"
      >
        <i
          className={
            recentDownload
              ? "bi bi-file-arrow-down-fill"
              : "bi bi-file-arrow-down"
          }
        />
        {" Download "}
      </Button>
    </div>
  );
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
