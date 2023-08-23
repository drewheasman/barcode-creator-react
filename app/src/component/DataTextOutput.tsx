import { InputGroup } from "react-bootstrap";

export function DataTextOutput({
  id,
  outputText,
}: {
  id: string;
  outputText: string;
}) {
  return (
    <InputGroup.Text id={id} className="form-control text-white-50">
      {outputText}
    </InputGroup.Text>
  );
}
