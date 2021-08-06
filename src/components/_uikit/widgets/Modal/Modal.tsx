import React from "react";
import styled, { useTheme } from "styled-components";
import Heading from "../../components/Heading/Heading";
import getThemeValue from "../../util/getThemeValue";
import { Link } from "../../components/Link";
import { HelpIcon } from "../../components/Svg";
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from "./styles";
import { ModalProps } from "./types";
import { useMatchBreakpoints } from "../../hooks";

const HelpLink = styled(Link)`
  display: flex;
  align-self: center;
  align-items: center;
`;

const Modal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "24px",
  headerBackground = "contrast",
  minWidth = "320px",
  helperLink = "",
  ...props
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const theme = useTheme();
  return (
    <ModalContainer minWidth={minWidth} {...props}>
      <ModalHeader background={getThemeValue(`colors.${headerBackground}`, headerBackground)(theme)}>
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Heading color="background" scale="md">{title}</Heading>
        </ModalTitle>
        {helperLink !== "" &&
          <HelpLink href={helperLink} external>
            <HelpIcon color="background" width="24px" />
          </HelpLink>
        }
        {!hideCloseButton && !isMobile && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default Modal;
