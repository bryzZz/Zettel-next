import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import Popup from "reactjs-popup";
import type { PopupPosition } from "reactjs-popup/dist/types";

interface ButtonWithTooltipProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  tip: string;
  position: PopupPosition | PopupPosition[];
  offsetY?: number;
}

export const ButtonWithTooltip: React.FC<ButtonWithTooltipProps> = ({
  tip,
  position,
  offsetY,
  ...props
}) => {
  return (
    <Popup
      offsetY={offsetY}
      trigger={<button {...props} />}
      position={position}
      on={["hover"]}
      arrowStyle={{
        color: "rgb(64 64 64 / 1)",
        scale: "1.5",
      }}
    >
      <span className="rounded bg-neutral-700 p-2 text-neutral-200">{tip}</span>
    </Popup>
  );
};
