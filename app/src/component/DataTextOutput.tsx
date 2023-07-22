export function DataTextOutput({
  id,
  className,
  outputText,
}: {
  id: string;
  className: string;
  outputText: string;
}) {
  return <input id={id} className={className} value={outputText} disabled />;
}
