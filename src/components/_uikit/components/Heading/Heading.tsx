import styled from "styled-components";
import Text from "../Text/Text";
import { tags, scales, HeadingProps } from "./types";

const style = {
  [scales.SM]: {
    fontSize: "12px",
    fontSizeLg: "14px",
  },
  [scales.MD]: {
    fontSize: "20px",
    fontSizeLg: "24px",
  },
  [scales.LG]: {
    fontSize: "30px",
    fontSizeLg: "36px",
  },
  [scales.XL]: {
    fontSize: "36px",
    fontSizeLg: "40px",
  },
  [scales.XXL]: {
    fontSize: "40px",
    fontSizeLg: "48px",
  },
};

const Heading = styled(Text).attrs({ bold: true })<HeadingProps>`
  font-size: ${({ scale }) => style[scale || scales.MD].fontSize};
  font-weight: 700;
  line-height: 1.1;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: ${({ scale }) => style[scale || scales.MD].fontSizeLg};
  }
`;

Heading.defaultProps = {
  as: tags.H2,
};

export default Heading;
