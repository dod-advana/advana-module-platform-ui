import * as React from 'react';
import styled from '@emotion/styled';

const Banner = styled.div`
	color: ${window?.__env__?.REACT_APP_CLASSIFICATION_BANNER_TEXT_COLOR || process.env.REACT_APP_CLASSIFICATION_BANNER_TEXT_COLOR || 'white'};
	text-align: center;
	z-index: 16777271;

	& strong {
		display: inline-block;
		vertical-align: middle;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 2em;
		line-height: 2em;
		background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'black')};
		z-index: 16777271;
	}
`;

const NextJSClassificationBanner = () => {
	return (
		<Banner backgroundColor={process.env.NEXT_PUBLIC_CLASSIFICATION_BANNER_COLOR}>
			<strong>{process.env.NEXT_PUBLIC_CLASSIFICATION_BANNER || 'NO BANNER PROVIDED'}</strong>
		</Banner>
	);
};

export default NextJSClassificationBanner;
