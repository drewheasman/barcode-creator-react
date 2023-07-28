export function OutputLengthField({ length }: { length: string }) {
  const inputStyle = { width: `${length.length * 0.5}rem` };

  return (
    <input
      id="data-output-length"
      className="length-input"
      placeholder="0"
      style={inputStyle}
      disabled
      value={length}
    />
  );
}
