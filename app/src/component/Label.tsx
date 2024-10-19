import { MessageLevel } from "../enum/MessageLevel";
import { levelColor } from "../util/Messages/LevelColor";

export function Label({
  label,
  level,
}: {
  label: string;
  level: MessageLevel;
}) {
  const classColor = levelColor(level);

  return (
    <>
      <label
        className={`input-group-text col-sm-2 focus-${classColor}`}
      >{label}</label>
    </>
  );
}
