import { MessageLevel } from "../enum/MessageLevel";
import { levelColor } from "../util/Messages/LevelColor";

export type CheckboxChange = (checkboxChecked: boolean) => void;

export function Checkbox({
  label,
  checked,
  level,
  onCheckboxChange: onCheckboxChange,
}: {
  label: string;
  checked: boolean;
  level: MessageLevel;
  onCheckboxChange: CheckboxChange;
}) {
  const classColor = levelColor(level);

  return (
    <>
      <input
        id={label}
        type="checkbox"
        className="btn-check"
        checked={checked}
        onChange={(e) => onCheckboxChange(e.target.checked)}
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
