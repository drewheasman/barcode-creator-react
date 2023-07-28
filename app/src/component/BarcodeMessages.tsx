import { ReactElement } from "react";
import { Message, MessageLevel } from "../interface/Message";

export function BarcodeMessages({
  messages,
  className,
}: {
  messages: Message[];
  className: string;
}) {
  let displayMessages: ReactElement[] = [];

  messages.forEach((m) => {
    switch (m.level) {
      case MessageLevel.Info:
        displayMessages.push(
          <p className="info-message">
            <span className="material-icons-outlined info-icon">info</span>
            {m.message}
          </p>
        );
        break;
      case MessageLevel.Error:
        displayMessages.push(
          <p className="info-message">
            <span className="material-icons-outlined info-icon">error</span>
            {m.message}
          </p>
        );
        break;
      case MessageLevel.Warn:
        displayMessages.push(
          <p className="info-message">
            <span className="material-icons-outlined info-icon">warning</span>
            {m.message}
          </p>
        );
        break;
      default:
        displayMessages.push(
          <p className="info-message">
            <span className="material-icons-outlined">error</span>
            "Message could not be displayed"
          </p>
        );
    }
  });

  return <div className={className}>{displayMessages}</div>;
}
export { MessageLevel as messageLevel };
