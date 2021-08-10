import React, { cloneElement, Children, ReactElement } from "react";
import styled, { DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { scales, variants } from "../Button/types";
import { ButtonMenuProps } from "./types";

interface StyledButtonMenuProps extends ButtonMenuProps {
  theme: DefaultTheme;
}

const getBackgroundColor = ({ theme, variant }: StyledButtonMenuProps) => {
  let color = theme.colors.primary
  switch (variant) {
    case variants.PRIMARY:
      color = theme.colors.primary;
      break;  
    case variants.PRIMARY_CONTRAST:
      color = theme.colors.background;
      break;  
    default:
      color = theme.colors.primary;
      break;
  }
  return color;
};

const getBorderColor = ({ theme, variant }: StyledButtonMenuProps) => {
  let color = theme.colors.primary
  switch (variant) {
    case variants.PRIMARY:
      color = theme.colors.background;
      break;  
    case variants.PRIMARY_CONTRAST:
      color = theme.colors.primary;
      break;  
    default:
      color = theme.colors.primary;
      break;
  }
  return color;
};

const StyledButtonMenu = styled.div<StyledButtonMenuProps>`
  background-color: ${getBackgroundColor};
  border-radius: 8px;
  display: inline-flex;
  border: 1px solid ${getBorderColor};

  & > button + button,
  & > a + a {
    margin-left: 2px; // To avoid focus shadow overlap
  }
  ${space}
`;

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.PRIMARY,
  onItemClick,
  children,
  ...props
}) => {
  return (
    <StyledButtonMenu variant={variant} {...props}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
          scale,
          variant,
        });
      })}
    </StyledButtonMenu>
  );
};

export default ButtonMenu;
