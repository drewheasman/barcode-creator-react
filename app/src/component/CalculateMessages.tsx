import { ReactElement } from "react";
import { Message, MessageLevel } from "../interface/Message";

export function CalculateMessages({ messages }: { messages: Message[] }) {
  let displayMessages: ReactElement[] = [];

  messages.forEach((m) => {
    switch (m.level) {
      case MessageLevel.Info:
        displayMessages.push(messageAlert(m.message, "alert-info"));
        break;
      case MessageLevel.Error:
        displayMessages.push(messageAlert(m.message, "alert-danger"));
        break;
      case MessageLevel.Warn:
        displayMessages.push(messageAlert(m.message, "alert-warning"));
        break;
      default:
        displayMessages.push(messageAlert(m.message, "alert-dark"));
    }
  });

  return <>{displayMessages}</>;
}

function messageAlert(message: string, alertTypeClass: string) {
  return (
    <div className={`alert ${alertTypeClass}`} role="alert">
      {message}
    </div>
  );
}
