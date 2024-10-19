import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import { MessageLevel } from "../enum/MessageLevel";

describe("Checkbox", () => {
  const mockOnCheckDigitChange = jest.fn();

  afterEach(() => {
    mockOnCheckDigitChange.mockClear();
  });

  it("renders correctly with label and checked=false", () => {
    const { getByLabelText } = render(
      <Checkbox
        label="Test Checkbox"
        checked={false}
        level={MessageLevel.Error}
        onCheckboxChange={mockOnCheckDigitChange}
      />
    );

    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("renders correctly with label and checked=true", () => {
    const { getByLabelText } = render(
      <Checkbox
        label="Test Checkbox"
        checked={true}
        level={MessageLevel.Info}
        onCheckboxChange={mockOnCheckDigitChange}
      />
    );

    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("calls onCheckDigitChange when checkbox is clicked", () => {
    const { getByLabelText } = render(
      <Checkbox
        label="Test Checkbox"
        checked={false}
        level={MessageLevel.Warn}
        onCheckboxChange={mockOnCheckDigitChange}
      />
    );

    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockOnCheckDigitChange).toHaveBeenCalledWith(true);
  });

  it("calls onCheckDigitChange with false when checkbox is clicked while checked", () => {
    const { getByLabelText } = render(
      <Checkbox
        label="Test Checkbox"
        checked={true}
        level={MessageLevel.Error}
        onCheckboxChange={mockOnCheckDigitChange}
      />
    );

    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockOnCheckDigitChange).toHaveBeenCalledWith(false);
  });
});
