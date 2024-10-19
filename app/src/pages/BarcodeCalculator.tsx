import { useState, useMemo } from "react";
import { Checkbox, CheckboxChange } from "../component/Checkbox";
import { DataTextInput, InputTextChange } from "../component/DataTextInput";
import { DataTextOutput } from "../component/DataTextOutput";
import { CalculateFromBarcodeType, TypeOptions } from "../component/TypeOptions";
import { CalculatedBarcodeData } from "../interface/CalculatedBarcodeData";
import { calculateBarcodeData } from "../util/Calculate";
import { OutputLengthField } from "../component/DataTextLength";
import { CalculateMessages } from "../component/CalculateMessages";
import { BarcodeType } from "../enum/BarcodeType";
import { BarcodeCard } from "../component/Barcode/BarcodeCard";
import { MessageLevel } from "../enum/MessageLevel";
import { FileChooser, OnBulkFilenameChange } from "../component/FileChooser";
import { OnSubmitClick, SubmitButton } from "../component/SubmitButton";
import { generateBulk } from "../util/GenerateBulk";
import { Label } from "../component/Label";

export function BarcodeCalculator() {
  const [barcodeType, setBarcodeType] = useState(BarcodeType.Code128);
  const [luhnBoolean, setLuhnBoolean] = useState(false);
  const [upcaBoolean, setUpcaBoolean] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [inputString, setInputString] = useState("");
  const [bulkFiles, setBulkFiles] = useState("");

  const onBarcodeTypeChange: CalculateFromBarcodeType = (
    barcodeType: BarcodeType
  ) => {
    setBarcodeType(barcodeType);
  };

  const onSingleModeChange: CheckboxChange = (
    singleModeChecked: boolean
  ) => {
    setBulkMode(!singleModeChecked);
  };

  const onBulkModeChange: CheckboxChange = (
    bulkModeChecked: boolean
  ) => {
    setBulkMode(bulkModeChecked);
  };

  const onInputTextChange: InputTextChange = (
    inputText: string
  ) => {
    setInputString(inputText);
  };

  const onLuhnChange: CheckboxChange = (
    checkDigitChecked: boolean
  ) => {
    setLuhnBoolean(checkDigitChecked);
    setUpcaBoolean(false);
  };

  const onUpcaChange: CheckboxChange = (
    checkDigitChecked: boolean
  ) => {
    setUpcaBoolean(checkDigitChecked);
    setLuhnBoolean(false);
  };

  const onBulkFilenameChange: OnBulkFilenameChange = (
    event
  ) => {
    const input = event.currentTarget;
    if (!input || !input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === 'string') {
        const content = e.target.result;
        setBulkFiles(content);
      }
    };
    reader.readAsText(file);
  };

  const onBulkGenerateClick: OnSubmitClick = () => {
    generateBulk(bulkFiles);
  };

  const barcodeData: CalculatedBarcodeData = useMemo(
    () =>
      calculateBarcodeData(inputString, luhnBoolean, upcaBoolean, barcodeType),
    [barcodeType, inputString, luhnBoolean, upcaBoolean]
  );

  return (
    <>
      <div className="container py-3">

        <div className="row py-1">
          <div className="col col-md input-group">
            <Label
              label="Mode"
              level={MessageLevel.Info}
            />
            <Checkbox
              label="Single"
              checked={!bulkMode}
              level={MessageLevel.Info}
              onCheckboxChange={onSingleModeChange}
            />
            <Checkbox
              label="Bulk"
              checked={bulkMode}
              level={MessageLevel.Info}
              onCheckboxChange={onBulkModeChange}
            />
          </div>
        </div>

        <div className="row overflow-auto py-1">
          <div className="col col-md input-group">
            <Label
              label="Symbology"
              level={MessageLevel.Info}
            />
            <TypeOptions type={barcodeType} onTypeChange={onBarcodeTypeChange} />
          </div>
        </div>

        <div className="row py-1">
          <div className="col col-md input-group">
            <Label
              label="Check digit"
              level={MessageLevel.Info}
            />
            <Checkbox
              label="Luhn"
              checked={luhnBoolean}
              level={barcodeData.luhnLevel}
              onCheckboxChange={onLuhnChange}
            />
            <Checkbox
              label="UPC-A"
              checked={upcaBoolean}
              level={barcodeData.upcaLevel}
              onCheckboxChange={onUpcaChange}
            />
          </div>
        </div>

        {bulkMode ?
          (<>
            <div className="row py-1">
              <FileChooser
                level={MessageLevel.Info}
                onChange={onBulkFilenameChange}
              />
            </div>
            <div className="row py-1">
              <div className="col col-md input-group">
                <SubmitButton
                  label="Generate"
                  level={MessageLevel.Info}
                  onSubmit={onBulkGenerateClick}
                />
              </div>
            </div>
          </>)
          : (<>
            <div className="row py-1">
              <div className="col col-md input-group">
                <DataTextInput
                  id="data-input"
                  inputText={inputString}
                  level={barcodeData.inputLevel}
                  onInputTextChange={onInputTextChange}
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
          </>)
        }
      </div>
    </>
  );
}
