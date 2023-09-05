import { MessageLevel } from "../../enum/MessageLevel";
import { levelColor } from "./LevelColor";

describe("levelColor function", () => {
  it("should return 'danger' for MessageLevel.Error", () => {
    expect(levelColor(MessageLevel.Error)).toBe("danger");
  });

  it("should return 'success' for MessageLevel.Info", () => {
    expect(levelColor(MessageLevel.Info)).toBe("success");
  });

  it("should return 'warning' for MessageLevel.Warn", () => {
    expect(levelColor(MessageLevel.Warn)).toBe("warning");
  });

  it("should return 'success' for unknown MessageLevel", () => {
    expect(levelColor(999 as MessageLevel)).toBe("success");
  });
});
