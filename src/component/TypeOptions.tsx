import { ReactElement } from "react";
import { CalculateFromBarcodeType } from "../interface/Calculate";
import { BarcodeType } from "../enum/BarcodeType";

export function TypeOptions({
  className,
  type,
  onTypeChange,
}: {
  className: string;
  type: BarcodeType;
  onTypeChange: CalculateFromBarcodeType;
}) {
  const typeOptions = Object.keys(BarcodeType).map((key) => {
    let options: ReactElement[] = [];
    options.push(
      <option key={key}>{BarcodeType[key as keyof typeof BarcodeType]}</option>
    );
    return options;
  });

  return (
    <select
      id="barcodeTypes"
      className={className}
      value={type}
      onChange={(e) => {
        onTypeChange(e.target.value as BarcodeType);
      }}
    >
      {typeOptions}
    </select>
  );
}
