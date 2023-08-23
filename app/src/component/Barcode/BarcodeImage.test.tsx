import { render, screen } from "@testing-library/react";
import { BarcodeImage } from "./BarcodeImage";

describe("BarcodeImage", () => {
  const mockCanvasRef = { current: document.createElement("canvas") };

  it("renders correctly with empty barcodeLinesBits and barcodeText", () => {
    render(
      <BarcodeImage
        barcodeLinesBits=""
        barcodeText=""
        canvasRef={mockCanvasRef}
      />
    );

    expect(screen.getByTestId("barcode-canvas")).toBeDefined();
  });

  it("renders barcode lines and text correctly", () => {
    const barcodeLinesBits = "111100001111";
    const barcodeText = "123456";

    render(
      <BarcodeImage
        barcodeLinesBits={barcodeLinesBits}
        barcodeText={barcodeText}
        canvasRef={mockCanvasRef}
      />
    );

    const canvas = screen.getByTestId("barcode-canvas");
    expect(canvas).toBeDefined();
  });
});
