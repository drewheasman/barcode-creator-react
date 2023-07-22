import { Message, MessageLevel } from "../interface/Message";

export const cannotProcessTypeMessage: Message = {
  level: MessageLevel.Error,
  message: "Cannot process selected type, or implementation incomplete",
};

export const calculateFailMessage: Message = {
  level: MessageLevel.Error,
  message: "Unable to calculate barcode",
};

export const invalidCharactersMessage: Message = {
  level: MessageLevel.Error,
  message: "Invalid characters detected",
};

export const invalidStartStopCharactersMessage = (
  typeName: string,
  validCharacters: string
) => {
  return {
    level: MessageLevel.Error,
    message: `${typeName} first character and last character must be ${charactersMessage(
      validCharacters
    )}`,
  };
};

export const invalidDataCharactersMessage = (
  typeName: string,
  validCharacters: string
) => {
  return {
    level: MessageLevel.Error,
    message: `${typeName} data must be ${charactersMessage(validCharacters)}`,
  };
};

export const numericOnlyMessage = (typeName: string) => {
  return {
    level: MessageLevel.Error,
    message: `${typeName} barcodes are numeric only`,
  };
};

export const UPCAInvalidCharactersMessage: Message = {
  level: MessageLevel.Warn,
  message: "Could not calculate UPC-A check digit for non-numeric data",
};

export const paddedDataMessage = (typeName: string, length: number) => {
  return {
    level: MessageLevel.Warn,
    message: `Input padded, ${typeName} barcodes have input length ${length}`,
  };
};

export const paddedEvenDataMessage = (typeName: string) => {
  return {
    level: MessageLevel.Warn,
    message: `Input padded, ${typeName} barcodes have input length that is even`,
  };
};

export const truncatedDataMessage = (typeName: string, length: number) => {
  return {
    level: MessageLevel.Warn,
    message: `Input truncated, ${typeName} barcodes have max input length ${length}`,
  };
};

export const dataTooShortMessage = (typeName: string, length: number) => {
  return {
    level: MessageLevel.Warn,
    message: `${typeName} barcodes have min input length ${length}`,
  };
};

function charactersMessage(characters: string) {
  let message = characters
    .substring(0, characters.length - 1)
    .split("")
    .join(" ");
  message += ` or ${characters.charAt(characters.length - 1)}`;

  return message;
}
