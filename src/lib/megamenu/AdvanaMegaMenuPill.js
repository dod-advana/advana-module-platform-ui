import React, { useEffect, useState } from 'react';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Badge, styled } from '@mui/material';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import AdvanaMegaMenu from './AdvanaMegaMenu';
import Config from '../config/config';

const MenuContainer = styled('div', {
	shouldForwardProp: (props) => props !== 'menuOpen' && props !== 'headerOffset'
})(({ menuOpen, headerOffset }) => ({
  width: '100vw',
  height: menuOpen ? '100vh' : 0,
  overflow: menuOpen ? 'visible' : 'hidden',
  marginTop: 0,
  color: 'white',
  zIndex: 1000,
  position: 'fixed',
  transition: 'left .6s',
  top: headerOffset && headerOffset !== 0 ? 'calc(30px + ' + headerOffset + ')': 30,
  left: menuOpen ? 0 : '100vw',
  fontSize: 16,
}));

export const PillButton = styled('div', {
	shouldForwardProp: (props) => props !== 'menuOpen' && props !== 'headerOffset' && props !== 'justifyContent' && props !== 'width' && props !== 'margin' && props !== 'padding'
})(({ menuOpen, headerOffset, justifyContent, width, margin, padding }) => ({
  backgroundColor: 'black',
  height: 50,
  float: 'right',
  margin: margin ?? '',
  color: 'white',
  width: width ?? 'auto',
  padding: padding ?? 16,
  display: 'flex',
  alignItems: 'center',
  zIndex: menuOpen ? 0 : 1010,
  borderRadius: 5,
  cursor: 'pointer',
  flex: 1,
  position: 'static',
  right: menuOpen ? 100 : '',
  top: menuOpen ? 'calc(65px + ' + headerOffset + ')' : '',
  justifyContent: justifyContent ? justifyContent : 'unset',
  fontSize: 16,
  boxSizing: 'border-box',
}));

const SearchButton = styled('div', {
	shouldForwardProp: (props) => props !== 'isEnd'
})(({ isEnd }) => ({
  borderLeft: '1px solid white',
  padding: isEnd ? '8px 0 8px 8px' : '8px',
  position: 'relative',
  right: isEnd ? -4 : 0,
  fontSize: 20,
  '&:hover': {
    color: Config.MEGA_MENU_HIGHLIGHT_COLOR,
  },
}));

const UserButton = styled('div')({
  borderLeft: '1px solid white',
  paddingLeft: 12,
  paddingTop: 8,
  paddingBottom: 8,
  fontSize: 20,
  '&:hover': {
    color: Config.MEGA_MENU_HIGHLIGHT_COLOR,
  },
});

const CloseButton = styled('div', {
	shouldForwardProp: (props) => props !== 'menuOpen' && props !== 'headerOffset' && props !== 'closeWidth'
})(({ menuOpen, headerOffset, closeWidth }) => ({
  height: 50,
  width: closeWidth ?? 46,
  backgroundColor: 'white',
  borderRadius: 5,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1010,
  display: menuOpen ? 'flex' : 'none',
  flex: .4,
  position: menuOpen ? 'fixed' : '',
  right: menuOpen ? 25 : 0,
  top: menuOpen ?  'calc(65px + ' + headerOffset + ')' : '',
  fontSize: 16,
}));

export const TitleText = styled('span')({
  margin: '0 10px',
  fontFamily: 'Montserrat',
  fontWeight: 700,
});

const AdvanaMegaMenuPill = (props) => {
  const {
    margin,
    width,
    padding,
    closeWidth,
    defaultHeader,
    openPillRight,
    openPillTop,
    closeButtonRight,
    closeButtonTop,
    unread,
    showProfileLink = true,
    showSearch = true,
    headerOffset = 0
  } = props;
  const { trackEvent } = useMatomo();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenuOnNavigation = () => { setMenuOpen(false) };
  useEffect(() => {
    window.addEventListener('popstate', closeMenuOnNavigation);
    return () => {
      window.removeEventListener('popstate', closeMenuOnNavigation);
    }
  }, []);

  const toggleMenu = () => {

    trackEvent({
      category: "AdvanaMegaMenu_AdvanaMegaMenuPill",
      action: 'click',
      name: menuOpen ? 'MegaMenu Closed' : 'MegaMenu Opened'
    });

    setMenuOpen(!menuOpen);
  }
  const profileLink = Config.PROFILE_LINK ?? Config.MEGA_MENU_BASE_DOMAIN + '/#/profile';

  return <>
    <PillButton headerOffset={headerOffset}
                margin={margin} 
                width={width} 
                padding={padding} 
                onClick={toggleMenu} 
                menuOpen={menuOpen} 
                top={openPillTop} 
                right={openPillRight} 
                data-test-id="megamenu-pill">
      <MenuIcon fontSize="large" style={{ color: menuOpen ? Config.MEGA_MENU_HIGHLIGHT_COLOR : 'white' }} />
      <TitleText>{Config.MEGA_MENU_PILL_TEXT}</TitleText>

      {showSearch && <SearchButton onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          trackEvent({
            category: 'AdvanaMegaMenu_AdvanaMegaMenuPill',
            action: 'click',
            name: 'SearchIcon'
          });
          window.open(Config.MEGA_MENU_SEARCH_LINK, '_blank')
        }}
          isEnd={!showProfileLink}
        >
          <i className="fa fa-search" />
        </SearchButton>
      }

      {showProfileLink ?
        (<UserButton onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          trackEvent({
            category: 'AdvanaMegaMenu_AdvanaMegaMenuPill',
            action: 'click',
            name: 'UserProfileIcon'
          });
          window.open(profileLink, '_self')
        }} aria-label="go to user profile">
          {unread && unread > 0 ? (
            <Badge badgeContent={unread} color="error" overlap="rectangular">
              <i className="fa fa-user" />
            </Badge>
          ) : (
            <i className="fa fa-user" />
          )}
        </UserButton>) : null}
    </PillButton>
    <CloseButton onClick={toggleMenu} closeWidth={closeWidth} menuOpen={menuOpen} top={closeButtonTop} right={closeButtonRight} headerOffset={headerOffset}>
      <CloseIcon fontSize="large" />
    </CloseButton>
    <MenuContainer className="MenuContainer" menuOpen={menuOpen} headerOffset={headerOffset}>
      <AdvanaMegaMenu showCloseButton={false} pillMenu={true} defaultHeader={defaultHeader} defaultMenuOpen={menuOpen} toggleMenu={toggleMenu} />
    </MenuContainer>
  </>;
}

export default AdvanaMegaMenuPill;
