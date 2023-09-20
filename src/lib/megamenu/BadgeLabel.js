import { styled } from '@mui/material';

const badgeStyles = ({ color, backgroundColor, width }) => ({
	color: color ? color : 'black',
	backgroundColor: backgroundColor ? backgroundColor : 'white',
	width: width ? width : 100,
	borderRadius: 14,
	padding: '2px 8px',
	fontFamily: 'Noto Sans',
	fontSize: 10,
	fontWeight: 'bold',
	letterSpacing: 0,
	lineHeight: '17px',
	textAlign: 'center',
});

export default styled('div', {
	shouldForwardProp: (props) => props !== 'color' && props !== 'backgroundColor' && props !== 'width'
})(badgeStyles);

export const LinkableBadgeLabel = styled('a', {
	shouldForwardProp: (props) => props !== 'color' && props !== 'backgroundColor' && props !== 'width'
})(badgeStyles);
