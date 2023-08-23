import { CalculateFromCheckDigit } from "../interface/Calculate";

export function CheckDigitCheckbox({
  label,
  checked,
  onCheckDigitChange,
}: {
  label: string;
  checked: boolean;
  onCheckDigitChange: CalculateFromCheckDigit;
}) {
  return (
    <>
      <input
        id={label}
        type="checkbox"
        className="btn-check"
        checked={checked}
        onChange={(e) => onCheckDigitChange(e.target.checked)}
      />
      <label className="btn btn-outline-success" htmlFor={label}>
        {label}
      </label>
    </>
  );
}
