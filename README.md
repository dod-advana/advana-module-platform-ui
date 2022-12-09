This project contains shared platform UI components of Advana.

## Env Variables

* REACT_APP_CLASSIFICATION_BANNER
* REACT_APP_CLASSIFICATION_BANNER_COLOR
* REACT_APP_MEGA_MENU_ENDPOINT: https://advana.data.mil/api/megamenu/links
* REACT_APP_MEGA_MENU_PILL_TEXT
* REACT_APP_MEGA_MENU_PILL_DEFAULT_HEADER
* REACT_APP_ENCLAVE
* REACT_APP_MEGA_MENU_HIGHLIGHT_COLOR
* REACT_APP_MEGA_MENU_ONE_LEVEL_SECTIONS: comma-separated list of sections
* REACT_APP_MEGA_MENU_TWO_LEVEL_SECTIONS: comma-separated list of sections
* REACT_APP_MEGA_MENU_SEARCH_LINK:
* REACT_APP_MEGA_MENU_HEADER_SORT_ORDER: comma-separated list of headers
* REACT_APP_MEGA_MENU_BASE_DOMAIN: domain for which to point relative MM links to (used in apps to point back to the static landing pages) https://advana.data.mil
* REACT_APP_PROFILE_LINK: this should be set to https://advana.data.mil/#/profile if your MEGA_MENU_BASE_DOMAIN is not set to https://advana.data.mil
* REACT_APP_COOKIE_DOMAIN: advana.data.mil (Used to store the consent banner in a cookie that is used for all subdomains)

### Next JS component env vars:

* NEXT_PUBLIC_CLASSIFICATION_BANNER_COLOR: background string
* NEXT_PUBLIC_CLASSIFICATION_BANNER: banner text
* NEXT_PUBLIC_COOKIE_DOMAIN: advana.data.mil (Used to store the consent banner in a cookie that is used for all subdomains)

## Shared functionality included:

### Components
* Mega Menu
* Footer
* Classification Banner
* Consent Agreement
* Loading Indicator
* Page Title

### Containers
* Error Page
* 404 Page

### Utils
* Auth
* Permissions
** Although some permissions will be missing and should be limited to page perms, Most tools should create their own local permissions utility.

### Advana
* Material-UI Theme
