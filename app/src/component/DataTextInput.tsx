import { Form } from "react-bootstrap";
import { MessageLevel } from "../enum/MessageLevel";
import { levelColor } from "../util/Messages/LevelColor";

export type InputTextChange = (inputText: string) => void;

export function DataTextInput({
  id,
  inputText,
  level,
  onInputTextChange,
}: {
  id: string;
  inputText: string;
  level: MessageLevel;
  onInputTextChange: InputTextChange;
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
      className={`data-text border-${classColor} focus-${classColor}`}
    />
  );
}
