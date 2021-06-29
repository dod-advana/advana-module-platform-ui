import styled from 'styled-components';

export default styled.div`
	color: ${({ color }) => (color) ? color : 'black'};
	background-color: ${({ backgroundColor }) => (backgroundColor) ? backgroundColor : 'white'};
	width: ${({ width }) => (width) ? width : '100px'};
	border-radius: 14px;
	padding: 2px 8px;

	
	font-family: "Noto Sans";
	font-size: 10px;
	font-weight: bold;
	letter-spacing: 0;
	line-height: 17px;
	text-align: center;
`;