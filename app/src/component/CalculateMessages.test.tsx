import React from "react";
import { render } from "@testing-library/react";
import { CalculateMessages } from "./CalculateMessages";
import { MessageLevel } from "../interface/Message";

describe("CalculateMessages", () => {
  it("renders no messages correctly", () => {
    const { container } = render(<CalculateMessages messages={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders info messages correctly", () => {
    const messages = [
      { level: MessageLevel.Info, message: "Info message 1" },
      { level: MessageLevel.Info, message: "Info message 2" },
    ];

    const { getAllByRole } = render(<CalculateMessages messages={messages} />);

    const infoAlerts = getAllByRole("alert");
    expect(infoAlerts).toHaveLength(2);
    infoAlerts.forEach((alert) => {
      expect(alert.getAttribute("class")).toContain("alert-info");
    });
  });

  it("renders error messages correctly", () => {
    const messages = [
      { level: MessageLevel.Error, message: "Error message 1" },
      { level: MessageLevel.Error, message: "Error message 2" },
    ];

    const { getAllByRole } = render(<CalculateMessages messages={messages} />);

    const errorAlerts = getAllByRole("alert");
    expect(errorAlerts).toHaveLength(2);
    errorAlerts.forEach((alert) => {
      expect(alert.getAttribute("class")).toContain("alert-danger");
    });
  });

  it("renders warning messages correctly", () => {
    const messages = [
      { level: MessageLevel.Warn, message: "Warning message 1" },
      { level: MessageLevel.Warn, message: "Warning message 2" },
    ];

    const { getAllByRole } = render(<CalculateMessages messages={messages} />);

    const warnAlerts = getAllByRole("alert");
    expect(warnAlerts).toHaveLength(2);
    warnAlerts.forEach((alert) => {
      expect(alert.getAttribute("class")).toContain("alert-warning");
    });
  });

  it("renders default messages correctly", () => {
    const messages = [
      { level: 100, message: "Unknown message 1" },
      { level: 100, message: "Unknown message 2" },
    ];

    const { getAllByRole } = render(<CalculateMessages messages={messages} />);

    const defaultAlerts = getAllByRole("alert");
    expect(defaultAlerts).toHaveLength(2);
    defaultAlerts.forEach((alert) => {
      expect(alert.getAttribute("class")).toContain("alert-dark");
    });
  });
});
