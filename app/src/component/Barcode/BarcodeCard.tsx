import { useRef, useState } from "react";
import { BarcodeImage, barcodeCanvasHeight } from "./BarcodeImage";
import { BarcodeButtons } from "./BarcodeButtons";
import { Card } from "react-bootstrap";

export function BarcodeCard({
  barcodeLinesBits,
  barcodeText,
}: {
  barcodeLinesBits: string;
  barcodeText: string;
}) {
  const [canvasRef] = useState(useRef<HTMLCanvasElement>(null));

  return (
    <Card className="bg-dark">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center px-3 py-3">
        {barcodeLinesBits.length == 0 ? (
          <Card.Text
            className="d-flex align-items-center text-white-50 text-center"
            style={{
              height: barcodeCanvasHeight,
            }}
          >
            Waiting for input
          </Card.Text>
        ) : (
          <BarcodeImage
            barcodeLinesBits={barcodeLinesBits}
            barcodeText={barcodeText}
            canvasRef={canvasRef}
          />
        )}
      </Card.Body>
      <Card.Footer className="card-footer">
        <BarcodeButtons canvasRef={canvasRef} barcodeText={barcodeText} />
      </Card.Footer>
    </Card>
  );
}
