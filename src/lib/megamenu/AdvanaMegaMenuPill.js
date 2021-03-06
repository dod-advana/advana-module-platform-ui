import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import AdvanaMegaMenu from './AdvanaMegaMenu';
import Config from '../config/config';

const MenuContainer = styled.div`
  width: 100vw;
  height: ${({ menuOpen }) => menuOpen ? '100%' : '0%'};
  overflow: ${({ menuOpen }) => menuOpen ? 'visible' : 'hidden'};
  background-color: rgba(19,30,67,0.978);
  color: white;
  z-index: 1000;
  position: fixed;
  transition: height .3s;
  top: 2em;
  left: 0;
`;

export const PillButton = styled.div`
  background-color: black;
  height: 50px;
  float: right;
  margin: ${({ margin }) => margin ?? ''};
  color: white;
  width: ${({ width }) => width ?? 'auto'};
  padding: ${({ padding }) => padding ?? '16px'};
  display: flex;
  align-items: center;
  z-index: 1010;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  position: ${({ menuOpen }) => menuOpen ? 'fixed' : ''};
  right: ${({ menuOpen, right }) => menuOpen ? right ? right : '20px' : ''};
  justify-content: ${({ justifyContent }) => justifyContent ? justifyContent : 'unset'}
`;

const SearchButton = styled.div`
  border-left: 1px solid white;
  border-right: 1px solid white;
  padding: 8px;
  font-size: 20px;
  &:hover {
    color: ${Config.MEGA_MENU_HIGHLIGHT_COLOR};
  }
`;

const UserButton = styled.div`
  padding-left: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 20px;
  &:hover {
    color: ${Config.MEGA_MENU_HIGHLIGHT_COLOR};
  }
`;

const CloseButton = styled.div`
  height: ${({ closeHeight }) => closeHeight ?? '49px'};
  width: ${({ closeWidth }) => closeWidth ?? '46px'};
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1010;
  visibility: ${({ menuOpen }) => menuOpen ? 'visible' : 'hidden'};
  flex: .4;
  position: ${({ menuOpen }) => menuOpen ? 'fixed' : ''};
  right: ${({ menuOpen, right }) => menuOpen ? right ? right : '30px' : ''};
  top: ${({ menuOpen, top }) => menuOpen ? top ? top : '160px' : ''};
`;

export const TitleText = styled.span`
  margin: 0 10px;
  font-family: Montserrat;
  font-weight: 700;
`;

const AdvanaMegaMenuPill = (props) => {
  const {
    margin,
    width,
    padding,
    closeHeight,
    closeWidth,
    defaultHeader,
    openPillRight,
    openPillTop,
    closeButtonRight,
    closeButtonTop,
    unread,
  	location = {},
  } = props;
  const { trackEvent } = useMatomo();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const profileLink = Config.PROFILE_LINK ?? Config.MEGA_MENU_BASE_DOMAIN + '/#/profile';

    return (
        <>
      	    <PillButton margin={margin} width={width} padding={padding} onClick={toggleMenu} menuOpen={menuOpen} top={openPillTop} right={openPillRight}>
                <MenuIcon fontSize="large" style={{ color: menuOpen ? Config.MEGA_MENU_HIGHLIGHT_COLOR : 'white' }} />
                <TitleText>{Config.MEGA_MENU_PILL_TEXT}</TitleText>
                {!location['pathname']?.includes('search') &&
					<SearchButton onClick={(e) => {
						e.stopPropagation();
						trackEvent({
							category: 'AdvanaMegaMenu_AdvanaMegaMenuPill',
							action: 'click',
							name: 'SearchIcon'
						});
						window.open(Config.MEGA_MENU_SEARCH_LINK, '_self')
					}}>
						<i className="fa fa-search"/>
					</SearchButton>
				}

                <UserButton onClick={() => {
                    trackEvent({
                    category: 'AdvanaMegaMenu_AdvanaMegaMenuPill',
                    action: 'click',
                    name: 'UserProfileIcon'
                    });
                    window.open(profileLink, '_self')
                }} aria-label="go to user profile">
                {unread && unread > 0 ? (
                  <Badge badgeContent={unread} color="error" overlap="rectangle">
                    <i className="fa fa-user" />
                  </Badge>
                  ) : (
                    <i className="fa fa-user" />
                  )}
                </UserButton>
            </PillButton>
            <CloseButton onClick={toggleMenu} closeHeight={closeHeight} closeWidth={closeWidth} menuOpen={menuOpen} top={closeButtonTop} right={closeButtonRight}>
                <CloseIcon fontSize="large" />
            </CloseButton>
            <MenuContainer className="MenuContainer" menuOpen={menuOpen}>
                <AdvanaMegaMenu showCloseButton={false} pillMenu={true} defaultHeader={defaultHeader} defaultMenuOpen={menuOpen} toggleMenu={toggleMenu} />
            </MenuContainer>
        </>
    )

}

export default AdvanaMegaMenuPill;
