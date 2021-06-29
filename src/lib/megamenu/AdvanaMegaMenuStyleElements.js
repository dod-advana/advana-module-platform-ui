import styled from 'styled-components';

const MenuTitle = styled.div`
    font-family: Montserrat;
    font-size: 30px;
    font-weight: 600;
    height: 1.5em;
`;

const MenuDescription = styled.div`
	color: #FFFFFF;
	font-family: "Noto Sans";
	font-size: 16px;
	letter-spacing: 0;
	line-height: 24px;
`;

const columnStyles = {
	height: '100%',
	overflow: 'auto'
}

const styles = {
	container: {
		height: '100%',
		width: '100%'
	},
	column1: {
		...columnStyles,
		paddingLeft: 0
	},
	column3: {
		...columnStyles,
		borderRight: '1px solid white'
	},
	columnStyles
}

export { styles, MenuTitle, MenuDescription }