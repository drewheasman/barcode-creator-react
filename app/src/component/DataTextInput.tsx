import { Form } from "react-bootstrap";

export function DataTextInput({
  id,
  inputText,
  onInputTextChange,
}: {
  id: string;
  inputText: string;
  onInputTextChange: (inputText: string) => void;
}) {
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
      className="border-success"
    />
  );
}
