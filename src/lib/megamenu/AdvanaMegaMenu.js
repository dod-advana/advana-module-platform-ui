import React, { useState, useEffect } from 'react';
import './style.css';

import { useHistory } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import AdvanaMegaMenuContent from './AdvanaMegaMenuContent';
import AdvanaDark from '../images/AdvanaDarkTheme.png';
import { getLinks, useUpdateMenuDataWithPermissions } from '../utilities/sitemap';
import DoDLogo from '../images/DOD_color.png';
import CDTOLogo from '../images/CDTO_logo.png';
import ODCFOLogo from '../images/ODCFO_logo.png';

const MenuContainer = styled.div`
	height: ${({ menuOpen, pillMenu }) => (menuOpen || pillMenu) ? '100%' : '100px'};
    padding: ${({ homePage }) => homePage ? '4em 0 0 0' : '0'};
    color: white;
    position: ${({ pillMenu }) => pillMenu ? 'absolute' : 'fixed'};
	width: 100vw;
	z-index: 1000;
	margin-top: ${({ homePage, pillMenu }) => !homePage && !pillMenu ? '30px' : '0px'};
`;

const CloseMenuButton = styled.div`
	float: right;
	color: black
	height: ${({ closeHeight }) => closeHeight ?? '45px'};
    width: ${({ closeWidth }) => closeWidth ?? '45px'};
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1010;
    visibility: ${({ menuOpen }) => menuOpen ? 'visible' : 'hidden'};
    margin: -30px 0 0 13px;
`;

const NavBar = styled.div`
    height: 112px;
    width: 100%;
    display: flex;
    background-color: ${({ menuOpen, homePageTop, homePage, pillMenu }) => (homePage && homePageTop && !menuOpen) || pillMenu ? 'transparent' : 'rgba(19,30,67,0.978)'};
    padding: 0;
	padding-top: 0px;
`;

const NavBarInner = styled.div`
	display: flex;
	width: ${({ pillMenu }) => pillMenu ? 'unset' : '100%'};
`;

const LogoContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding : 0 1%;
`;

const HeaderButtonContainer = styled.div`
    flex: 3;
	display: flex;
	min-width: ${({ pillMenu }) => (pillMenu) ? '900px' : ''};
    align-items: center;
    justify-content: space-evenly;
    font-family: Montserrat;
	padding: 0 1%;

	@media (max-width: 1470px) {
		min-width: 0;
		padding: 0
	}
`

const Logo = styled.img`
    width: 50px;
`;

const AdvanaLogo = styled.img`
    width: 250px;
    cursor: pointer;
`;

const HeaderButton = styled(Button)`
    &&{
        background-color: transparent;
        border: none;
        font-weight: 600;
        letter-spacing: 3px;
        color: ${({ value, currentvalue }) => value === currentvalue ? '#56B1AC' : 'white'};
        border-radius: 0;
        height: 3em;
        line-height: 24px;
        border-bottom: ${({ value, currentvalue }) => value === currentvalue ? '2px solid #56B1AC' : '2px solid transparent'};
		transition: border-bottom .1s;
		font-size: 14px;

		@media (max-width: 1470px) {
			font-size: 12px;
		}
    }

    &:focus {
        outline: 0
	}
`;

const MenuBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ pillMenu, menuOpen }) => (pillMenu || menuOpen) ? '0 60px 70px 30px' : '0'};
    height: ${({ pillMenu, menuOpen }) => (pillMenu || menuOpen) ? '100%' : '0%'};
    overflow: ${({ menuOpen }) => menuOpen ? 'visible' : 'hidden'};
    background-color: ${({ pillMenu }) => pillMenu ? 'transparent' : 'rgba(19,30,67,0.95)'};
    transition: all .1s;
`;

const MenuBodyInner = styled.div`
	border-top: 2px solid #979797;
	height: 100%;
`;

const MenuBodyContent = styled.div`
	padding-top: 30px;
	height: 100%;
`;

const MenuContent = styled.div`
    display: flex;
    height: 85%;
    margin: 10px 0 0 0;
`;

const HEADER_BUTTONS = [
	{ value: 'About', label: 'ABOUT', link: '/landing/about', subHeaders: false },
	{ value: 'Analytics', label: 'ANALYTICS', link: '/landing/analytics', subHeaders: true },
	{ value: 'Initiatives', label: 'INITIATIVES', link: '/landing/initiatives', subHeaders: true },
	{ value: 'Tools', label: 'TOOLS', link: '/landing/data-tools', subHeaders: false },
	// { value: 'communities', label: 'COMMUNITIES', link: '/landing/communities/all', subHeaders: true },
	{ value: 'Applications', label: 'APPLICATIONS', link: '/landing/all', subHeaders: false },
	{ value: 'Learn', label: 'LEARN', link: '/landing/learn', subHeaders: true },
	{ value: 'Support', label: 'SUPPORT', link: '/landing/support', subHeaders: false },
];

const AdvanaMegaMenu = (props) => {
	const {
		showCloseButton,
		pillMenu,
		defaultHeader,
		homePage
	} = props;
	const { trackEvent } = useMatomo();
	const [currentHeader, setCurrentHeader] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [atTop, setAtTop] = useState(homePage);
	const [menuDataWithPermissions, setMenuDataWithPermissions] = useState({});

	let history = useHistory();


	//Recursive function to walk through the nested megamenu config and dynamically populate the permissions, where applicable
	const updateMenuDataWithPermissions = useUpdateMenuDataWithPermissions()

	useEffect(() => {
		(async () => {
			try {
				const links = await getLinks()
				updateMenuDataWithPermissions(links);
				setMenuDataWithPermissions(links);

				// have a default tab highlighted
				if (defaultHeader) {
					setCurrentHeader(defaultHeader);
				}

				// check for scroll on the main page
				if (homePage) {
					window.addEventListener("scroll", () => {
						setAtTop(window.scrollY === 0);
					});

					return () => {
						window.removeEventListener("scroll", () => { });
					}
				}
			} catch (err) {
				console.error(err);
			}
		})();
	}, [defaultHeader, homePage, updateMenuDataWithPermissions]);

	const closeMegamenu = (e) => {
		if (e) e.preventDefault();
		setMenuOpen(false);
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

	const renderHeaderButtons = () => {
		const buttons = [];
		HEADER_BUTTONS.forEach(btn => {

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
					window.location.href = '/#/search';
				}}>
				<i className="fa fa-search"></i>
			</HeaderButton>)
		}

		return buttons;
	}

	const changePage = (link) => {
		closeMegamenu()
		// history.push(link);
		if (link[0] === '#') window.location.href = '/' + link;
		else window.open(link);
	}

	return (
		<>

			<MenuContainer menuOpen={menuOpen} pillMenu={pillMenu} homePage={homePage} location={history?.location.pathname}>
				<NavBar menuOpen={menuOpen} homePageTop={atTop} homePage={homePage} pillMenu={pillMenu}>
					<NavBarInner pillMenu={pillMenu}>
						<LogoContainer>
							<Logo src={DoDLogo} alt='dod_logo' />
							<Logo src={ODCFOLogo} alt='odcfo_logo' style={{ width: 57 }} />
							<Logo src={CDTOLogo} alt='cdto_logo' />
							<AdvanaLogo src={AdvanaDark} alt='advana_logo' onClick={() => changePage('#/')} />
						</LogoContainer>
						<HeaderButtonContainer pillMenu={pillMenu}>
							{renderHeaderButtons()}
						</HeaderButtonContainer>
					</NavBarInner>
				</NavBar>

				<MenuBody pillMenu={pillMenu} menuOpen={menuOpen}>
					<MenuBodyInner>
						<MenuBodyContent>
							{showCloseButton && menuOpen &&
								<CloseMenuButton onClick={closeMegamenu} closeHeight={null} closeWidth={null} homePage={homePage} menuOpen={menuOpen} data-testid="close">
									<CloseIcon fontSize="large" />
								</CloseMenuButton>
							}
							{currentHeader &&
								<>
									<MenuContent>
										<AdvanaMegaMenuContent data={menuDataWithPermissions[currentHeader]} header={currentHeader} redirect={changePage} />
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
