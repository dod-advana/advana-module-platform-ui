import React, { useEffect, useState } from "react";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import Config from "../config/config";
import AdvanaMegaMenu from "./AdvanaMegaMenu";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

const AdvanaMegaMenuPill = (props) => {
  const {
    margin,
    width,
    padding,
    defaultHeader,
    headerOffset = 0,
    iconColor = "black",
  } = props;
  const { trackEvent } = useMatomo();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenuOnNavigation = () => {
    setMenuOpen(false);
  };
  useEffect(() => {
    window.addEventListener("popstate", closeMenuOnNavigation);
    return () => {
      window.removeEventListener("popstate", closeMenuOnNavigation);
    };
  }, []);

  const toggleMenu = () => {
    trackEvent({
      category: "AdvanaMegaMenu_AdvanaMegaMenuPill",
      action: "click",
      name: menuOpen ? "MegaMenu Closed" : "MegaMenu Opened",
    });

    setMenuOpen(!menuOpen);
  };

  const profileLink =
    Config.PROFILE_LINK ?? Config.MEGA_MENU_BASE_DOMAIN + "/#/profile";

  return (
    <>
      <Box
        style={{
          display: "grid",
          height: "50px",
          borderRadius: "5px",
          gridTemplateColumns: "repeat(3, 1fr)",
          headerOffset: headerOffset,
          margin: margin,
          width: width,
          padding: padding,
          menuOpen: menuOpen,
          top: menuOpen ? "calc(65px + " + headerOffset + ")" : "",
          right: menuOpen ? 100 : "",
          zIndex: menuOpen ? 0 : 1010,
        }}
        data-test-id="megamenu-pill"
      >
        <IconButton
          aria-label="Advana Menu"
          style={{ color: iconColor }}
          onClick={toggleMenu}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <IconButton
          component="a"
          href={Config.COOKIE_DOMAIN}
          aria-label="Advana Home"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: iconColor }}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
        <IconButton
          component="a"
          href={profileLink}
          aria-label="Advana Profile"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: iconColor }}
        >
          <PersonIcon fontSize="large" />
        </IconButton>
      </Box>
      {menuOpen && (
        <Box
          style={{
            width: "100vw",
            height: menuOpen ? "100vh" : 0,
            overflow: menuOpen ? "visible" : "hidden",
            marginTop: 0,
            color: "white",
            zIndex: 1000,
            position: "fixed",
            transition: "left .6s",
            top:
              headerOffset && headerOffset !== 0
                ? "calc(30px + " + headerOffset + ")"
                : 30,
            left: menuOpen ? 0 : "100vw",
            fontSize: 16,
          }}
        >
          <AdvanaMegaMenu
            showCloseButton={false}
            pillMenu={true}
            defaultHeader={defaultHeader}
            defaultMenuOpen={menuOpen}
            toggleMenu={toggleMenu}
          />
        </Box>
      )}
    </>
  );
};

export default AdvanaMegaMenuPill;
