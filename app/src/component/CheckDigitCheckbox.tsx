import { CalculateFromCheckDigit } from "../interface/Calculate";

export function CheckDigitCheckbox({
  label,
  className,
  checked,
  onCheckDigitChange,
}: {
  label: string;
  className: string;
  checked: boolean;
  onCheckDigitChange: CalculateFromCheckDigit;
}) {
  const divClass = `${className} label-input-parent`;

  return (
    <div>
      <input
        id={label}
        className=""
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onCheckDigitChange(e.target.checked);
        }}
      />
      <label htmlFor={label} className={divClass}>
        {label}
      </label>
    </div>
  );
}
