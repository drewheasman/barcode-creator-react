import { MessageLevel } from "../enum/MessageLevel";
import { CalculateFromCheckDigit } from "../interface/Calculate";
import { levelColor } from "../util/Messages/LevelColor";

export function CheckDigitCheckbox({
  label,
  checked,
  level,
  onCheckDigitChange,
}: {
  label: string;
  checked: boolean;
  level: MessageLevel;
  onCheckDigitChange: CalculateFromCheckDigit;
}) {
  const classColor = levelColor(level);

  return (
    <>
      <input
        id={label}
        type="checkbox"
        className="btn-check"
        checked={checked}
        onChange={(e) => onCheckDigitChange(e.target.checked)}
      />
      <label
        className={`btn btn-outline-${classColor} focus-${classColor}`}
        htmlFor={label}
      >
        {label}
      </label>
    </>
  );
}
