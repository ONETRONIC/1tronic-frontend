import React from "react";
import styled from "styled-components";
import { Link } from "components/_uikit";
import { PanelProps, PushedProps } from "../types";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 89px;
`;
const LogoContainer = styled.div`
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.tertiary};
  img {
    
  }
  border-bottom: solid 1px ${({ theme }) => theme.colors.background};
`;
const Logo = styled.img`
  height: 31px;
  position: absolute;
  top: 29px;
  left: 24px;   
`;
const LogoText = styled.img`
  height: 31px;
  position: absolute;
  top: 29px;
  left: 44px;   
`;

const PanelHeader: React.FC<Props> = ({ isPushed, pushNav }) => {
  return (
    <Container onMouseEnter={() => {pushNav(true);}} onMouseLeave ={() => {pushNav(false);}}>
      <LogoContainer>
        <Link href="https://1tronic.io/" external>
          {isPushed ? (
            <div>
              <Logo src="/images/1tronic/1tronic-symbol.svg" alt="Logo"/> 
              <LogoText src="/images/1tronic/network-white.svg" alt="Logo"/>
            </div>
          ) : (
            <Logo src="/images/1tronic/1tronic-symbol.svg" alt="Logo"/>
          )}
        </Link>
      </LogoContainer>
    </Container>
  );
};

export default PanelHeader;
