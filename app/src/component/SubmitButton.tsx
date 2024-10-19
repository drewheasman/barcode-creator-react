import { Button } from "react-bootstrap";
import { MessageLevel } from "../enum/MessageLevel";
import { levelColor } from "../util/Messages/LevelColor";

export type OnSubmitClick = () => void;

export function SubmitButton({
  label,
  level,
  onSubmit,
}: {
  label: string;
  level: MessageLevel;
  onSubmit: OnSubmitClick;
}) {
  const classColor = levelColor(level);

  return (
    <>
      <Button
        className={`btn-outline-${classColor}${classColor}`}
        onClick={onSubmit}
      >{label}</Button>
    </>
  );
}
