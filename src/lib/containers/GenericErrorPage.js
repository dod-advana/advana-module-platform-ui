import React from 'react';

const GenericErrorPage = () => {
	return [
		<div style={{ height: 'calc(100% - 220px)' }}>
			<div style={styles.container} key='content'>
				<div style={styles.errorIcon}><i className="fa fa-times-circle"></i></div>
				<div style={styles.subhead}>An error has occurred.</div>
				<div>If this error persists, please contact the helpdesk.</div>
				<div><a style={styles.link} href="#/">Return home.</a></div>
			</div>
		</div>
	]
};

const styles = {
	container: {
		backgroundColor: 'white',
		border: `2px solid grey`,
		width: 500,
		fontFamily: 'Roboto',
		textAlign: 'center',
		margin: '50px auto',
		padding: '45px 0'
	},
	link: {
		color: '#00838F'
	},
	subhead: {
		fontSize: '1.5em',
		marginBottom: 15
	},
	errorIcon: {
		fontSize: '5em',
		fontWeight: 'bold',
		color: 'red',
		marginBottom: 40,
	}
};

export default GenericErrorPage;
