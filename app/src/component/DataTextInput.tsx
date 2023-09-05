import { Form } from "react-bootstrap";
import { MessageLevel } from "../enum/MessageLevel";
import { levelColor } from "../util/Messages/LevelColor";

export function DataTextInput({
  id,
  inputText,
  level,
  onInputTextChange,
}: {
  id: string;
  inputText: string;
  level: MessageLevel;
  onInputTextChange: (inputText: string) => void;
}) {
  let classColor = levelColor(level);

  return (
    <Form.Control
      autoFocus
      id={id}
      type="text"
      placeholder="Input barcode data"
      value={inputText}
      onChange={(e) => {
        onInputTextChange(e.target.value);
      }}
      className={`border-${classColor} focus-${classColor}`}
    />
  );
}
