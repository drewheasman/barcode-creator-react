import { useState, useMemo } from "react";
import { BarcodeImage } from "../component/Barcode/BarcodeImage";
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
import { CalculateMessages } from "../component/CalculateMessages";
import { BarcodeType } from "../enum/BarcodeType";
import { BarcodeCard } from "../component/Barcode/BarcodeCard";

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
      <div className="container py-3">
        <div className="row overflow-auto py-1">
          <TypeOptions type={barcodeType} onTypeChange={onBarcodeTypeChange} />
        </div>
        <div className="row py-1">
          <div className="col col-md input-group">
            <DataTextInput
              id="data-input"
              inputText={inputString}
              onInputTextChange={onInputTextChange}
            />
            <CheckDigitCheckbox
              label="Luhn"
              checked={luhnBoolean}
              onCheckDigitChange={onLuhnChange}
            />
            <CheckDigitCheckbox
              label="UPC-A"
              checked={upcaBoolean}
              onCheckDigitChange={onUpcaChange}
            />
          </div>
        </div>

        <div className="input-group py-1">
          <DataTextOutput
            id="data-output"
            outputText={barcodeData.outputString}
          />
          <OutputLengthField length={barcodeData.outputLength} />
        </div>

        <div className="py-1">
          <BarcodeCard
            barcodeLinesBits={barcodeData.barcodeLinesBits}
            barcodeText={barcodeData.barcodeText}
          />
        </div>

        <div className="py-1">
          <CalculateMessages
            messages={barcodeData.messages}
          ></CalculateMessages>
        </div>
      </div>
    </>
  );
}
