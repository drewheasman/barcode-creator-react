import { render } from "@testing-library/react";
import { Footer } from "./Footer";
import { MemoryRouter } from "react-router-dom";

describe("Footer", () => {
  it("displays footer content", () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      getByText("© 2024 Create Barcodes. All rights reserved.")
    ).toBeTruthy();
    expect(getByText("Privacy Policy")).toBeTruthy();
  });
});
