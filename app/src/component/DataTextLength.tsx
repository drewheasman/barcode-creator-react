import { InputGroup } from "react-bootstrap";

export function OutputLengthField({ length }: { length: string }) {
  return (
    <InputGroup.Text
      id="data-output-length"
      className="data-text text-white-50 disabled"
    >
      {length}
    </InputGroup.Text>
  );
}
