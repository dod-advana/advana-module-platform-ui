import React, { useState, useEffect, useCallback } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Button, Badge, Grid, styled } from '@mui/material';
import { Close } from '@mui/icons-material';
import AdvanaMegaMenuContent from './AdvanaMegaMenuContent';
import { changePage, getDynamicHeaderButtons, getLinks, useUpdateMenuDataWithPermissions } from '../utilities/sitemap';
import Config from '../config/config';
import Permissions from '../utilities/permissions';

// advana images
import AdvanaDark from '../images/AdvanaDarkTheme.png';
import DoDLogo from '../images/DOD_color.png';
import CDAOLogo from '../images/cdaoLogo.png'

// jupiter images
import NavyDepartmentLogo from '../images/Jupiter_DON_logo.png';
import MarinesLogo from '../images/Jupiter_USMC_logo.png';
import NavyLogo from '../images/Jupiter_USN_logo.png';
import JupiterLogo from '../images/Jupiter_logo.png';

const MenuContainer = styled('div', {
	shouldForwardProp: (props) => props !== 'menuOpen' && props !== 'pillMenu' && props !== 'homePage' && props !== 'customHeight' && props !== 'offset'
})(({ menuOpen, pillMenu, homePage, customHeight, offset }) => ({
  height: (menuOpen || pillMenu) ? '100%' : customHeight ? customHeight : '100px',
  padding: homePage ? '2em 0 0 0' : '0',
  color: 'white',
  position: pillMenu ? 'absolute' : 'fixed',
  top: pillMenu ? 'unset' : offset ? offset : 0,
  width: '100vw',
  zIndex: 1000,
  marginTop: !homePage && !pillMenu ? 30 : 0,
}));

const CloseMenuButton = styled('div', {
	shouldForwardProp: (props) => props !== 'menuOpen' && !props.startsWith('close')
})(({ menuOpen, closeHeight, closeWidth }) => ({
  float: 'right',
  color: 'black',
  height: closeHeight ?? 45,
  width: closeWidth ?? 45,
  backgroundColor: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1010,
  visibility: menuOpen ? 'visible' : 'hidden',
  margin: '-30px 0 0 13px',
}));

const NavBar = styled('div')({
  height: 112,
  width: '100%',
  display: 'flex',
  backgroundColor: 'rgba(19,30,67,1)',
  padding: 0,
});

const NavBarInner = styled('div', {
	shouldForwardProp: (props) => props !== 'pillMenu'
})(({ pillMenu }) => ({
  display: 'flex',
  width: pillMenu ? 'unset' : '100%',
}));

const LogoContainer = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  padding: '0 1%',
});

const HeaderButtonContainer = styled('div', {
	shouldForwardProp: (props) => props !== 'pillMenu'
})(({ pillMenu }) => ({
  flex: 3,
  display: 'flex',
  minWidth: pillMenu ? '900px' : '',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  fontFamily: 'Montserrat',
  padding: '0 1%',
  '@media (max-width: 1470px)': {
    minWidth: 0,
    padding: 0,
  },
}));

const Logo = styled('img')({
  width: 50,
});

const AdvanaLogo = styled('img')({
  maxWidth: 250,
  cursor: 'pointer',
});

const HeaderButton = styled(Button, {
	shouldForwardProp: (props) => props !== 'currentvalue'
})(({ value, currentvalue }) => ({
  '&&': {
    padding: '6px 8px',
    backgroundColor: 'transparent',
    border: 'none',
    fontWeight: 600,
    letterSpacing: '3px',
    color: value === currentvalue ? Config.MEGA_MENU_HIGHLIGHT_COLOR : 'white',
    borderRadius: 0,
    height: '3em',
    lineHeight: '24px',
    borderBottom: value === currentvalue ? `2px solid ${Config.MEGA_MENU_HIGHLIGHT_COLOR}` : '2px solid transparent',
    transition: 'border-bottom .1s',
    fontSize: 14,
    whiteSpace: 'nowrap',
    '@media (max-width: 1470px)': {
      fontSize: 12,
    },
  },
  '&:focus': {
    outline: 0,
  },
}));

const MenuBody = styled('div', {
	shouldForwardProp: (props) => props !== 'menuOpen' && props !== 'pillMenu' && props !== 'offset'
})(({ menuOpen, pillMenu, offset }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: (pillMenu || menuOpen) ? offset ? '0 60px 170px 30px' : '0 60px 70px 30px' : 0,
  height: (pillMenu || menuOpen) ? '100%' : 0,
  overflow: menuOpen ? 'visible' : 'hidden',
  backgroundColor: 'rgba(19,30,67,0.95)',
  transition: 'all .1s',
}));

const MenuBodyInner = styled('div')({
  borderTop: '2px solid #979797',
  height: '100%',
});

const MenuBodyContent = styled('div')({
  paddingTop: 30,
  height: '100%',
});

const MenuContent = styled(Grid)({
  margin: '10px 0 0 0',
  height: '85%',
  '&>.MuiGrid-item': {
    paddingTop: 0,
    height: '100%',
    overflow: 'auto',
  },
});

const AdvanaMegaMenu = (props) => {
  const {
    offset,
    showCloseButton,
    pillMenu,
    defaultHeader,
    homePage,
    permissions = Permissions,
    defaultMenuOpen,
    toggleMenu,
    unread,
    extraHomeTutorialClassName = '',
    alternateLogo,
    customHeight
  } = props;
  const { trackEvent } = useMatomo();
  const [currentHeader, setCurrentHeader] = useState(null);
  const [menuOpen, setMenuOpen] = useState(defaultMenuOpen);
  const [atTop, setAtTop] = useState(homePage);
  const [menuDataWithPermissions, setMenuDataWithPermissions] = useState({});

  // Recursive function to walk through the nested megamenu config and dynamically populate the permissions, where applicable
  const updateMenuDataWithPermissions = useUpdateMenuDataWithPermissions(permissions);

  const scrollHandler = useCallback(() => { setAtTop(window.scrollY === 0); }, [])

  useEffect(() => {
    (async () => {
      try {
        const links = await getLinks();
        updateMenuDataWithPermissions(links);
        setMenuDataWithPermissions(links);

        // have a default tab highlighted
        if (defaultHeader) {
          setCurrentHeader(defaultHeader);
        }

        // check for scroll on the main page
        if (homePage) {
          window.addEventListener("scroll", scrollHandler);
        } else {
          window.removeEventListener("scroll", scrollHandler);
        }
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  }, [defaultHeader, homePage, updateMenuDataWithPermissions, scrollHandler]);

  const closeMegamenu = (e) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    if (toggleMenu) toggleMenu();
    setCurrentHeader(null);
  }

  const openHeaderSection = (header) => {
    if (menuOpen && header === currentHeader && !pillMenu) {
      closeMegamenu();
    }
    else {
      setMenuOpen(true);
      setCurrentHeader(header);
    }
  }

  const renderLogos = () => {
    switch (Config.ENCLAVE) {
      case 'jupiter':
        return <>
          <Logo src={NavyDepartmentLogo} alt='_navydeptlogo' onClick={() => redirect('#/')} />
          <Logo src={MarinesLogo} alt='_marineslogo' onClick={() => redirect('#/')} />
          <Logo src={NavyLogo} alt='_navylogo' onClick={() => redirect('#/')} />
          <AdvanaLogo src={JupiterLogo} alt='jupiter_logo' onClick={() => redirect('#/')} />
        </>;
      default:
        return <>
          <Logo src={DoDLogo} alt='dod_logo' />
          <Logo src={CDAOLogo} alt='cdao_logo' style={{ position: 'relative', left: '1%' }} />
          {
            alternateLogo ? <Logo src={alternateLogo} alt='alternate_logo' style={{ position: 'relative', left: '1%' }} /> :
              <AdvanaLogo src={AdvanaDark} alt='advana_logo' onClick={() => redirect('#/')} />
          }
        </>;
    }
  }

  const renderHeaderButtons = () => {
    const buttons = [];
    const headerButtons = getDynamicHeaderButtons(menuDataWithPermissions);

    headerButtons.forEach(btn => {

      buttons.push(
        <HeaderButton
          key={btn.value}
          value={btn.value}
          currentvalue={currentHeader}
          onClick={() => openHeaderSection(btn.value)}
        >
          {btn.label}
        </HeaderButton>
      )
    });
    if (!pillMenu) {
      buttons.push(<HeaderButton key={'header-search'}
        value={'search'}
        currentvalue={null}
        size="small"
        style={{ fontSize: '22px', marginLeft: -15 }}
        onClick={() => {
          trackEvent({
            category: 'AdvanaMegaMenu_AdvanaMegaMenu',
            action: 'click',
            name: 'SearchIcon'
          });

          const openInNewTab = Config.MEGA_MENU_SEARCH_LINK?.[1] !== '#';
          window.open(Config.MEGA_MENU_SEARCH_LINK, openInNewTab ? '_blank' : '_self');
        }}>
        <i className="fa fa-search"></i>
      </HeaderButton>);
      buttons.push(<div className={extraHomeTutorialClassName} key={'header-profile'} ><HeaderButton
        value={'profile'}
        currentvalue={null}
        size="small"
        style={{ fontSize: '22px', marginLeft: -15 }}
        onClick={() => {
          trackEvent({
            category: 'AdvanaMegaMenu_AdvanaMegaMenu',
            action: 'click',
            name: 'UserProfileIcon'
          });
          changePage(Config.PROFILE_LINK ?? '#/profile');
        }}
        aria-label="go to user profile">
        {unread && unread > 0 ? (
          <Badge badgeContent={unread} color="error" overlap="rectangular">
            <i className="fa fa-user" />
          </Badge>
        ) : (
          <i className="fa fa-user" />
        )}
      </HeaderButton></div>);
    }
    return buttons;
  }

  const redirect = (link, newTab) => {
    closeMegamenu();
    changePage(link, newTab);
  }

  return (
    <>
      <MenuContainer menuOpen={menuOpen} pillMenu={pillMenu} homePage={homePage} offset={offset} customHeight={customHeight} data-test-id="megamenu">
        <NavBar menuOpen={menuOpen} homePageTop={atTop} homePage={homePage} pillMenu={pillMenu}>
          <NavBarInner pillMenu={pillMenu}>
            <LogoContainer>
              {renderLogos()}
            </LogoContainer>
            <HeaderButtonContainer pillMenu={pillMenu} data-test-id="megamenu-header-buttons">
              {renderHeaderButtons()}
            </HeaderButtonContainer>
          </NavBarInner>
        </NavBar>

        <MenuBody pillMenu={pillMenu} menuOpen={menuOpen} offset={offset}>
          <MenuBodyInner>
            <MenuBodyContent>
              {showCloseButton && menuOpen &&
                <CloseMenuButton onClick={closeMegamenu} closeHeight={null} closeWidth={null} homePage={homePage} menuOpen={menuOpen} data-test-id="megamenu-close">
                  <Close fontSize="large" />
                </CloseMenuButton>
              }
              {currentHeader &&
                <>
                  <MenuContent container spacing={4} data-test-id="megamenu-content">
                    <AdvanaMegaMenuContent data={menuDataWithPermissions[currentHeader]} header={currentHeader} redirect={redirect} />
                  </MenuContent>
                </>
              }
            </MenuBodyContent>
          </MenuBodyInner>

        </MenuBody>

      </MenuContainer>
    </>
  )
}

export default AdvanaMegaMenu;
