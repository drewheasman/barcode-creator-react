import { MessageLevel } from "../../enum/MessageLevel";

export function levelColor(level: MessageLevel) {
  let classColor;

  switch (level) {
    case MessageLevel.Error:
      classColor = "danger";
      break;
    case MessageLevel.Info:
      classColor = "success";
      break;
    case MessageLevel.Warn:
      classColor = "warning";
      break;
    default:
      classColor = "$success";
      break;
  }
  return classColor;
}
