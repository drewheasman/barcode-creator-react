import { render, fireEvent } from "@testing-library/react";
import { CheckDigitCheckbox } from "./CheckDigitCheckbox";

describe("CheckDigitCheckbox", () => {
  const mockOnCheckDigitChange = jest.fn();

  afterEach(() => {
    mockOnCheckDigitChange.mockClear();
  });

  it("renders correctly with label and checked=false", () => {
    const { getByLabelText } = render(
      <CheckDigitCheckbox
        label="Test Checkbox"
        checked={false}
        onCheckDigitChange={mockOnCheckDigitChange}
      />
    );

    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("renders correctly with label and checked=true", () => {
    const { getByLabelText } = render(
      <CheckDigitCheckbox
        label="Test Checkbox"
        checked={true}
        onCheckDigitChange={mockOnCheckDigitChange}
      />
    );

    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("calls onCheckDigitChange when checkbox is clicked", () => {
    const { getByLabelText } = render(
      <CheckDigitCheckbox
        label="Test Checkbox"
        checked={false}
        onCheckDigitChange={mockOnCheckDigitChange}
      />
    );

    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockOnCheckDigitChange).toHaveBeenCalledWith(true);
  });

  it("calls onCheckDigitChange with false when checkbox is clicked while checked", () => {
    const { getByLabelText } = render(
      <CheckDigitCheckbox
        label="Test Checkbox"
        checked={true}
        onCheckDigitChange={mockOnCheckDigitChange}
      />
    );

    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockOnCheckDigitChange).toHaveBeenCalledWith(false);
  });
});
