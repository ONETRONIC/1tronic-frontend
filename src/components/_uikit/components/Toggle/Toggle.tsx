import React from "react";
import StyledToggle, { Input, Handle, HandleText} from "./StyledToggle";
import { ToggleProps, scales } from "./types";

const Toggle: React.FC<ToggleProps> = ({ checked, scale = scales.MD, text, ...props }) => {
  const isChecked = !!checked;

  return (
    <div>
      <StyledToggle checked={isChecked} scale={scale}>
        <Input checked={checked} scale={scale} {...props} type="checkbox" />
        <Handle scale={scale} />
        <HandleText checked={checked} scale={scale}>{text}</HandleText>
      </StyledToggle>
    </div>
  );
};

Toggle.defaultProps = {
  scale: scales.MD,
  text: '',
};

export default Toggle;
