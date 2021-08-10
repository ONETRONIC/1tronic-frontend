import styled from "styled-components";
import { Text } from 'components/_uikit'
import { scales } from "../Checkbox/types";
import { ToggleProps, HandleProps, InputProps, HandleTextProps, ScaleKeys } from "./types";

const scaleKeyValues = {
  sm: {
    handleHeight: "16px",
    handleWidth: "16px",
    handleLeft: "2px",
    handleTop: "2px",
    checkedLeft: "calc(100% - 18px)",
    toggleHeight: "20px",
    toggleWidth: "36px",
  },
  md: {
    handleHeight: "27px",
    handleWidth: "27px",
    handleLeft: "2px",
    handleTop: "2px",
    checkedLeft: "calc(100% - 29px)",
    toggleHeight: "31px",
    toggleWidth: "80px",
  },
  lg: {
    handleHeight: "32px",
    handleWidth: "32px",
    handleLeft: "4px",
    handleTop: "4px",
    checkedLeft: "calc(100% - 36px)",
    toggleHeight: "40px",
    toggleWidth: "80px",
  },
};

const getScale =
  (property: ScaleKeys) =>
  ({ scale = scales.MD }: ToggleProps) => {
    return scaleKeyValues[scale][property];
  };

export const Handle = styled.div<HandleProps>`
  background-color: ${({ theme }) => theme.colors.contrast};
  border-radius: 50%;
  cursor: pointer;
  height: ${getScale("handleHeight")};
  left: ${getScale("handleLeft")};
  position: absolute;
  top: ${getScale("handleTop")};
  transition: left 200ms ease-in;
  width: ${getScale("handleWidth")};
  z-index: 2;
`;

export const HandleText = styled(Text)<HandleTextProps>`
  cursor: pointer;
  font-size: 14px;
  right: ${({checked}) => !checked ? "12px" : "auto"};
  left: ${({checked}) => !checked ? "auto" : "12px"};
  top: 6px;
  transition: left 200ms ease-in;
  position: absolute;
  color: ${({ theme }) => theme.colors.contrast};
  z-index: 1;
`;

export const Input = styled.input<InputProps>`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;

  &:checked + ${Handle} {
    left: ${getScale("checkedLeft")};
  }
`;

const StyledToggle = styled.div<ToggleProps>`
  align-items: center;
  background-color: ${({ theme, checked }) => theme.colors[checked ? "secondary" : "input"]};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  cursor: pointer;
  display: inline-flex;
  height: ${getScale("toggleHeight")};
  position: relative;
  transition: background-color 200ms;
  width: ${getScale("toggleWidth")};
`;

export default StyledToggle;
