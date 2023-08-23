import { ReactElement } from "react";
import { CalculateFromBarcodeType } from "../interface/Calculate";
import { BarcodeType } from "../enum/BarcodeType";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export function TypeOptions({
  type,
  onTypeChange,
}: {
  type: BarcodeType;
  onTypeChange: CalculateFromBarcodeType;
}) {
  let options: ReactElement[] = [];
  Object.keys(BarcodeType).forEach((k) => {
    const barcodeType: string = BarcodeType[k as keyof typeof BarcodeType];
    options.push(
      <ToggleButton
        value={barcodeType}
        id={barcodeType}
        key={barcodeType}
        variant="outline-success"
      >
        {barcodeType}
      </ToggleButton>
    );
  });

  return (
    <ToggleButtonGroup
      type="radio"
      name="Barcode type options"
      value={type}
      onChange={onTypeChange}
      role="group"
      className="text-nowrap"
    >
      {options}
    </ToggleButtonGroup>
  );
}
