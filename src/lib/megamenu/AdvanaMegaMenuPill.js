import React, { useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import CloseIcon from '@material-ui/icons/Close';
import AdvanaMegaMenu from './AdvanaMegaMenu';

const primaryColor = '#13A792';

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
	width: ${({ width }) => width ?? '170px'};
    padding: ${({ padding }) => padding ?? '16px'};
    display: flex;
    align-items: center;
    z-index: 1010;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
    position: ${({ menuOpen }) => menuOpen ? 'fixed' : ''};
    right: ${({ menuOpen }) => menuOpen ? '20px' : ''};
    top: ${({ menuOpen }) => menuOpen ? '60px' : ''};
    justify-content: ${({ justifyContent }) => justifyContent ? justifyContent : 'unset'}
`;

const SearchButton = styled.div`
	border-left: 1px solid white;
	padding-left: 8px;
	padding-top: 8px;
	padding-bottom: 8px;
	font-size: 20px;
	&:hover {
		color: ${primaryColor};
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
    right: ${({ menuOpen }) => menuOpen ? '30px' : ''};
    top: ${({ menuOpen }) => menuOpen ? '160px' : ''};
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
		defaultHeader
	} = props;
	const { trackEvent } = useMatomo();
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	}


	return (
		<>
			<PillButton margin={margin} width={width} padding={padding} onClick={toggleMenu} menuOpen={menuOpen}>
				<MenuIcon fontSize="large" style={{ color: menuOpen ? primaryColor : 'white' }} />
				<TitleText>ADVANA</TitleText>
				<SearchButton onClick={() => {
					trackEvent({
						category: 'AdvanaMegaMenu_AdvanaMegaMenuPill',
						action: 'click',
						name: 'SearchIcon'
					});
					window.open('/#/search', '_blank')
				}}><i className="fa fa-search" /></SearchButton>
			</PillButton>
			<CloseButton onClick={toggleMenu} closeHeight={closeHeight} closeWidth={closeWidth} menuOpen={menuOpen}>
				<CloseIcon fontSize="large" />
			</CloseButton>
			<MenuContainer className="MenuContainer" menuOpen={menuOpen}>
				<AdvanaMegaMenu showCloseButton={false} pillMenu={true} defaultHeader={defaultHeader} />
			</MenuContainer>
		</>
	)

}

export default AdvanaMegaMenuPill;