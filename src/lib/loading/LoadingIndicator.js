import React from 'react';
import './LoadingIndicator.css';

class LoadingIndicator extends React.Component {

	render() {
		const { absolute, shadedOverlay, containerStyle, inline, customColor = '#00838F' } = this.props;
		const classes = "spinner" + (absolute ? ' spinner-absolute' : '');
		return <div style={containerStyle || {}}>
			<div className={shadedOverlay ? "loading-overlay" : ""}></div>
			<div className={classes} style={{ display: (inline ? 'inline' : 'block') }}>
				<div className="rect1" style={{ backgroundColor: customColor }}></div>
				<div className="rect2" style={{ backgroundColor: customColor }}></div>
				<div className="rect3" style={{ backgroundColor: customColor }}></div>
				<div className="rect4" style={{ backgroundColor: customColor }}></div>
				<div className="rect5" style={{ backgroundColor: customColor }}></div>
			</div>
		</div>
	}
}

export default LoadingIndicator;