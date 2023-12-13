const configObject = {
  ENCLAVE: window?.__env__?.REACT_APP_ENCLAVE || process.env.REACT_APP_ENCLAVE,
  FAVICON_URL:
    window?.__env__?.REACT_APP_FAVICON_URL || process.env.REACT_APP_FAVICON_URL,
  MEGA_MENU_PILL_TEXT:
    window?.__env__?.REACT_APP_MEGA_MENU_PILL_TEXT ||
    process.env.REACT_APP_MEGA_MENU_PILL_TEXT ||
    "ADVANA",
  MEGA_MENU_PILL_DEFAULT_HEADER:
    window?.__env__?.REACT_APP_MEGA_MENU_PILL_DEFAULT_HEADER ||
    process.env.REACT_APP_MEGA_MENU_PILL_DEFAULT_HEADER ||
    "Applications",
  MEGA_MENU_HIGHLIGHT_COLOR:
    window?.__env__?.REACT_APP_MEGA_MENU_HIGHLIGHT_COLOR ||
    process.env.REACT_APP_MEGA_MENU_HIGHLIGHT_COLOR ||
    "#56B1AC",
  MEGA_MENU_ONE_LEVEL_SECTIONS:
    window?.__env__?.REACT_APP_MEGA_MENU_ONE_LEVEL_SECTIONS ||
    process.env.REACT_APP_MEGA_MENU_ONE_LEVEL_SECTIONS ||
    "About, Applications, Learn, Support",
  MEGA_MENU_TWO_LEVEL_SECTIONS:
    window?.__env__?.REACT_APP_MEGA_MENU_TWO_LEVEL_SECTIONS ||
    process.env.REACT_APP_MEGA_MENU_TWO_LEVEL_SECTIONS ||
    "Initiatives, Tools",
  MEGA_MENU_SEARCH_LINK:
    window?.__env__?.REACT_APP_MEGA_MENU_SEARCH_LINK ||
    process.env.REACT_APP_MEGA_MENU_SEARCH_LINK ||
    "/#/search",
  MEGA_MENU_HEADER_SORT_ORDER:
    window?.__env__?.REACT_APP_MEGA_MENU_HEADER_SORT_ORDER ||
    process.env.REACT_APP_MEGA_MENU_HEADER_SORT_ORDER ||
    "About, Analytics, Initiatives, Tools, Applications, Learn, Support",
  MEGA_MENU_BASE_DOMAIN:
    window?.__env__?.REACT_APP_MEGA_MENU_BASE_DOMAIN ||
    process.env.REACT_APP_MEGA_MENU_BASE_DOMAIN,
  MEGA_MENU_ENDPOINT:
    window?.__env__?.REACT_APP_MEGA_MENU_ENDPOINT ||
    process.env.REACT_APP_MEGA_MENU_ENDPOINT ||
    "/",
  PROFILE_LINK:
    window?.__env__?.REACT_APP_PROFILE_LINK ||
    process.env.REACT_APP_PROFILE_LINK,
  COOKIE_DOMAIN:
    window?.__env__?.REACT_APP_COOKIE_DOMAIN ||
    process.env.REACT_APP_COOKIE_DOMAIN ||
    "http://advana.data.mil",
  BANNER_LINK:
    window?.__env__?.REACT_APP_BANNERS_ENDPOINT ||
    process.env.REACT_APP_BANNERS_ENDPOINT ||
    "http://app.dev.advana.boozallencsn.com/api/banners/bannersEditor",
};

export default configObject;
