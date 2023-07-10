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
