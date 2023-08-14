import { render } from "@testing-library/react";
import { PrivacyPolicy } from "./PrivacyPolicy";

describe("Privacy Policy", () => {
  it("Displays the Privacy Policy content", () => {
    const { getByText } = render(<PrivacyPolicy />);
    expect(getByText("Privacy Policy")).toBeTruthy();
  });
});
