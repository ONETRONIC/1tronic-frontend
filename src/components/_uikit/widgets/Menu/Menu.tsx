import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Heading, Text} from 'components/_uikit'
import Overlay from "../../components/Overlay/Overlay";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./components/Logo";
import Panel from "./components/Panel";
import UserBlock from "./components/UserBlock";
import { NavProps } from "./types";
import { MENU_HEIGHT, SIDEBAR_WIDTH_FULL } from "./config";
import CurrencyConverter from "./components/CurrencyConverter";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  &:before { 
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: calc(100vh - 285px);
    left: 0px;
    background: url(/images/1tronic/decoration-back.svg) center center;
    opacity: .07;
  }
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  // position: absolute;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 60px;
  width: 100%;
  // height: ${MENU_HEIGHT}px;
  // background-color: ${({ theme }) => theme.nav.background};
  // border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 1;
  transform: translate3d(0, 0, 0);
  ${({ theme }) => theme.mediaQueries.nav} {
    justify-content: space-between;
  }
  
`;

const BackGroundCardWrapper = styled.div`
  position: fixed;
  height: 240px;
  bottom: -220px;
  right: 0;
  left: 0;
  width: 100%;
`

const BackGroundImg2 = styled.div<{ showBgDecoration: boolean }>`
  width: 100%;
  position: absolute;
  left: 0;
  height: 100vh;
  top: ${({ showBgDecoration }) => (showBgDecoration ? `240px` : `20px`)};
  border-top: 1px solid ;
  border-color: ${({ theme }) => theme.colors.backgroundDisabled};
  background-color: ${({ theme }) => theme.nav.background};
`;

const BackGroundImgCard = styled.img`
  position: relative;
  right: auto;
  width: 100%;
  height: 100%;
`;
const RobotImgCard = styled.img`
  position: absolute;
  width: 361px;
  height: 589px;
  filter: drop-shadow(5px 10px 2px rgba(0,0,0,0.5));
  right: 0;
  ${({ theme }) => theme.mediaQueries.nav} {
    right: max(${SIDEBAR_WIDTH_FULL}px, calc((100vw - 1440px)/2));
  }  
`;

const BodyWrapper = styled.div`
  z-index: 1;
`;

const InnerFixed = styled.div<{ showMenu: boolean }>`
  flex-grow: 1;
  // margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: max(${SIDEBAR_WIDTH_FULL}px, calc((100vw - 1440px)/2));
    margin-right: max(${SIDEBAR_WIDTH_FULL}px, calc((100vw - 1440px)/2));
    max-width: 1440px;
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const Hero = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
    padding-top: 0;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: max(${SIDEBAR_WIDTH_FULL}px, calc((100vw - 1440px)/2));
    margin-right: max(${SIDEBAR_WIDTH_FULL}px, calc((100vw - 1440px)/2));
    max-width: 1440px;
  }
`

const LogoMini = styled.img`
  height: 31px;
`;

const MobileLogo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
`;

const Banner = styled.div`
  height: 120px;
  max-width: 920px;
  margin: auto;
  margin-bottom: 60px;
  img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const Tagliner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
    padding-top: 0;
  }
`

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  children,
  tagline,
  showMascott,
  showBgDecoration,
  currency,
  conversionValue,
  onCurrencySelect,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(false);
  const [showMenu ] = useState(true);
  // let bannerPath = bannerSources[1];
  // let indexBanner = 0;
  // function switchBanner() {
  //   if (indexBanner === bannerSources.length) {
  //     indexBanner = 0;
  //   }
  //   bannerPath = bannerSources[indexBanner];
  //   indexBanner++;
  // }

  useEffect(() => {
    
  }, []);
  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");
  
  // setInterval(switchBanner, 500);
  return (
    <Wrapper>      
      <BodyWrapper>
        <StyledNav showMenu={showMenu}>
          {isMobile &&(<MobileLogo>
            <Logo
              isPushed={isPushed}
              togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
              isDark={isDark}
              href={homeLink?.href ?? "/"}
            />
            <Flex>
              <CurrencyConverter 
                onCurrencySelect={onCurrencySelect}
                currency={currency}
                conversionValue={conversionValue}
              />
              {!!login && !!logout && (
                <UserBlock account={account} login={login} logout={logout}/>
              )}
            </Flex>
          </MobileLogo>)}
          <Hero>
            <Banner>              
              <ins data-revive-zoneid="2" data-revive-id="334e2814b61d4020ee29a24975d46ada"/>
            </Banner>
            <Tagliner>
              <div >
                <NavLink exact activeClassName="active" to="/" id="farm-apr-cta">
                  <Flex alignItems="center" mb="4px">
                    <LogoMini src="/images/1tronic/swap.svg" alt="Logo"/>
                    <Heading as="h1" scale="lg" color="primary" ml="12px">
                      1TRONICSWAP
                    </Heading>
                  </Flex>
                  <Text color="textSubtle" fontSize={isMobile ? "12px":"16px"}>{tagline}</Text>
                </NavLink>
              </div>
              <Flex>
                {!isMobile &&(<CurrencyConverter 
                  onCurrencySelect={onCurrencySelect}
                  currency={currency}
                  conversionValue={conversionValue}
                />)}
                {!!login && !!logout && !isMobile &&(
                  <Flex>
                    <UserBlock account={account} login={login} logout={logout} />
                    {/* {profile && <Avatar profile={profile} />} */}
                  </Flex>
                )}
              </Flex>
            </Tagliner>
            <BackGroundCardWrapper>
              {showBgDecoration && (<BackGroundImgCard src="/images/1tronic/decoration-card-vert.svg" alt="background"/>)}
              {showMascott && !isMobile && (<RobotImgCard src="/images/1tronic/mascott.svg" alt="background"/>)}
              <BackGroundImg2 showBgDecoration={showBgDecoration}/>
            </BackGroundCardWrapper>
          </Hero>
        </StyledNav>
        <Panel
          isPushed={isPushed}
          isMobile={isMobile}
          showMenu={showMenu}
          showFooter
          isDark={isDark}
          toggleTheme={toggleTheme}
          langs={langs}
          setLang={setLang}
          currentLang={currentLang}
          cakePriceUsd={cakePriceUsd}
          pushNav={setIsPushed}
          links={links}
        />
        <InnerFixed showMenu={showMenu}>
          {children}
        </InnerFixed>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
