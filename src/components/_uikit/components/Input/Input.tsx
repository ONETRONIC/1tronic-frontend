import styled, { DefaultTheme } from "styled-components";
import { InputProps, scales } from "./types";

interface StyledInputProps extends InputProps {
  theme: DefaultTheme;
}

/**
 * Priority: Warning --> Success
 */
const getBoxShadow = ({ isSuccess = false, isWarning = false, theme }: StyledInputProps) => {
  if (isWarning) {
    return theme.shadows.warning;
  }

  if (isSuccess) {
    return theme.shadows.success;
  }

  return theme.shadows.inset;
};

const getHeight = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return "32px";
    case scales.LG:
      return "48px";
    case scales.MD:
    default:
      return "40px";
  }
};

const getFontSize = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return "12px";
    case scales.LG:
      return "24px";
    case scales.MD:
    default:
      return "24px";
  }
};

const Input = styled.input<InputProps>`
  background-color: ${({ contrastMode, theme }) => !contrastMode ? theme.colors.input : `tranparent`};
  border: 1px solid ${({ contrastMode, theme }) => !contrastMode ? theme.colors.text : theme.colors.background };
  border-radius: 8px;
  box-shadow: ${getBoxShadow};
  color: ${({ contrastMode, theme }) => !contrastMode ? theme.colors.text : theme.colors.background };
  display: block;
  font-size: ${getFontSize};
  height: ${getHeight};
  outline: 0;
  padding: 0 16px;
  width: 100%;

  &::placeholder {
    color: ${({ contrastMode, theme }) => !contrastMode ? theme.colors.textSubtle : theme.colors.textSubtle };
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

Input.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
  contrastMode: false,
};

export default Input;
