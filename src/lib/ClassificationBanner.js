import React from 'react';

const styles = {
	strong: {
		display: 'inlineBlock',
		verticalAlign: 'middle',
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "2em",
		lineHeight: "2em",
		backgroundColor: window?.__env__?.REACT_APP_CLASSIFICATION_BANNER_COLOR || process.env.REACT_APP_CLASSIFICATION_BANNER_COLOR || 'black',
		zIndex: '16777271'
	},
	div: {
		color: window?.__env__?.REACT_APP_CLASSIFICATION_BANNER_TEXT_COLOR || process.env.REACT_APP_CLASSIFICATION_BANNER_TEXT_COLOR || 'white',
		textAlign: 'center',
		zIndex: '16777271'
	}
}
class ClassificationBanner extends React.Component {
	render() {
		return <div style={styles.div}>
			<strong style={styles.strong}>{window?.__env__?.REACT_APP_CLASSIFICATION_BANNER || process.env.REACT_APP_CLASSIFICATION_BANNER || 'NO BANNER PROVIDED'}</strong>
		</div>;
	}
}
export default ClassificationBanner;