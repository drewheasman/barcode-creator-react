export function DataTextInput({
  id,
  className,
  inputText,
  onInputTextChange,
}: {
  id: string;
  className: string;
  inputText: string;
  onInputTextChange: (inputText: string) => void;
}) {
  return (
    <input
      id={id}
      className={className}
      type="text"
      placeholder="Type barcode data"
      value={inputText}
      onChange={(e) => {
        onInputTextChange(e.target.value);
      }}
    />
  );
}
