import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { BaseButtonProps, PolymorphicComponent, variants } from "../Button/types";
import { ButtonMenuItemProps } from "./types";

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps["as"];
}

function variantSelector(theme, variant){
  let color = theme.colors.primary
  switch (variant) {
    case variants.PRIMARY:
      color = theme.colors.primary;
      break;  
    case variants.PRIMARY_CONTRAST:
      color = theme.colors.primary;
      break;  
    default:
      color = theme.colors.background;
      break;
  }
  return color
}

function variantInverseSelector(theme, variant){
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
}
const InactiveButton: PolymorphicComponent<InactiveButtonProps, "button"> = styled(Button)<InactiveButtonProps>`
  background-color: ${({ theme, variant }) => (variantSelector(theme, variant))};
  color: ${({ theme, variant }) => (variantInverseSelector(theme, variant))};
  &:hover:not(:disabled):not(:active) {    
    color: ${({ theme, variant }) => (variantSelector(theme, variant))};
    background-color: ${({ theme, variant }) => (variantInverseSelector(theme, variant))};
  }
`;

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, "button"> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButton forwardedAs={as} variant="subtle" {...props} />;
  }

  return <Button as={as} variant={variant} {...props} />;
};

export default ButtonMenuItem;
