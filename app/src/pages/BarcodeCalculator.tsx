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
    setBarcodeType(barcodeType);
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
    <>
      <div className="fields-container">
        <div className="page-content">
          <div className="type-options-container">
            <TypeOptions
              className="type-options"
              type={barcodeType}
              onTypeChange={onBarcodeTypeChange}
            />
          </div>
        </div>
        <div className="page-content">
          <DataTextInput
            id="data-input"
            className="data-fields"
            inputText={inputString}
            onInputTextChange={onInputTextChange}
          />
          <CheckDigitCheckbox
            label="Luhn"
            className=""
            checked={luhnBoolean}
            onCheckDigitChange={onLuhnChange}
          />
          <CheckDigitCheckbox
            label="UPC-A"
            className=""
            checked={upcaBoolean}
            onCheckDigitChange={onUpcaChange}
          />
        </div>

        <div className="page-content barcode-calculator-div">
          <DataTextOutput
            id="data-output"
            className="data-fields"
            outputText={barcodeData.outputString}
          />
          <OutputLengthField length={barcodeData.outputLength} />
        </div>
      </div>

      <BarcodeImage
        barcodeLinesBits={barcodeData.barcodeLinesBits}
        barcodeText={barcodeData.barcodeText}
      />

      <div className="fields-container">
        <BarcodeMessages
          className="page-content"
          messages={barcodeData.messages}
        ></BarcodeMessages>
      </div>
    </>
  );
}
