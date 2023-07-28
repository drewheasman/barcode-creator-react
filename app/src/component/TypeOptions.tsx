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
  let options: ReactElement[] = [];
  Object.keys(BarcodeType).map((k) => {
    options.push(
      <TypeOption
        type={BarcodeType[k as keyof typeof BarcodeType]}
        selectedType={type}
        onTypeChange={onTypeChange}
      />
    );
  });

  return <ul className={className}>{options}</ul>;
}

function TypeOption({
  type,
  selectedType,
  onTypeChange,
}: {
  type: BarcodeType;
  selectedType: BarcodeType;
  onTypeChange: CalculateFromBarcodeType;
}) {
  return (
    <li>
      <input
        id={type}
        name={type}
        type="radio"
        checked={type === selectedType}
        onChange={() => onTypeChange(type)}
      />
      <label htmlFor={type}>{type}</label>
    </li>
  );
}
