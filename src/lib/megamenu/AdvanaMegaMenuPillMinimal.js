import React, { useEffect, useState } from 'react';
import { Menu as MenuIcon, Close as CloseIcon, HomeOutlined as HomeIcon } from '@mui/icons-material';
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

export const PillContainer = styled('div', {
	shouldForwardProp: (props) => props !== 'menuOpen' && props !== 'headerOffset' && props !== 'justifyContent' && props !== 'width' && props !== 'margin' && props !== 'contained'
})(({ menuOpen, headerOffset, justifyContent, width, margin, contained }) => ({
  height: 50,
  float: 'right',
  margin: margin ?? '',
  color: 'white',
  width: width ?? 'auto',
  display: 'flex',
  alignItems: 'center',
  zIndex: menuOpen ? 0 : 1010,
  flex: 1,
  position: 'static',
  right: menuOpen ? 100 : '',
  top: menuOpen ? 'calc(65px + ' + headerOffset + ')' : '',
  justifyContent: justifyContent ? justifyContent : 'unset',
  fontSize: 16,
  boxSizing: 'border-box',
  backgroundColor: contained ? 'black' : '',
  borderRadius: contained ? 6 : 0,
}));

const IconButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  margin: '0px 6px',
  fontSize: 20,
  height: 40,
  width: 40,
  borderRadius: 6,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: Config.MEGA_MENU_HIGHLIGHT_COLOR,
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

const AdvanaMegaMenuPillMinimal = (props) => {
  const {
    margin,
    width,
    closeWidth,
    defaultHeader,
    openPillRight,
    openPillTop,
    closeButtonRight,
    closeButtonTop,
    unread,
    contained = false,
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
    <PillContainer 
      contained={contained}
      headerOffset={headerOffset}
      margin={margin} 
      width={width} 
      menuOpen={menuOpen} 
      top={openPillTop} 
      right={openPillRight} 
      data-test-id="megamenu-pill"
    >
      <IconButton
        onClick={(e) => {
          toggleMenu();
        }}
      >
        <MenuIcon />
      </IconButton>

      <IconButton 
        onClick={(e) => {
          trackEvent({
            category: 'AdvanaMegaMenu_AdvanaMegaMenuPill',
            action: 'click',
            name: 'HomeIcon'
          });
          window.open('/#', '_self')
        }}
      >
        <HomeIcon />
      </IconButton>

      <IconButton onClick={(e) => {
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
      </IconButton>
    </PillContainer>

    <CloseButton onClick={toggleMenu} closeWidth={closeWidth} menuOpen={menuOpen} top={closeButtonTop} right={closeButtonRight} headerOffset={headerOffset}>
      <CloseIcon fontSize="large" />
    </CloseButton>
    <MenuContainer className="MenuContainer" menuOpen={menuOpen} headerOffset={headerOffset}>
      <AdvanaMegaMenu showCloseButton={false} pillMenu={true} defaultHeader={defaultHeader} defaultMenuOpen={menuOpen} toggleMenu={toggleMenu} />
    </MenuContainer>
  </>;
}

export default AdvanaMegaMenuPillMinimal;
