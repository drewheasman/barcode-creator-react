export function OutputLengthField({
  className,
  length,
}: {
  className: string;
  length: string;
}) {
  if (length === "0") {
    length = "";
  }

  const divClass = `${className} label-input-parent`;
  const inputStyle =
    length === ""
      ? { width: "0.5rem" }
      : { width: `${length.length * 0.5}rem` };

  return (
    <div className={divClass}>
      <label htmlFor="data-output-length">Length</label>
      <input
        id="data-output-length"
        className="length-input"
        style={inputStyle}
        disabled
        value={length}
      />
    </div>
  );
}
