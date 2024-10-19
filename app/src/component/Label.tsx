import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import { MessageLevel } from "../enum/MessageLevel";
import { levelColor } from "../util/Messages/LevelColor";

export function Label({
  label,
  level,
  tooltip,
}: {
  label: string;
  level: MessageLevel;
  tooltip: string;
}) {
  const classColor = levelColor(level);

  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>{tooltip}</Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <label
          className={`input-group-text col-sm-2 focus-${classColor}`}
        >{label}</label>
      </OverlayTrigger>
    </>
  );
}
