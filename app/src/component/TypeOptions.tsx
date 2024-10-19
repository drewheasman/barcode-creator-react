import { ReactElement } from "react";
import { BarcodeType } from "../enum/BarcodeType";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { MessageLevel } from "../enum/MessageLevel";
import { Label } from "./Label";

export type CalculateFromBarcodeType = (barcodeType: BarcodeType) => void;

export function TypeOptions({
  type,
  onTypeChange,
}: {
  type: BarcodeType;
  onTypeChange: CalculateFromBarcodeType;
}) {
  let options: ReactElement[] = [];
  options.push(<Label key="type-label" label="Symbology" level={MessageLevel.Info} />);
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
