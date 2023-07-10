import { useState, useMemo } from "react";
import { BarcodeImage } from "../component/BarcodeImage";
import { CheckDigitCheckbox } from "../component/CheckDigitCheckbox";
import { DataTextInput } from "../component/DataTextInput";
import { DataTextOutput } from "../component/DataTextOutput";
import { TypeOptions } from "../component/TypeOptions";
import {
  CalculateFromBarcodeType,
  CalculateFromInputText,
  CalculateFromCheckDigit,
} from "../interface/Calculate";
import { CalculatedBarcodeData } from "../interface/CalculatedBarcodeData";
import { calculateBarcodeData } from "../util/Calculate";
import { OutputLengthField } from "../component/DataTextLength";
import { BarcodeMessages } from "../component/BarcodeMessages";
import { BarcodeType } from "../enum/BarcodeType";

export function BarcodeCalculator() {
  const [barcodeType, setBarcodeType] = useState(BarcodeType.Code128);
  const [inputString, setInputString] = useState("");
  const [luhnBoolean, setLuhnBoolean] = useState(false);
  const [upcaBoolean, setUpcaBoolean] = useState(false);

  const onBarcodeTypeChange: CalculateFromBarcodeType = (
    barcodeType: BarcodeType
  ) => {
    setBarcodeType(barcodeType as BarcodeType);
  };

  const onInputTextChange: CalculateFromInputText = (inputText: string) => {
    setInputString(inputText);
  };

  const onLuhnChange: CalculateFromCheckDigit = (
    checkDigitChecked: boolean
  ) => {
    setLuhnBoolean(checkDigitChecked);
    setUpcaBoolean(false);
  };

  const onUpcaChange: CalculateFromCheckDigit = (
    checkDigitChecked: boolean
  ) => {
    setUpcaBoolean(checkDigitChecked);
    setLuhnBoolean(false);
  };

  const barcodeData: CalculatedBarcodeData = useMemo(
    () =>
      calculateBarcodeData(inputString, luhnBoolean, upcaBoolean, barcodeType),
    [barcodeType, inputString, luhnBoolean, upcaBoolean]
  );

  return (
    <div className="page-content">
      <div className="barcode-calculator-grid-container">
        <div className="barcode-calculator-grid-container-left">
          <label className="barcode-calculator-grid-type-label">Type</label>
          <TypeOptions
            className="barcode-calculator-grid-type-input"
            type={barcodeType}
            onTypeChange={onBarcodeTypeChange}
          />
          <label
            className={"barcode-calculator-grid-input-label"}
            htmlFor="data-input"
          >
            Input
          </label>
          <DataTextInput
            id="data-input"
            className="barcode-calculator-grid-input-input"
            inputText={inputString}
            onInputTextChange={onInputTextChange}
          />
          <label
            className="barcode-calculator-grid-output-label"
            htmlFor="data-output"
          >
            Output
          </label>
          <DataTextOutput
            id="data-output"
            className="barcode-calculator-grid-output-input"
            outputText={barcodeData.outputString}
          />
        </div>
        <div className="barcode-calculator-grid-container-right">
          <CheckDigitCheckbox
            label="Luhn"
            className="barcode-calculator-grid-luhn-checkbox"
            checked={luhnBoolean}
            onCheckDigitChange={onLuhnChange}
          />
          <CheckDigitCheckbox
            label="UPC-A"
            className="barcode-calculator-grid-upca"
            checked={upcaBoolean}
            onCheckDigitChange={onUpcaChange}
          />
          <OutputLengthField
            className="barcode-calculator-grid-length"
            length={barcodeData.outputLength}
          />
        </div>
      </div>

      <BarcodeImage
        barcodeLinesBits={barcodeData.barcodeLinesBits}
        barcodeText={barcodeData.barcodeText}
      />

      <BarcodeMessages messages={barcodeData.messages}></BarcodeMessages>
    </div>
  );
}
