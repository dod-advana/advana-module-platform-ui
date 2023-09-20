import * as React from 'react';
import { styled } from '@mui/material';

const Banner = styled('div', {
	shouldForwardProp: (props) => props !== 'backgroundColor'
})(({ backgroundColor }) => ({
	color: window?.__env__?.REACT_APP_CLASSIFICATION_BANNER_TEXT_COLOR || process.env.REACT_APP_CLASSIFICATION_BANNER_TEXT_COLOR || 'white',
	textAlign: 'center',
	zIndex: 16777271,
	'& strong': {
		display: 'inline-block',
		verticalAlign: 'middle',
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '2em',
		lineHeight: '2em',
		backgroundColor: backgroundColor ? backgroundColor : 'black',
		zIndex: 16777271,
	},
}));

const NextJSClassificationBanner = () => {
	return (
		<Banner backgroundColor={process.env.NEXT_PUBLIC_CLASSIFICATION_BANNER_COLOR}>
			<strong>{process.env.NEXT_PUBLIC_CLASSIFICATION_BANNER || 'NO BANNER PROVIDED'}</strong>
		</Banner>
	);
};

export default NextJSClassificationBanner;
