import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders header and footer", () => {
    const { getByText } = render(<App />);
    expect(getByText("Create Barcodes")).toBeTruthy();
    expect(getByText("Privacy Policy")).toBeTruthy();
  });

  it("renders BarcodeCalculator by default", () => {
    const { getByText } = render(<App />);
    expect(getByText("Code 128")).toBeTruthy();
  });

  it("renders PrivacyPolicy when navigating to privacy-policy route", () => {
    const { getByText } = render(<App />);
    userEvent.click(getByText("Privacy Policy"));
    expect(getByText("Privacy Policy")).toBeTruthy();
  });
});
