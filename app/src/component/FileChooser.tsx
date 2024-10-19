import { FormControl } from "react-bootstrap";
import { levelColor } from "../util/Messages/LevelColor";
import { MessageLevel } from "../enum/MessageLevel";

export type OnBulkFilenameChange = (e: any) => any;

export function FileChooser({
  level,
  onChange,
}: {
  level: MessageLevel
  onChange: OnBulkFilenameChange
}) {
  const classColor = levelColor(level)

  return (
    <div>
      <FormControl
        type="file"
        className={`focus-${classColor}`}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}
