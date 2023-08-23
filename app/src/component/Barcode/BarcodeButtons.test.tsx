import { render, screen } from "@testing-library/react";
import { BarcodeButtons } from "./BarcodeButtons";
import React from "react";

describe("BarcodeButtons", () => {
  test("Copy button should be disabled initially when barcodeText is empty", () => {
    const canvasRef = React.createRef<HTMLCanvasElement>();
    render(<BarcodeButtons canvasRef={canvasRef} barcodeText="" />);

    const copyButton = screen.getByLabelText("Copy barcode");
    expect(copyButton.getAttribute("disabled")).toBeDefined();
  });

  test("Download button should be disabled initially when barcodeText is empty", () => {
    const canvasRef = React.createRef<HTMLCanvasElement>();
    render(<BarcodeButtons canvasRef={canvasRef} barcodeText="" />);

    const downloadButton = screen.getByLabelText("Download barcode");
    expect(downloadButton.getAttribute("disabled")).toBeDefined();
  });

  test("Copy button should be enabled when barcodeText is not empty", () => {
    const canvasRef = { current: null };
    render(<BarcodeButtons canvasRef={canvasRef} barcodeText="12345" />);

    const copyButton = screen.getByLabelText("Copy barcode");
    expect(copyButton.getAttribute("disabled")).toBe(null);
  });

  test("Download button should be enabled when barcodeText is not empty", () => {
    const canvasRef = { current: null };
    render(<BarcodeButtons canvasRef={canvasRef} barcodeText="12345" />);

    const downloadButton = screen.getByLabelText("Download barcode");
    expect(downloadButton.getAttribute("disabled")).toBe(null);
  });
});
