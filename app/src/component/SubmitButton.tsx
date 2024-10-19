import { Button } from "react-bootstrap";
import { MessageLevel } from "../enum/MessageLevel";
import { levelColor } from "../util/Messages/LevelColor";

export type OnSubmitClick = () => void;

export function SubmitButton({
  label,
  level,
  onSubmit,
  disabled,
}: {
  label: string;
  level: MessageLevel;
  onSubmit: OnSubmitClick;
  disabled: boolean;
}) {
  const classColor = levelColor(level);

  return (
    <>
      <Button
        className={`btn-outline-${classColor}${classColor} ${disabled ? "disabled" : ""}`}
        onClick={onSubmit}
      >{label}</Button>
    </>
  );
}
