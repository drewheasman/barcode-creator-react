import { MessageLevel } from "../enum/MessageLevel";
export { MessageLevel } from "../enum/MessageLevel";

export interface Message {
  level: MessageLevel;
  message: string;
}
